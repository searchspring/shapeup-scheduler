const m = require('mithril')
const { spinner } = require('../css')
const Bets = require("../model/bets")
const Setup = require('../model/setup')
const user = require('../model/user')
const Bet = require('./Bet')

module.exports = {
    loading: false,
    oninit: function () {
        user.signIn()
    },
    view: function (vnode) {
        if (Bets.list) {
            let betList = Bets.list.map((bet, i) => {
                return <Bet daysAvailable={vnode.attrs.daysAvailable} bet={bet} i={i} />
            })
            return <div>
                <div class="flex">
                    <div class="flex-1 mb-4 select-none">Bets</div>
                    <div class="hover:text-blue-700 select-none flex-initial text-right text-xs text-blue-500 underline cursor-pointer"
                        onclick={() => {
                            vnode.state.loading = true
                            Bets.sync(() => {
                                vnode.state.loading = false
                                m.redraw()
                            })
                        }}>
                        {user.token ?
                            [vnode.state.loading ? spinner({ class: 'mr-2' }) : null,
                                'sync bets',
                            ] :
                            ''}
                    </div>
                    <div class="flex-initial">
                        <a target="_blank" href={Setup.betSheetUrl}><img class="hover:opacity-75 inline-block align-baseline ml-2 h-4" src="images/sheet.png" /></a>
                    </div>
                </div>
                {betList}
            </div>
        }
    }
}
