const m = require('mithril')
// https://material.io/resources/icons/?style=baseline
module.exports.DropDown = {
    view(vnode){
        return m.trust(`<span class="material-icons-two-tone ${vnode.attrs.class}">arrow_drop_down</span>`)
    }
}
module.exports.LogOut = {
    view(vnode){
        return m.trust(`<span class="material-icons-two-tone ${vnode.attrs.class}">follow_the_signs</span>`)
    }
}
module.exports.LogIn = {
    view(vnode){
        return m.trust(`<span class="material-icons-two-tone ${vnode.attrs.class}">login</span>`)
    }
}
module.exports.Check = {
    view(vnode){
        return m.trust(`<span class="material-icons-two-tone ${vnode.attrs.class}">assignment_turned_in</span>`)
    }
}
module.exports.Remove = {
    view(vnode){
        return m.trust(`<span class="material-icons-two-tone ${vnode.attrs.class}">remove_circle</span>`)
    }
}
module.exports.Refresh = {
    view(vnode){
        return m.trust(`<span class="material-icons-two-tone ${vnode.attrs.class}">refresh</span>`)
    }
}