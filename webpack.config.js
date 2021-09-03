const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const config = require('config');
const webpack = require('webpack');
const CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = {
  mode: 'development',
  resolve: {
    extensions: ['.js', '.jsx', '.scss'],
    alias: {
      app: path.resolve(__dirname, 'src/js')
    }
  },
  entry: './src/js/app.jsx',
  output: {
    path: path.join(__dirname, '/public'),
    filename: 'bundle.js'
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        include: /(src[\/\\]js)/,
        loader: 'babel-loader'
      },
      {
        test: /\.jsx?$/,
        include: /(src[\/\\]js)/,
        loader: 'babel-loader'
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader']
      },
      {
        test: /\.scss$/,
        use: [
          'style-loader',
          {
            loader: 'css-loader',
            options: {
              modules: {
                mode: 'local',
                localIdentName: '[local]-[hash:base64:5]'
              }
            }
          },
          'sass-loader'
        ]
      },
      {
        test: /\.(png|ico|gif)?$/,
        loader: 'file-loader'
      }
    ]
  },
  devServer: {
    contentBase: path.join(__dirname, 'dist'),
    compress: true,
    port: 8091,
    hot: true
  },
  plugins: [
    new CopyWebpackPlugin([
      { from: './assets', to: './assets' }
    ]),
    new webpack.HotModuleReplacementPlugin(),
    new HtmlWebpackPlugin({
      inject: 'body',
      template: path.join(__dirname, './src/index.html')
    }),
    new webpack.IgnorePlugin(/^(buffertools)$/),
    new webpack.DefinePlugin({
      ENV: JSON.stringify(config.webpack),
      appConfig: JSON.stringify(config.clientConfig)
    }),
    new webpack.LoaderOptionsPlugin({ debug: process.env === 'production' })
  ],
  optimization: {
    noEmitOnErrors: true // NoEmitOnErrorsPlugin
  },
  devtool: 'source-map'
};
