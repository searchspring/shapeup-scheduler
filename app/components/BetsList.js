const m = require('mithril')
const Bets = require("../model/bets")
const People = require('../model/people')
const Bet = require('./Bet')

module.exports = {
    oninit: function () {
        Bets.loadList()
    },
    view: function (vnode) {
        if (Bets.list) {
            return m('', m('', 'bets', Bets.list.map((bet) => {
                return m(Bet, { daysAvailable: vnode.attrs.daysAvailable, bet: bet, selectedPeople: vnode.attrs.selectedPeople })
            })))
        } else {
            return m('', 'loading')
        }
    }
}