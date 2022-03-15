module.exports = {
  mode: 'development',
  entry: __dirname + '/client/index.jsx',
  output: {
    path: __dirname + '/public',
    filename: 'bundle.js'
  },
  // resolve: {
	// 	root: __dirname,
  //               // for webpack 1:
	// 	modulesDirectories : ["path/to/Tone.js/"],
  //               // for webpack 2:
  //               modules : ["path/to/Tone.js/"]
	// },
  module: {
    rules: [
      {
        test: /\.jsx$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-react', '@babel/preset-env']
          }
        }
      },
      {
        test: /\.mp3$/,
        use: {
          loader: 'file-loader'
        }

      }
    ]
  },

}