const People = require("../model/people")
const m = require('mithril')
const Person = require("./Person")
const user = require("../model/user")
const { spinner } = require("../css")

module.exports = {
    loading: false,
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
                    vnode.state.loading = true
                    People.sync(() => {
                        vnode.state.loading = false
                    })
                }
            }, user.token ? [vnode.state.loading ? spinner({class: 'mr-2'}) : null, `sync users`] : ''),
            peopleList
        ])

    }
}
