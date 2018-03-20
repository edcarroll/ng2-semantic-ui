// Karma configuration file, see link for more information
// https://karma-runner.github.io/0.13/config/configuration-file.html
//tslint:disable
module.exports = function (config) {
    config.set({
        basePath: '',
        frameworks: ['jasmine', '@angular/cli'],
        plugins: [
            require('karma-jasmine'),
            require('karma-phantomjs-launcher'),
            require('karma-chrome-launcher'),
            require('karma-min-reporter'),
            require('karma-jasmine-html-reporter'),
            require('karma-coverage-istanbul-reporter'),
            require('@angular/cli/plugins/karma')
        ],
        client: {
            clearContext: false // leave Jasmine Spec Runner output visible in browser
        },
        angularCli: {
            environment: 'dev'
        },
        reporters: ['min'],
        coverageIstanbulReporter: {
            reports: ['html', 'text-summary'],
            fixWebpackSourcePaths: true
        },
        port: 9876,
        colors: true,
        logLevel: config.LOG_INFO,
        autoWatch: true,
        browsers: ['PhantomJS'],
        singleRun: true
    });
};
//# sourceMappingURL=karma.conf.js.map