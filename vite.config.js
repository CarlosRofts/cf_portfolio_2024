// import { defineConfig } from 'vite';
// import eslint from 'vite-plugin-eslint';

// export default defineConfig({
// 	plugins: [eslint()],
// });
import path from 'path';
import { resolve } from 'path';
import { defineConfig, loadEnv } from 'vite';
import eslintPlugin from 'vite-plugin-eslint';
import babel from 'vite-plugin-babel';
import glsl from 'vite-plugin-glsl';
// import dotenv from 'dotenv';
import dynamicImport from 'vite-plugin-dynamic-import';

export default defineConfig(({ command, mode }) => {
	const env = loadEnv(mode, process.cwd(), '');
	return {
		base: '/cf_portfolio_2024/', // ⛔ githubpages
		// base: './',
		// root: 'src/',
		// publicDir: '../public/',

		plugins: [
			dynamicImport(),
			eslintPlugin({
				cache: true,
				fix: true,
				include: ['src/**/*.js'],
				exclude: ['node_modules', 'dist'],
				extensions: ['.js'],
				formatter: 'codeframe',
				// overrideConfig: {
				// 	rules: {
				// 		'import/no-unresolved': ['error', { ignore: ['../css/inside.css?raw'] }],
				// 	},
				// },
			}),
			babel({
				babelConfig: {
					babelrc: false,
					configFile: false,
					// plugins: ['@babel/plugin-proposal-decorators'],
				},
			}),
			glsl(),
		],
		build: {
			// target: 'es2015',
			// polyfillDynamicImport: false,
			outDir: 'dist',
			// assetsDir: '',
			// minify: 'terser',
			// sourcemap: true,
			rollupOptions: {
				external: [],
				output: {
					manualChunks(id) {
						if (id.includes('node_modules')) {
							return 'vendor';
						}
					},
				},
				input: {
					main: resolve(__dirname, 'index.html'),
					page1: resolve(__dirname, 'src/pages/page1.html'),
				},
			},
		},
		// define: {
		// 	'process.env': JSON.stringify(dotenv.config().parsed),
		// },
		define: {
			'process.env.VITE_API_URL': JSON.stringify(env.VITE_API_URL),
			'process.env.API_URL': JSON.stringify(env.API_URL),
			'process.env.YOUR_BOOLEAN_VARIABLE': env.YOUR_BOOLEAN_VARIABLE,
			// If you want to exposes all env variables, which is not recommended
			// 'process.env': env
		},
		server: {
			host: '0.0.0.0',
			port: 5173, // Asegúrate de que esto coincida con el puerto que estás usando
		},
		resolve: {
			alias: [
				{ find: '@', replacement: path.join(__dirname, 'src') },
				{ find: /^src\//, replacement: path.join(__dirname, 'src/') },
				{ find: '/root/src', replacement: path.join(__dirname, 'src') },
			],
		},
	};
});
