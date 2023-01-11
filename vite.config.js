import { sveltekit } from '@sveltejs/kit/vite'
import { SvelteKitPWA } from '@vite-pwa/sveltekit'

/** @type {import('vite').UserConfig} */
const config = {
	logLevel: 'info',
	build: {
		minify: false
	},
	plugins: [
		sveltekit(),
		SvelteKitPWA({
			injectRegister: false,
			devOptions: {
				enabled: true,
				type: 'module'
			},
			scope: '/',
			strategies: 'generateSW',
			manifest: {
				name: 'Westrup Wallin - Pengar',
				short_name: 'Pengar',
				display: 'standalone',
				icons: [
					{
						src: '/money-bill-wave-alt.png',
						sizes: '500x500',
						type: 'image/png'
					}
				]
			}
		})
	],
	test: {
		include: ['src/**/*.{test,spec}.{js,ts}']
	}
}

export default config
