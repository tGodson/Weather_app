const HtmlWebpackPlugin = require('html-webpack-plugin');// eslint-disable-line import/no-extraneous-dependencies

module.exports = {
  entry: './src/index.js',
  plugins: [new HtmlWebpackPlugin({
    template: './src/template.html',
  })],
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [
          'style-loader',
          'css-loader',
        ],
      },
      {
        test: /\.html$/,
        use: ['html-loader'],
      },
      {
        test: /\.(png|svg|jpg|gif|jpeg)$/,
        use: {
          loader: 'file-loader',
          options: {
            name: '[name].[hash].[ext]',
            outputPath: 'imgs',
          },
        },
      },
    ],
  },
};