import resolve from 'rollup-plugin-node-resolve';
import sourcemaps from 'rollup-plugin-sourcemaps';
import commonjs from 'rollup-plugin-commonjs';

export default {
    input: 'index.js',
    external: [ 'request', 'debug' ],
    globals: {
        'debug': 'debug'
    },
    output: {
        format: 'umd',
        name: 'neoskop.uptrends',
        file: 'dist/uptrends-api.bundle.js',
        sourcemap: true
    },
    plugins: [
        resolve(),
        commonjs(),
        sourcemaps()
    ],
    treeshake: true,
    amd: {
        id: '@neoskop/uptrends-api'
    }
}
