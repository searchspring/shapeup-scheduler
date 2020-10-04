const People = require("../model/people")
const m = require('mithril')
const Person = require("./Person")

module.exports = {
    view: function (vnode) {
        let peopleList = People.list.map((person) => {
            return m(Person, { person: person, daysAvailable: vnode.attrs.daysAvailable })
        })
        return m('', m('#left', 'people', peopleList))
    }
}