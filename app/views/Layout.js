const m = require('mithril')
const Header = require('../components/Header')

module.exports = {
    view: function (vnode) {
        return <div>
            <Header />
            <div class="content">
            {vnode.children}
            </div>
        </div>
    }
}