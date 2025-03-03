import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

export default defineConfig({
	plugins: [react()],
	preview: {
		port: 8080, // Use Railway's assigned port
		host: '0.0.0.0',
	},
	server: {
		port: 8080,
		host: '0.0.0.0',
	},
})
