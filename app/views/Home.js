const m = require('mithril')
const BetsList = require('../components/BetsList')
const PeopleList = require('../components/PeopleList')
const Bets = require('../model/bets')
const People = require('../model/people')
const Setup = require('../model/setup')

module.exports = {
    oninit: function () {
        Setup.loadFromStore()
        People.loadList()
        Bets.loadList()
    },
    view: function () {
        if (People.list && Bets.list) {
            let daysAvailable = {}
            People.list.map((person) => {
                daysAvailable[person.name] = person.daysAvailable
            })

            return m('.flex.m-2', [
                m('.w-1/4.mr-2', m(PeopleList, { daysAvailable: Bets.calculateDaysAvailable(daysAvailable) })),
                m('.w-3/4', m(BetsList, { daysAvailable: daysAvailable }))
            ])
        }
    }
}