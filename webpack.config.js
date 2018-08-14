const HtmlWebpackPlugin = require("html-webpack-plugin")
const MiniCssExtractPlugin = require("mini-css-extract-plugin")
const CompressionPlugin = require("compression-webpack-plugin")

let config = {
  entry: ["babel-polyfill", "./src/index.js"],
  output: {
    publicPath: "/"
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: ["babel-loader"]
      },
      {
				test: /\.scss$/,
				exclude: /node_modules/,
				use: [
					{
						loader: MiniCssExtractPlugin.loader
					},
					"css-loader",
					"sass-loader"
				]
      }
    ]
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: "[name].css",
      chunkFilename: "[id].css"
		}),
		new HtmlWebpackPlugin({
			template: "./src/index.html"
		})
  ]
}

module.exports = (env, argv) => {
  if (argv.mode === "development") {
    config.devtool = "source-map"
    config.devServer = {
      inline: true,
      historyApiFallback: true
    }
  }
  if (argv.mode === "production") {
    config.optimization = {
			runtimeChunk: false,
      splitChunks: {
        cacheGroups: {
          commons: {
            test: /[\\/]node_modules[\\/]/,
            name: "vendor",
            chunks: "all"
          }
        }
      }
		}
		config.plugins.push(
			new CompressionPlugin({
				asset: "[path].gz[query]",
				algorithm: "gzip",
				test: /\.js$|\.css$|\.html$|\.eot?.+$|\.ttf?.+$|\.woff?.+$|\.svg?.+$/,
				threshold: 10240,
				minRatio: 0.8
			})
		)
  }

  return config
}