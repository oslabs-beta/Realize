const path = require('path');
const CopyPlugin = require('copy-webpack-plugin');

module.exports = {
  entry: {
    bundle: './extension/devtools/panel/panel.js',
    // "create-panel": './extension/devtools/create-panel.js'
  },
  output: {
    filename: '[name].js',
    path: path.resolve(__dirname, 'build/extension'),
  },
  plugins: [
    new CopyPlugin({
      patterns: [
        { from: 'extension/manifest.json', to: '../extension/manifest.json' },
        { from: 'extension/backend/background.js', to: '../extension/background.js' },
        { from: 'extension/devtools/devtools-root.html', to: '../extension/devtools-root.html' },
        { from: 'extension/devtools/create-panel.js', to: '../extension/create-panel.js' },
        { from: 'extension/devtools/panel/panel.html', to: '../extension/panel.html' },
      ],
      }),
  ],
};