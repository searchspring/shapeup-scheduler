// See http://brunch.io for documentation.
exports.files = {
  javascripts: {
    joinTo: {
      'app.js': /^app/,
      'vendor.js': /^(?!app)/
    }
  },
  stylesheets: { joinTo: 'app.css' }
}

exports.plugins = {
  babel: { presets: ['@babel/env'] },
  postcss: {
    processors: [
      require('tailwindcss')
    ]
  },
}