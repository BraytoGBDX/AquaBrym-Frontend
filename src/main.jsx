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
const publicVapidKey = 'BJWe43v1E1l9djRcNeS7rNrlRHCVWsNV3LaEFLLqW41Bu3HX-Rv-IciwkOAyrk7nQWK4vmHcRSUTxjzlkW5Lpjg'; // Sustituye con tu clave pública VAPID

if (navigator.serviceWorker) {
  window.addEventListener('load', () => {
    // Registra el Service Worker
    navigator.serviceWorker
      .register('/service-worker.js')  // Asegúrate de usar la ruta correcta
      .then((registration) => {
        console.log('Service Worker registrado:', registration);

        // Forzar la activación inmediata si está esperando
        if (registration.waiting) {
          registration.waiting.postMessage({ type: 'SKIP_WAITING' });
        }

        // Verifica si PushManager está disponible
        if ('PushManager' in window) {
          // Esperar a que el Service Worker esté activo
          if (registration.active) {
            registration.pushManager
              .subscribe({
                userVisibleOnly: true,
                applicationServerKey: urlBase64ToUint8Array(publicVapidKey),
              })
              .then((subscription) => {
                console.log('Usuario suscrito:', subscription);
                // Aquí deberías enviar la suscripción al backend
              })
              .catch((error) => {
                console.error('Error al suscribir al usuario:', error);
              });
          } else {
            // Esperar a que el Service Worker se active antes de suscribir
            registration.addEventListener('activate', () => {
              registration.pushManager
                .subscribe({
                  userVisibleOnly: true,
                  applicationServerKey: urlBase64ToUint8Array(publicVapidKey),
                })
                .then((subscription) => {
                  console.log('Usuario suscrito:', subscription);
                  // Aquí deberías enviar la suscripción al backend
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


createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>
);
