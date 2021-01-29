const m = require('mithril')
const Bets = require('../model/bets')
const People = require('../model/people')
const { Remove } = require('../utils/icons')

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
                        }, name)
                    ])
                )
            }))
            let w = parseInt(bet.daysRequired / 30 * 100)

            return m('.inline-block.mb-1.align-top.mr-1', { style: { width: w + '%' } },
                m('.w-full.border-solid.border-2.rounded-lg.p-1', [
                    m('', {
                        onclick: () => {
                            Bets.addSelected(People.selected, bet)
                        }
                    }, m(`${People.hasSelectedPerson() ? '.hover:bg-red-200':''}.cursor-pointer.text-xs`, bet.team + ': ' + bet.name)),
                    peopleBar
                ]))
        } else {
            return <div>no bets found</div>
        }
    }
}