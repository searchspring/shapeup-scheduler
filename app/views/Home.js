const m = require('mithril')
const BetsList = require('../components/BetsList')
const PeopleList = require('../components/PeopleList')
const Bets = require('../model/bets')
const People = require('../model/people')
const Setup = require('../model/setup')
const Layout = require('./Layout')

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
            return <Layout>
                <div class="flex m-2">
                    <div class="w-1/4 mr-8">
                        <PeopleList daysAvailable={Bets.calculateDaysAvailable(daysAvailable)} />
                    </div>
                    <div class="w-3/4 mr-4">
                        <BetsList daysAvailable={daysAvailable} />
                    </div>
                </div>
            </Layout>
        }
    }
}