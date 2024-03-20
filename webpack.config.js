// const path = require(`path`);

// module.exports = {
//   entry: {
//     campuses: `./source/js/campuses/index.js`,
//   //  job: `./source/js/job/index.js`,
//     employee: `./source/js/employee/index.js`,
//   },
//   output: {
//     // filename: `campuses.js`,
//     filename: "[name].js",
//     path: path.join(__dirname, `/source/js/single/`)
//   },
//   devServer: {
//     contentBase: path.join(__dirname, `/source/js/campuses/`),
//     open: false,
//     historyApiFallback: true,
//     port: 1337,
//   },
//   module: {
//     rules: [
//       {
//         test: /\.(js|jsx)$/,
//         exclude: /node_modules/,
//         use: {
//           loader: `babel-loader`,
//         },
//       }
//     ],
//   },
//   devtool: `source-map`,
// };
