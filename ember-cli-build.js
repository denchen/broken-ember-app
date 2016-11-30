/* global require, module */
var EmberApp = require('ember-cli/lib/broccoli/ember-app');

module.exports = function(defaults) {
  var app = new EmberApp(defaults, {
    babel: {
      optional: ['es6.spec.symbols'],
      includePolyfill: true
    },
    postcssOptions: {
      filter: {
        enabled: false
      },
      compile: {
        enabled: true,
        plugins: [{
          module: require('postcss-import'),
        }, {
          // Note that we could've included this as a plugin to postcss-import
          // above. This would be necessary if we needed to exclude any CSS
          // files. The drawback is, stylelint would only be run on the
          // imported files, not the base file at styles/app.css (which does
          // all the @import's). So ideally, we include the plugin here. See:
          // https://github.com/stylelint/stylelint/blob/master/docs/user-guide/postcss-plugin.md#usage-examples
          module: require('stylelint'),
          options: {
            // This config can be in here, package.json, or .stylelintrc
            config: {
              extends: 'stylelint-config-standard',
              rules: {
                // PaaS team likes capitalized hex values (eg. #FFF)
                'color-hex-case': null,
                // Next five disallows vendor prefixing, which is covered
                // by autoprefixer (included in postcss-cssnext)
                'at-rule-no-vendor-prefix': true,
                'media-feature-name-no-vendor-prefix': true,
                'property-no-vendor-prefix': true,
                'selector-no-vendor-prefix': true,
                'value-no-vendor-prefix': true,
                // PaaS normal & bold are different from default
                'font-weight-notation': 'numeric',
                // PaaS console is designed only for desktops (for now)
                'no-unsupported-browser-features': [ true, {
                  browsers: 'last 5 Chrome versions, last 5 Firefox versions, last 5 Safari versions'
                }],
                // All custom rules should be in --root
                'custom-property-no-outside-root': true,
                'selector-root-no-composition': true,
                'at-rule-no-unknown': true
              }
            }
          }
        }, {
          module: require('postcss-cssnext'),
          options: {
            browsers: ['last 5 Chrome versions', 'last 5 Firefox versions', 'last 5 Safari versions']
          }
        }, {
          module: require('postcss-reporter'),
          options: {
            clearMessages: true
          }
        }]
      }
    }
  });

  // Use `app.import` to add additional libraries to the generated
  // output files.
  //
  // If you need to use different assets in different
  // environments, specify an object as the first parameter. That
  // object's keys should be the environment name and the values
  // should be the asset to use in that environment.
  //
  // If the library that you are including contains AMD or ES6
  // modules that you would like to import into your application
  // please specify an object with the list of modules as keys
  // along with the exports of each module as its value.

  app.import('bower_components/deepmerge/index.js');

  return app.toTree();
};
