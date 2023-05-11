const { override, addWebpackAlias, addBabelPlugins } = require('customize-cra');
const webpack = require('webpack');
const path = require('path');

const addWeb3plugin = (config) => {
  const fallback = config.resolve.fallback || {};
  Object.assign(fallback, {
    crypto: require.resolve('crypto-browserify'),
    stream: require.resolve('stream-browserify'),
    assert: require.resolve('assert'),
    http: require.resolve('stream-http'),
    https: require.resolve('https-browserify'),
    os: require.resolve('os-browserify'),
    url: require.resolve('url'),
    fs: false,
    net: false,
  });
  config.ignoreWarnings = [/Failed to parse source map/];
  config.resolve.fallback = fallback;
  config.plugins = (config.plugins || []).concat([
    new webpack.ProvidePlugin({
      process: 'process/browser',
      Buffer: ['buffer', 'Buffer'],
    }),
  ]);
  config.ignoreWarnings = [/Failed to parse source map/];
  config.module.rules.push({
    test: /\.(js|mjs|jsx)$/,
    enforce: 'pre',
    loader: require.resolve('source-map-loader'),
    resolve: {
      fullySpecified: false,
    },
  });
  return config;
};

module.exports = override(
  addWebpackAlias({
    '@assets': path.resolve(__dirname, 'src', 'assets'),
    '@config': path.resolve(__dirname, 'src', 'config'),
    '@constants': path.resolve(__dirname, 'src', 'constants'),
    '@hooks': path.resolve(__dirname, 'src', 'hooks'),
    '@mock': path.resolve(__dirname, 'src', 'mock'),
    '@services': path.resolve(__dirname, 'src', 'services'),
    '@states': path.resolve(__dirname, 'src', 'states'),
    '@styles': path.resolve(__dirname, 'src', 'styles'),
    '@utils': path.resolve(__dirname, 'src', 'utils'),
    '@pages': path.resolve(__dirname, 'src/components', 'pages'),
    '@atoms': path.resolve(__dirname, 'src/components', 'atoms'),
    '@articles': path.resolve(__dirname, 'src/components', 'articles'),
  }),
  addWeb3plugin,
  ...addBabelPlugins(['babel-plugin-styled-components']),
);
