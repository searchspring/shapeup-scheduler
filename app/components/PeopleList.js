const People = require("../model/people")
const m = require('mithril')
const Person = require("./Person")
const user = require("../model/user")
const { spinner } = require("../css")
const Setup = require("../model/setup")
const Bets = require("../model/bets")

module.exports = {
    loading: false,
    oninit: () => {
        user.signIn()
    },
    view: (vnode) => {
        let lastTeam = ''
        let peopleList = People.list.map((person) => {
            let teamTitle = null
            if (lastTeam !== person.team) {
                teamTitle = m('.text-sm.select-none.mt-2', {
                    onmouseover: () => {
                        Bets.selectedTeam = person.team
                    },
                    onmouseout: () => {
                        Bets.selectedTeam = null
                    }
                }, person.team)
            }
            lastTeam = person.team
            return [teamTitle, m(Person, { person: person, daysAvailable: vnode.attrs.daysAvailable })]
        })
        return <div>
            <div class="flex">
                <div class="flex-1 mb-2 select-none">Humans</div>
                <div class="hover:text-blue-700 select-none flex-initial float-right text-xs text-blue-500 underline cursor-pointer"
                    onclick={() => {
                        vnode.state.loading = true
                        People.sync(() => {
                            vnode.state.loading = false
                            m.redraw()
                        })
                    }}>
                    {user.token ? [vnode.state.loading ? spinner({ class: 'mr-2' }) : null, `sync humans`] : ''}
                </div>
                <div class="flex-initial">
                    <a target="_blank" href={Setup.userSheetUrl}><img class="hover:opacity-75 inline-block align-baseline ml-2 h-4" src="images/sheet.png" /></a>
                </div>
            </div>
            {peopleList}
        </div>
    }
}
