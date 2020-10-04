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
            let betList = Bets.list.map((bet) => {
                return m(Bet, { daysAvailable: vnode.attrs.daysAvailable, bet: bet })
            })
            return m('', m('', [
                m('.flex', [
                    m('.flex-1', 'bets'),
                    m('.flex-1.text-right.text-xs.text-blue-500.underline.cursor-pointer', {
                        onclick: () => {
                            Bets.sync()
                        }
                    }, 'sync')
                ]), betList
            ]))
        }
    }
}
