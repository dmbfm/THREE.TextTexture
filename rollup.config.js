import babel from 'rollup-plugin-babel';
import nodeResolve from 'rollup-plugin-node-resolve';
import commonjs from 'rollup-plugin-commonjs';
import minify from 'rollup-plugin-babel-minify';

export default {
	input: 'src/THREE.TextTexture.js',
	external: ['vue', 'three'],
	output: {
		file: 'THREE.TextTexture.js',
		format: 'umd',
		name: 'THREE.TextTexture',
		globals: {
			'vue': 'Vue',
			'three': 'THREE',
		},
	},
	plugins: [
		babel({
			exclude: 'node_modules/**',
			presets: [
				['env', {
					targets: {
						'browsers': ['last 2 versions'],
					},
					modules: false,
					useBuiltIns: true,
				}],
			],
		}),
		nodeResolve(),
		commonjs({
			include: 'node_modules/**',
		}),
		minify({comments: false}),
	],
};