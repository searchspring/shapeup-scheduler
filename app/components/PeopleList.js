const People = require("../model/people")
const m = require('mithril')
const Person = require("./Person")

module.exports = {
    view: function (vnode) {
        let peopleList = People.list.map((person) => {
            return m(Person, { person: person, daysAvailable: vnode.attrs.daysAvailable })
        })
        return m('', m('', [
            m('.flex', [
                m('.flex-1', 'people'),
                m('.flex-1.text-right.text-xs.text-blue-500.underline.cursor-pointer', {
                    onclick:()=>{
                        People.sync()
                    }
                },'sync')
            ]), peopleList
        ]))
    }
}
