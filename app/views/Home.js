const m = require('mithril')
const BetsList = require('../components/BetsList')
const PeopleList = require('../components/PeopleList')
const Bets = require('../model/bets')
const People = require('../model/people')
const Layout = require('./Layout')

module.exports = {
    oninit: function () {
        People.loadList()
        Bets.loadList()
    },
    view: function (vnode) {
        if (People.list && Bets.list) {
            let daysAvailable = {}
            People.list.map((person) => {
                daysAvailable[person.name] = person.daysAvailable
            })

            return m(Layout,
                m('.flex.m-2', [
                    m('.w-1/4.mr-2', m(PeopleList, { daysAvailable: Bets.calculateDaysAvailable(daysAvailable) })),
                    m('.flex-grow', m(BetsList, { daysAvailable: daysAvailable }))
                ])
            )
        }
    }
}