import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { VitePWA } from "vite-plugin-pwa";

export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      registerType: "autoUpdate",
      selfDestroying: false,
      injectRegister: "auto",
      manifestFilename: "manifest.webmanifest",  // ✅ Ensure correct manifest filename
      includeAssets: ["pwa-192x192.png", "pwa-512x512.png"],  // ✅ Include icons explicitly
      manifest: {
        export default defineConfig({
          plugins: [
            react(),
            VitePWA({
              registerType: "autoUpdate",
              selfDestroying: false,
              injectRegister: "auto",
              manifest: {
                name: "Weather Dashboard",
                short_name: "WeatherApp",
                start_url: "/",
                display: "standalone",
                background_color: "#ffffff",
                lang: "en",
                scope: "/",
                theme_color: "#007BFF",
                icons: [
                  {
                    src: "/pwa-192x192.png",
                    sizes: "192x192",
                    type: "image/png"
                  },
                  {
                    src: "/pwa-512x512.png",
                    sizes: "512x512",
                    type: "image/png"
                  }
                ],
                screenshots: [
                  {
                    src: "/screenshot-desktop.png",
                    sizes: "1280x720",
                    type: "image/png",
                    form_factor: "wide"
                  },
                  {
                    src: "/screenshot-mobile.png",
                    sizes: "750x1334",
                    type: "image/png"
                  }
                ]
              },
              workbox: {
                cleanupOutdatedCaches: true,
                globPatterns: ["**/*.{html,js,css,png,ico,svg}"],
                runtimeCaching: [
                  {
                    urlPattern: /^https:\/\/api\.openweathermap\.org\//,
                    handler: "CacheFirst",
                    options: {
                      cacheName: "weather-api-cache",
                      expiration: { maxEntries: 50, maxAgeSeconds: 86400 },
                      cacheableResponse: { statuses: [0, 200] }
                    }
                  }
                ]
              }
            })
          ]
        });
        