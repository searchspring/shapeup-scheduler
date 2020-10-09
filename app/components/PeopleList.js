const People = require("../model/people")
const m = require('mithril')
const Person = require("./Person")
const user = require("../model/user")

module.exports = {
    oninit: () => {
        user.signIn()
    },
    view: (vnode) => {
        let lastTeam = ''
        let peopleList = People.list.map((person) => {
            let teamTitle = null
            if (lastTeam !== person.team) {
                teamTitle = m('.text-sm', person.team)
            }
            lastTeam = person.team
            return [teamTitle, m(Person, { person: person, daysAvailable: vnode.attrs.daysAvailable })]
        })
        return m('', [
            m('.flex-1.float-right.text-xs.text-blue-500.underline.cursor-pointer', {
                onclick: () => {
                    People.sync()
                }
            }, user.token ? 'sync users' : ''),
            peopleList
        ])

    }
}
