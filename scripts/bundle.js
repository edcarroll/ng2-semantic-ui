const rollup = require("rollup");
const nodeResolve = require("rollup-plugin-node-resolve");
const commonjs = require("rollup-plugin-commonjs");
const uglify = require("rollup-plugin-uglify");

const rollupAnalyzer = require('rollup-analyzer')({
    limit: 20
})

const defaultPlugins = [
    nodeResolve({
        jsnext: true,
        module: true
    }),
    commonjs({
        namedExports: {
            "node_modules/bowser/src/bowser.js": ["mobile", "tablet"]
        },
        include: [
            "node_modules/element-closest/**",
            "node_modules/popper.js/**",
            "node_modules/date-fns/**",
            "node_modules/bowser/src/bowser.js",
            "node_modules/is-ua-webview/**",
            "node_modules/extend/**"
        ]
    })
]

function configure(plugins = []) {
    return {
        entry: "dist/index.js",
        // sourceMap: false, !!generate!!
        onwarn: function(warning) {
            // Skip certain warnings

            // should intercept ... but doesn't in some rollup versions
            if (warning.code === 'THIS_IS_UNDEFINED') {
                return;
            }
            // intercepts in some rollup versions
            if (warning.message.indexOf("The 'this' keyword is equivalent to 'undefined'") > -1 ) {
                return;
            }
      
            // console.warn everything else
            console.warn(warning.message);
        },
        plugins: [...defaultPlugins, ...plugins],
        external: [
            "@angular/common",
            "@angular/core",
            "@angular/forms",
            "rxjs/Subscription"
        ]
    }
}

// Regular bundle
rollup
    .rollup(configure())
    .then(bundle => {
        bundle.write({
            moduleName: "ng2-semantic-ui",
            dest: "bundles/ng2-semantic-ui.umd.js",
            format: "umd",
        })
    })

// Minfied bundle
rollup
    .rollup(configure(
        [uglify()]
    ))
    .then(bundle => {
        // rollupAnalyzer.formatted(bundle).then(console.log).catch(console.error)
        bundle.write({
            moduleName: "ng2-semantic-ui",
            dest: "bundles/ng2-semantic-ui.umd.min.js",
            format: "umd"
        })
    })