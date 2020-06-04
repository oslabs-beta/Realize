const path = require('path');
const CopyPlugin = require('copy-webpack-plugin');
const ExtensionReloader = require('webpack-extension-reloader');

module.exports = {
  // Files to bundle
  entry: {
    bundle: './extension/devtools/panel/panel.js',
    // "create-panel": './extension/devtools/create-panel.js'
    background: './extension/backend/background.js',
    hook: './extension/backend/hook.js'
  },
  // Location to bundle them to
  output: {
    filename: '[name].js',
    path: path.resolve(__dirname, 'build/extension'),
  },
  // Modules to load non-jacvascript files
  module: {
    rules: [
      // CSS Loader
      {
        test: /\.css$/i,
        use: ['style-loader', 'css-loader'],
      },
      // SASS Loader
      {
        test: /\.s[ac]ss$/i,
        use: [
          // Creates `style` nodes from JS strings
          'style-loader',
          // Translates CSS into CommonJS
          'css-loader',
          // Compiles Sass to CSS
          'sass-loader',
        ],
      },
    ],
  },

  plugins: [
    // Copies files to 'build' folder without bundling them
    new CopyPlugin({
      patterns: [
        { from: 'extension/manifest.json', to: '../extension/manifest.json' },
        {
          from: 'extension/backend/background.js',
          to: '../extension/background.js',
        },
        {
          from: 'extension/devtools/devtools-root.html',
          to: '../extension/devtools-root.html',
        },
        {
          from: 'extension/devtools/create-panel.js',
          to: '../extension/create-panel.js',
        },
        {
          from: 'extension/devtools/panel/panel.html',
          to: '../extension/panel.html',
        },
        // { from: 'extension/backend/hook.js', to: '../extension/hook.js' },
        {
          from: 'extension/backend/content_script.js',
          to: '../extension/content_script.js',
        },
        {
          from: 'extension/devtools/panel/styles.css',
          to: '../extension/styles.css',
        },
        {
          from: 'extension/devtools/palm-tree.svg',
          to: '../extension/palm-tree.svg',
        },
      ],
    }),
    // Enables hot reloading - use npm run dev command
    new ExtensionReloader({
      manifest: path.resolve(__dirname, './extension/manifest.json'),
      entries: {
        bundle: 'bundle',
        background: '`background',
      },
    }),
  ],
  // devtool: 'cheap-module-source-map', // Needed as to stop Chrome eval errors when using dev server
};
