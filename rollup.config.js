import { terser } from "rollup-plugin-terser";
import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import htmlTemplate from 'rollup-plugin-generate-html-template';
import clear from 'rollup-plugin-clear';
import serve from 'rollup-plugin-serve';
import kontra from "rollup-plugin-kontra";
import copy from "rollup-plugin-copy-assets";

// dev build if watching, prod build if not
const production = !process.env.ROLLUP_WATCH;

export default {
    input: 'src/main.js',
    output: [
        { file: !production ? "dist/main.js" : "dist/main.js", format: 'iife' },
    ],
    plugins: [
        clear({
            targets: ['dist'],
            watch: true,
        }),
        copy({
            assets: [
                "assets/",
            ],
        }),
        kontra({ // tree-shaking
            gameObject: {
                anchor: true,
                group: true,
                velocity: true,
                ttl: true,
            },
            debug: !production
        }),

        resolve(), // add node modules
        commonjs(), // transform code to ES6 to make compatible with rollup

        htmlTemplate({
            template: 'src/index.html',
            target: !production ? 'dist/index.html' : 'dist/index.dist.html',
        }),

        !production && serve({
            open: true,
            verbose: true,
            contentBase: ['dist'],
            port: 8080
        }),

        production && terser(),
    ]
};