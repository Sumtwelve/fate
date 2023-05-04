const HtmlWebpackPlugin = require('html-webpack-plugin');
const WebpackPwaManifest = require('webpack-pwa-manifest');
const path = require('path');
const { InjectManifest } = require('workbox-webpack-plugin');

module.exports = () => {
  return {
    mode: 'development',
    entry: {
      main: './src/js/index.js',
      install: './src/js/install.js'
    },
    output: {
      filename: '[name].bundle.js',
      path: path.resolve(__dirname, 'dist'),
    },
    plugins: [
      new HtmlWebpackPlugin({
        title: 'FATE',
        template: './index.html',
        favicon: './favicon.ico'
      }),
      new InjectManifest({
        swSrc: './src-sw.js',
        swDest: 'service-worker.js'
      }),
      new WebpackPwaManifest({
        name: "Finally, Another Text Editor",
        short_name: "FATE",
        description: "A simple text editor presented as a PWA.",
        background_color: '#FFFFFF',
        theme_color: 'white',
        start_url: './',
        publicPath: './',
        fingerprints: false,
        icons: [
          {
            src: path.resolve('./src/images/logo.png'),
            sizes: [96, 128, 192, 256, 384, 512],
            destination: path.join('assets', 'icons')
          }
        ]
      })
    ],

    module: {
      rules: [
        {
          test: /\.css$/i,
          use: ['style-loader', 'css-loader']
        },
        {
          test: /\.(png|jpe?g|svg|gif)$/i,
          type: 'asset/resource'
        },
        {
          test: /\.m?js$/i,
          exclude: /(node_modules|bower_components)/,
          use: {
            loader: 'babel-loader',
            options: {
              presets: ['@babel/preset-env']
            }
          }
        }
      ],
    },
  };
};
