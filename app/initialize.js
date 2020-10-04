require("@babel/polyfill")
const m = require('mithril')

const Home = require('./views/Home')

document.addEventListener('DOMContentLoaded', () => {
  m.route(document.body, '/', {
    '/': Home,
  })
})