import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.jsx';

// Función para convertir la clave pública VAPID de base64 a Uint8Array
function urlBase64ToUint8Array(base64String) {
  const padding = '='.repeat((4 - base64String.length % 4) % 4);
  const base64 = (base64String + padding)
    .replace(/-/g, '+')
    .replace(/_/g, '/');
  const rawData = window.atob(base64);
  const outputArray = new Uint8Array(rawData.length);
  for (let i = 0; i < rawData.length; ++i) {
    outputArray[i] = rawData.charCodeAt(i);
  }
  return outputArray;
}

if ('Notification' in window) {
  Notification.requestPermission().then((permission) => {
    if (permission === 'granted') {
      console.log('Notificaciones habilitadas');
    } else {
      console.log('Notificaciones bloqueadas');
    }
  });
}

// La clave pública VAPID que generaste
const publicVapidKey =
  'BJWe43v1E1l9djRcNeS7rNrlRHCVWsNV3LaEFLLqW41Bu3HX-Rv-IciwkOAyrk7nQWK4vmHcRSUTxjzlkW5Lpjg';

if (navigator.serviceWorker) {
  window.addEventListener('load', () => {
    navigator.serviceWorker
      .register('/service-worker.js')
      .then((registration) => {
        console.log('Service Worker registrado:', registration);

        if (registration.waiting) {
          registration.waiting.postMessage({ type: 'SKIP_WAITING' });
        }

        if ('PushManager' in window) {
          if (registration.active) {
            registration.pushManager
              .subscribe({
                userVisibleOnly: true,
                applicationServerKey: urlBase64ToUint8Array(publicVapidKey),
              })
              .then((subscription) => {
                console.log('Usuario suscrito:', subscription);
              })
              .catch((error) => {
                console.error('Error al suscribir al usuario:', error);
              });
          } else {
            registration.addEventListener('activate', () => {
              registration.pushManager
                .subscribe({
                  userVisibleOnly: true,
                  applicationServerKey: urlBase64ToUint8Array(publicVapidKey),
                })
                .then((subscription) => {
                  console.log('Usuario suscrito:', subscription);
                })
                .catch((error) => {
                  console.error('Error al suscribir al usuario:', error);
                });
            });
          }
        }
      })
      .catch((error) => {
        console.error('Error al registrar el Service Worker:', error);
      });
  });
}

/* ======================================================
   🔽 A PARTIR DE AQUÍ ES LO NUEVO (NO NOTIFICACIONES)
   ====================================================== */

// JSON base de la alerta (tal cual lo proporcionaste)
const ALERTA_BASE = {
  id: 57,
  sensor: {
    id: 9,
    sensor_type: 'flow_turbina',
    model: 'YF-S201',
    installation_at: '2025-08-08',
    status: 'inactive',
    created_at: '2025-12-11T13:43:43.679Z',
    updated_at: '2025-12-11T13:43:43.679Z',
    entityId: 10,
  },
  description: 'string',
  level: 'info',
  detected_at: '2025-12-15T21:09:38.295Z',
  resolved: false,
  resolved_at: '2025-12-15T19:05:06.728Z',
  extra_data: {},
};

// IndexedDB: abrir / crear BD
function openAlertsDB() {
  return new Promise((resolve, reject) => {
    const request = indexedDB.open('AquaWatchDB', 1);

    request.onupgradeneeded = (event) => {
      const db = event.target.result;
      if (!db.objectStoreNames.contains('alerts')) {
        db.createObjectStore('alerts', { keyPath: 'id' });
      }
    };

    request.onsuccess = () => resolve(request.result);
    request.onerror = () => reject(request.error);
  });
}

// Guardar alerta en IndexedDB
async function saveAlertIndexedDB(alert) {
  const db = await openAlertsDB();
  const tx = db.transaction('alerts', 'readwrite');
  const store = tx.objectStore('alerts');
  store.put(alert);
}

// Guardar alerta en localStorage
function saveAlertLocalStorage(alert) {
  const key = 'aquawatch_alerts';
  const alerts = JSON.parse(localStorage.getItem(key) || '[]');
  alerts.push(alert);
  localStorage.setItem(key, JSON.stringify(alerts));
}

// Generar alerta cada 60 segundos (SIN notificación)
async function generateAlert() {
  const alert = structuredClone(ALERTA_BASE);

  alert.id = Date.now();
  alert.detected_at = new Date().toISOString();

  console.log('⏱️ Alerta generada:', alert);

  saveAlertLocalStorage(alert);
  await saveAlertIndexedDB(alert);
}

// Ejecutar inmediatamente para prueba
generateAlert();

// Ejecutar cada 60 segundos
setInterval(generateAlert, 60_000);

/* ====================================================== */

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>
);
