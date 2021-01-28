const m = require('mithril')
const { spinner } = require('../css')
const Bets = require("../model/bets")
const People = require('../model/people')
const user = require('../model/user')
const Bet = require('./Bet')

module.exports = {
    loading: false,
    oninit: function () {
        user.signIn()
    },
    view: function (vnode) {
        if (Bets.list) {
            let betList = Bets.list.map((bet) => {
                return m(Bet, { daysAvailable: vnode.attrs.daysAvailable, bet: bet })
            })
            return m('', m('', [
                m('.flex', [
                    m('.flex-1', 'Bets'),
                    m('.flex-initial.text-right.text-xs.text-blue-500.underline.cursor-pointer', {
                        onclick: () => {
                            vnode.state.loading = true
                            Bets.sync(()=>{
                                vnode.state.loading = false
                                m.redraw()
                            })
                        }
                    }, user.token ? [vnode.state.loading ? spinner({class: 'mr-2'}) : null, 'sync bets']:'')
                ]), betList
            ]))
        }
    }
}
