const path = require('path')

module.exports = {
  entry: './src/index.js',
  output: {
    filename: 'main.js',
    path: path.resolve(__dirname, 'public')
  },
  devtool: 'source-map',
//   resolve: {
//     fallback: {
//         "fs": false,
//         "path": false,
//         "url": false,
//         "util": false,
//         "http": false,
//         "stream": false,
//         "buffer": false,
//         "string_decoder": false,
//         "querystring": false,
//         "zlib": false,
//         "net": false,
//         "events": false,
//         "crypto": false
//     },
// }
}
