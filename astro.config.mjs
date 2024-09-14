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
				github: 'https://github.com/withastro/starlight',
			},
			sidebar: [
				{
					label: 'Getting Started',
					link: '/getting-started',
				},
				{
					label: 'User Interface',
					autogenerate: {
						directory: 'user-interface',
					},
				},
				{
					label: 'Databse & API',
					autogenerate: {
						directory: 'database',
					},
				},
				{
					label: 'Vehicle Integration',
					autogenerate: {
						directory: 'vehicle-integration',
					},
				},
				{
					label: 'Infrastucture',
					autogenerate: {
						directory: 'infrastructure',
					},
				},
				{
					label: 'Resources',
					link: '/resources',
				},
			],
		}),
		vue(),
	],
});
