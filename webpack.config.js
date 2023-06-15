import webpack from 'webpack';

export default {
  entry: "./src/app.ts",
  output: {
    filename: `bundle.js`,
  },
  target: 'node',
  mode: 'production',
  plugins: [
    new webpack.optimize.LimitChunkCountPlugin({
      maxChunks: 1
    })
  ],
};