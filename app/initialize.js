require("@babel/polyfill")
const m = require('mithril')

const Home = require('./views/Home')
const Setup = require('./views/Setup')
const setup = require('./model/setup')
const Privacy = require("./views/Privacy")
const Terms = require("./views/Terms")

const Auth = (view) => {
  return {
    onmatch() {
      if (!setup.isSetup()) {
        m.route.set('/setup')
      }
      else {
        return view
      }
    },
  }
}


document.addEventListener('DOMContentLoaded', () => {
  m.route(document.body, '/', {
    '/': Auth(Home),
    '/setup': Setup,
    '/privacy': Privacy,
    '/terms': Terms
  })
});

