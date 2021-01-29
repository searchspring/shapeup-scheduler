const m = require('mithril')

module.exports = {
    view: (vnode) => {
        return <div class="text-sm float-right mr-4 mt-3">
            <a href="#!/setup" class="ml-4 cursor-pointer hover:underline">Setup</a>
            <a href="#!/privacy" class="ml-4 cursor-pointer hover:underline">Privacy</a>
            <a href="#!/terms" class="ml-4 cursor-pointer hover:underline">Terms</a>
            <a target="_blank" href="https://searchspring.com/careers/" class="ml-4 cursor-pointer hover:underline">We hiring!</a>
        </div>
    }
} 