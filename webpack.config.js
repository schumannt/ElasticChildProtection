const webpack = require('webpack');
const path = require('path');

module.exports = {
  entry: [
    './app/index'
  ],
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: [
          {
            loader: 'babel-loader',
            options: {
              presets: ['react', 'es2015', 'stage-0'],
              plugins: [
                'transform-decorators-legacy'
              ]
            }
          }
        ]
      },
      { test: /\.less/, loader: 'style-loader!css-loader' }
    ]
  },
  resolve: {
    extensions: ['.js']
  },
  output: {
    path: path.join(__dirname, 'public'),
    filename: 'bundle.js'
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoEmitOnErrorsPlugin()
  ],
  node: {
    fs: 'empty',
    tls: 'empty',
    tls: 'empty',
    net: 'empty'
  }
};
