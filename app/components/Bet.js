const m = require('mithril')
const Bets = require('../model/bets')
const People = require('../model/people')

module.exports = {
    view: (vnode) => {
        let bet = vnode.attrs.bet
        let odd = vnode.attrs.i % 2 === 1
        if (bet) {
            let hasPeople = bet.people.length > 0
            let hasAtLeast2 = bet.people.length > 1
            let peopleBar = m('.flex.space-x-1.mt-1', bet.people.map((name) => {
                return m(`.flex-1.hover:bg-blue-300.cursor-pointer.rounded-full.text-xs.leading-none.py-1.text-center.${People.isSelected(name) ? '.bg-yellow-300.text-black' : '.bg-blue-400.text-white'}`, {
                    onclick: (e) => {
                        e.stopPropagation()
                        Bets.removePerson(name, bet)
                    },
                    style: { width: '100%' }
                },
                    m(`.select-none`, name)
                )
            }))
            let w = parseInt(bet.daysRequired / 30 * 98)
            let betClass = `select-none rounded-lg inline-block mb-1 align-top mr-1 shadow-sm ` +
                `${People.hasSelectedPerson() ? 'hover:bg-gray-300 cursor-pointer' : ''} ` +
                `${hasPeople ? 'bg-green-300' : odd ? 'bg-gray-200' : ''}`
            let betSelectedClass = `w-full border-solid border rounded-lg px-2 py-1 ` +
                `${Bets.selectedTeam && Bets.selectedTeam.toLowerCase() === bet.team.toLowerCase() ? 'bg-yellow-200' : ''}`
            return <div class={betClass} style={`width: ${w}%`} onclick={() => { Bets.addSelected(People.selected, bet) }}>
                <div class={betSelectedClass}>
                    <div>
                        <div class="text-xs clearfix">
                            {hasAtLeast2 ? <img class="float-right inline-block h-4" src="images/check.png" /> : null}
                            <span class="text-gray-500 mr-1 float-right">{bet.team.toLowerCase()}</span>
                            <span class="text-sm">{bet.name}</span>
                        </div>
                    </div>
                    {peopleBar}
                </div>
            </div>
        } else {
            return <div>no bets found</div>
        }
    }
}