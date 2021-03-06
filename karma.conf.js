const webpack = require('webpack')
const webpackConfig = require('./webpack.config')

const PRODUCTION = false
const DEVELOPMENT = false
const __DEBUG__ = false

const karmaWebpackConfig = Object.assign({}, webpackConfig, {
  devtool: 'inline-source-map',
  resolve: {
    modulesDirectories: [
      'src',
      'node_modules',
    ],
    extensions: ['', '.json', '.js'],
  },
  plugins: [
    new webpack.DefinePlugin({ DEVELOPMENT, PRODUCTION, __DEBUG__ }),
    new webpack.optimize.OccurrenceOrderPlugin(),
  ],
  externals: {
    cheerio: 'window',
    'react/lib/ExecutionEnvironment': true,
    'react/lib/ReactContext': 'window',
  },
})

module.exports = (karmaConfig) => {
  karmaConfig.set({

    // browsers: ['Chrome'],
    browsers: ['PhantomJS'],

    singleRun: !!process.env.CONTINUOUS_INTEGRATION,

    frameworks: ['mocha', 'sinon', 'chai'],

    files: [
      './node_modules/whatwg-fetch/fetch.js',
      './node_modules/phantomjs-polyfill/bind-polyfill.js',
      './node_modules/babel-polyfill/dist/polyfill.js',
      'tests.karma.js',
    ],

    preprocessors: {
      'tests.karma.js': ['webpack', 'sourcemap'],
    },

    reporters: ['mocha'],

    plugins: [
      require('karma-webpack'),
      require('karma-mocha'),
      require('karma-sinon'),
      require('karma-chai'),
      require('karma-mocha-reporter'),
      require('karma-phantomjs-launcher'),
      require('karma-sourcemap-loader'),
    ],

    webpack: karmaWebpackConfig,

    webpackServer: {
      noInfo: true,
      quiet: true,
    },

  })
}
