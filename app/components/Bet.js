const m = require('mithril')
const People = require('../model/people')
const { Remove } = require('../utils/icons')
module.exports = {
    view: (vnode) => {
        let bet = vnode.attrs.bet
        if (bet) {
            let peopleBar = m('', bet.people.map((name) => {
                return m('.rounded-full.mb-1.bg-gray-500.text-xs.leading-none.py-1.text-center.text-white', { style: { width: '100%' } },
                    m('.flex', [
                        m('.flex-grow.cursor-not-allowed', {
                            onclick: () => {
                                bet.people = bet.people.filter((tofilter) => {
                                    return tofilter !== name
                                })
                            }
                        }, name)
                    ])
                )
            }))
            let w = parseInt(bet.daysRequired / 30 * 100)

            return m('.mb-3', { style: { width: w + '%' } },
                m('.w-full.bg-grey-light', [
                    m('', {
                        onclick: () => {
                            People.selected.map((name)=>{
                                bet.people.push(name)
                            })
                        }
                    }, m('.hover:bg-red-200.cursor-pointer', bet.name)),
                    peopleBar
                ]))
        } else {
            return m('', 'no person set')
        }
    }
}