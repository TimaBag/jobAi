import { defineConfig } from 'vite'

export default defineConfig({
	server: {
		host: true, // Allow external access
		port: 4173, // Ensure it matches your Railway port
		strictPort: true,
		preview: {
			allowedHosts: ['jobai-production.up.railway.app'],
		},
	},
})
