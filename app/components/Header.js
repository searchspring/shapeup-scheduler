const m = require('mithril')
const Links = require('./Links')

module.exports = {
    view: (vnode) => {
        return <div style="background-color: #3a23ad" class="text-white mb-4">
            <a href="/"><img class="h-6 inline-block ml-4 mr-3 my-2" src="images/logo.svg" />
                <span class="text-lg inline-block align-middle">Shapeup Scheduler</span>
            </a>
            <Links />
        </div>

    }
}