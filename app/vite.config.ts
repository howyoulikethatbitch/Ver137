import path from "path"
import react from "@vitejs/plugin-react"
import { defineConfig, type Plugin } from "vite"

// https://vite.dev/config/
export default defineConfig(async ({ mode }) => {
  const isProd = mode === 'production';

  // Only load the dev-inspect plugin in non-production builds
  const devPlugins: Plugin[] = [];
  if (!isProd) {
    try {
      const { inspectAttr } = await import('kimi-plugin-inspect-react');
      devPlugins.push(inspectAttr() as Plugin);
    } catch {
      // plugin not available — continue without it
    }
  }

  return {
    base: './',
    plugins: [...devPlugins, react()],
    server: {
      port: 3000,
    },
    resolve: {
      alias: {
        "@": path.resolve(__dirname, "./src"),
      },
    },
    build: {
      // Raise warning threshold — we're splitting intentionally
      chunkSizeWarningLimit: 600,
      rollupOptions: {
        output: {
          manualChunks: {
            // Core React runtime — tiny, always needed
            'vendor-react': ['react', 'react-dom', 'react-router'],
            // Animation library — heavy, shared everywhere
            'vendor-motion': ['framer-motion'],
            // Charts — only used in StatisticsTab (lazy-loaded)
            'vendor-charts': ['recharts'],
            // Radix UI primitives — shared across all tabs
            'vendor-radix': [
              '@radix-ui/react-accordion',
              '@radix-ui/react-alert-dialog',
              '@radix-ui/react-avatar',
              '@radix-ui/react-checkbox',
              '@radix-ui/react-collapsible',
              '@radix-ui/react-context-menu',
              '@radix-ui/react-dialog',
              '@radix-ui/react-dropdown-menu',
              '@radix-ui/react-hover-card',
              '@radix-ui/react-label',
              '@radix-ui/react-menubar',
              '@radix-ui/react-navigation-menu',
              '@radix-ui/react-popover',
              '@radix-ui/react-progress',
              '@radix-ui/react-radio-group',
              '@radix-ui/react-scroll-area',
              '@radix-ui/react-select',
              '@radix-ui/react-separator',
              '@radix-ui/react-slider',
              '@radix-ui/react-slot',
              '@radix-ui/react-switch',
              '@radix-ui/react-tabs',
              '@radix-ui/react-toggle',
              '@radix-ui/react-toggle-group',
              '@radix-ui/react-tooltip',
            ],
            // Drag-and-drop — only used in Top10Tab (lazy-loaded)
            'vendor-dnd': ['@hello-pangea/dnd'],
          },
        },
      },
    },
  };
});
