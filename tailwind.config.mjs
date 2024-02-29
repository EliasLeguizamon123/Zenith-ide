/** @type {import('tailwindcss').Config} */

const plugins = require('tailwindcss/plugin')

export default {
	content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
	theme: {
		extend: {
			colors: {
				'rosewater': '#f4dbd6',
				'flamingo': '#f0c6c6',
				'maroon': '#ee99a0',
				'peach': '#f5a97f',
				'sunflower': '#eed49f',
				'woods': '#a6da95',
				'sky': '#91d7e3',
				'text': '#cad3f5',
				'subtext': '#a5adcb',
				'overlay': '#6e738d',
				'surface': '#363a4f',
				'base': '#24273a',
				'mantle': '#1e2030',
				'crust': '#181926',
			}
		},
		borderWidth: {
			'1': '1px',
			'2': '2px'
		}
	},
	plugins: [],
}
