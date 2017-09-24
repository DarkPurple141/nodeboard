const path = require('path')

/*
So as to not get confused later,
The script will compile and bundle everything in the entry object,
into everything in the filename output.

ie squares.js -> squares.bundle.js (with all its imports)

Babel is required to deal with certain ES6 features that webpack
doesn't by default.

Use npm run build to compile everything specified to public/dist
*/

module.exports = {
    entry: {
        got: "./public/scripts/got-front.js",
        squares: "./public/scripts/squares-front.js"
    },
    output: {
        path: path.resolve(__dirname, "public/dist"),
        filename: "[name].bundle.js"
    },
    module: {
         loaders: [{
             test: [/\.js$/],
             exclude: /node_modules/,
             loader: 'babel-loader'
         }]
     }
}
