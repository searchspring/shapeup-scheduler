const m = require('mithril')
const Bets = require('../model/bets')
const People = require('../model/people')
const { Remove } = require('../utils/icons')
function firstName(name){
    return name.substring(0, name.indexOf(' '))
}
module.exports = {
    view: (vnode) => {
        let bet = vnode.attrs.bet
        if (bet) {
            let peopleBar = m('', bet.people.map((name) => {
                return m('.hover:bg-gray-300.cursor-pointer.rounded-full.mb-1.bg-gray-500.text-xs.leading-none.py-1.text-center.text-white', { style: { width: '100%' } },
                    m('.flex', [
                        m('.flex-grow', {
                            onclick: () => {
                                Bets.removePerson(name, bet)
                            }
                        }, firstName(name))
                    ])
                )
            }))
            let w = parseInt(bet.daysRequired / 30 * 100)

            return m('.inline-block.mb-1.align-top', { style: { width: w + '%' } },
                m('.w-full.border-solid.border-2.rounded-lg.p-1', [
                    m('', {
                        onclick: () => {
                            Bets.addSelected(People.selected, bet)
                        }
                    }, m('.hover:bg-red-200.cursor-pointer.text-xs', bet.team + ': ' + bet.name)),
                    peopleBar
                ]))
        } else {
            return m('', 'no person set')
        }
    }
}