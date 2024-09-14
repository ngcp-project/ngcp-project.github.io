import { defineConfig } from 'astro/config';
import starlight from '@astrojs/starlight';

import vue from '@astrojs/vue';

// https://astro.build/config
export default defineConfig({
	site: 'https://ngcp-project.github.io',
	integrations: [
		starlight({
			title: 'NGCP Ground Control Systems',
			social: {
				github: 'https://github.com/ngcp-project',
			},
			sidebar: [
				{
					label: 'Ground Control Systems',
					autogenerate: {
						directory: 'gcs',
						labelCase: 'title',
					},
				},
			],
		}),
		vue(),
	],
});
