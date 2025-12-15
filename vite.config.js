import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import {VitePWA} from 'vite-plugin-pwa'; // Asegúrate de importar el plugin correctamente


// https://vite.dev/config/
export default defineConfig({
  server:{
    allowedHosts: [
      'amiably-bounteous-rebekah.ngrok-free.dev',  
      'localhost',
      '127.0.0.1',
    ],
  },
  plugins: [react(),
    VitePWA({
      registerType: 'autoUpdate',  // Esto asegura que el Service Worker se registre automáticamente
      manifest: {
        name: 'Mi PWA',
        short_name: 'PWA',
        description: 'Una aplicación web progresiva construida con React y Vite',
        start_url: '/',
        display: 'standalone',
        background_color: '#ffffff',
        theme_color: '#000000',
        icons: [
          {
            src: '/icono-192x192.png',
            sizes: '192x192',
            type: 'image/png',
          },
          {
            src: '/icono-512x512.png',
            sizes: '512x512',
            type: 'image/png',
          },
        ],
      },
    }),
  ],
})
