import babel from 'rollup-plugin-babel';

let pkg = require('./package.json');

export default {
	input: 'index.js',
	plugins: [
		babel( {
			exclude: [
				'node_modules/**',
			],
		} ),
	],
	output: {
		file: pkg.main,
		format: 'cjs',
	},
};
