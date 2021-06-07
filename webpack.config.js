
module.exports = {
  use: {
    loader: 'babel-loader',
    options: {
      presets: ['mapbox'],
      ignore: [ './node_modules/mapbox-gl/dist/mapbox-gl.js' ]
    }
  },
  module: {
    rules: [
      {
        test: /\bmapbox-gl-csp-worker.js\b/i,
        use: { loader: "worker-loader" },
      },
    ],
  },
};
