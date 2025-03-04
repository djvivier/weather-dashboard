import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { VitePWA } from "vite-plugin-pwa";

export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      registerType: "autoUpdate",
      injectRegister: "auto",
      manifestFilename: "manifest.webmanifest",
      // Ensure your assets are in the public directory
      includeAssets: ["favicon.ico"], 
      manifest: {
        name: "Weather Dashboard",
        short_name: "WeatherApp",
        theme_color: "#007BFF",
        background_color: "#ffffff",
        display: "standalone", // This is already correct
        start_url: "/", // Make sure this matches your application's entry point
        id: "/", // Adding id field to fix the manifest error
        purpose: "any", // Adding default purpose
        icons: [
          {
            src: "/icons/pwa-192x192.png", // Updated path
            sizes: "192x192",
            type: "image/png",
            purpose: "any" // Adding purpose attribute
          },
          {
            src: "/icons/pwa-512x512.png", // Updated path
            sizes: "512x512",
            type: "image/png",
            purpose: "any" // Adding purpose attribute
          },
          // Adding a square icon to satisfy OS requirements
          {
            src: "/icons/maskable-icon-192x192.png", // New maskable icon
            sizes: "192x192",
            type: "image/png",
            purpose: "maskable" // Special purpose for adaptive icons
          }
        ],
        screenshots: [
          {
            src: "/screenshots/screenshot-desktop.png", // Updated path
            sizes: "1280x720",
            type: "image/png",
            form_factor: "wide" // For desktop install prompt
          },
          {
            src: "/screenshots/screenshot-mobile.png", // Updated path
            sizes: "750x1334",
            type: "image/png",
            form_factor: "narrow" // For mobile devices
          }
        ]
      },      
      workbox: {
        cleanupOutdatedCaches: true,
        globPatterns: ["**/*.{html,js,css,png,ico,svg,webmanifest}"],
        runtimeCaching: [
          {
            urlPattern: /^https:\/\/api\.openweathermap\.org\//,
            handler: "CacheFirst",
            options: {
              cacheName: "weather-api-cache",
              expiration: { maxEntries: 50, maxAgeSeconds: 86400 },
              cacheableResponse: { statuses: [0, 200] },
            },
          },
          {
            urlPattern: ({ request }) => request.mode === "navigate",
            handler: "NetworkFirst",
            options: {
              cacheName: "html-cache",
              expiration: { maxEntries: 10, maxAgeSeconds: 86400 },
            },
          },
          {
            urlPattern: ({ request }) =>
              ["style", "script", "worker"].includes(request.destination),
            handler: "StaleWhileRevalidate",
            options: {
              cacheName: "assets-cache",
              expiration: { maxEntries: 50, maxAgeSeconds: 86400 },
            },
          },
        ],
      },
    }),
  ],
});