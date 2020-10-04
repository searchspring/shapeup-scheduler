const People = require("../model/people")
const m = require('mithril')
const Person = require("./Person")

module.exports = {
    view: function (vnode) {
        let lastTeam = ''
        let peopleList = People.list.map((person) => {
            let spacer = null
            if (lastTeam !== ''  && lastTeam !== person.team) {
                spacer = m('.mb-4', '')
            }
            lastTeam = person.team
            return [spacer, m(Person, { person: person, daysAvailable: vnode.attrs.daysAvailable })]
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
