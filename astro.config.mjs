import { defineConfig } from 'astro/config';
import starlight from '@astrojs/starlight';

import vue from '@astrojs/vue';

// https://astro.build/config
export default defineConfig({
	site: 'https://ngcp-project.github.io',
	integrations: [
		starlight({
			title: 'NGCP Documentation Hub',
			social: [
			  { icon: 'github', label: 'GitHub', href: 'https://github.com/ngcp-project' }
			],
			sidebar: [
				{
					label: 'Ground Control Systems',
					autogenerate: {
						directory: 'gcs',
						labelCase: 'title',
					},
				},
				{
					label: 'Archived - Ground Control Systems',
					autogenerate: {
						directory: 'archive-gcs',
						labelCase: 'title'
					},
					collapsed: true,
				},
			],
		}),
		vue(),
	],
});
