import nodeResolve from 'rollup-plugin-node-resolve'
import commonjs from 'rollup-plugin-commonjs';
import uglify from 'rollup-plugin-uglify'

export default {
    moduleName: 'ng2-semantic-ui',
    entry: 'index.js',
    dest: 'bundles/ng2-semantic-ui.umd.min.js', // output a single application bundle
    sourceMap: false,
    format: 'umd',
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
    plugins: [
        nodeResolve({
            jsnext: true,
            module: true
        }),
        commonjs({
            include: [
                'node_modules/element-closest/**',
                'node_modules/web-animations-js/**',
                'node_modules/popper.js/**'
            ]
        }),
        uglify()
    ],
    external: [
        '@angular/common',
        '@angular/core',
        '@angular/forms',
        '@angular/http',
        '@angular/platform-browser',
        'rxjs/Subscription',
  ],
}