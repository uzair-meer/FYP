import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'
import { imagetools } from 'vite-imagetools'
import svgr from 'vite-plugin-svgr'

// https://vitejs.dev/config/
export default defineConfig({
	plugins: [react(), svgr(), imagetools()],
	resolve: {
		alias: {
			src: '/src',
			components: '/src/components',
			admin: '/src/pages/admin',
			client: '/src/pages/client',
			company: '/src/pages/company',
			employee: '/src/pages/employee',
		},
	},
})
