const m = require('mithril')
const People = require('../model/people')
const { useBugHero } = require('../model/setup')
const Setup = require('../model/setup')
const Layout = require('./Layout')
module.exports = {
    oninit: function () {
        Setup.loadFromStore()
    },
    view() {
        return <Layout>
            <div style="width:80%" class="mx-auto bg-white mb-4 mt-4 p-4 rounded-lg shadow">
                <div class="text-2xl">Scheduler - What data do we need?</div>
                <p>This application connects to two spreadsheets that you create.  It uses this data to create a list of humans and a list of bets to allow you to put the humans on to bets.</p>
                <p>The following steps show you what each of the spreadsheets should contain.</p>
                <div class="flex">
                    <div class="flex-1">
                        <div class="block bg-gray-300 rounded-full text-xl bold pl-4 mb-2 mt-8">Step 1 - Humans</div>
                        <div class="p-4">
                            <div class="mb-8">Create a spreadsheet for your humans that looks like the sheet below and paste the URL in below.
                                <input placeholder="URL for Human Sheet" type="text"
                                    value={Setup.userSheetUrl}
                                    oninput={(e) => { Setup.setUserSheetUrl(e.target.value) }}
                                    class="w-full px-4 text-blue-500 border rounded-full inline-block" />
                                <img alt="helper image" class="shadow-xl rounded-lg border-gray-300 border-2 inline-block mt-8" src="images/usersheet.png" />
                            </div>
                        </div>
                    </div>
                    <div class="flex-1 ml-8">
                        <div class="block bg-gray-300 rounded-full text-xl bold pl-4 mb-2 mt-8">Step 2 - Bets</div>
                        <div class="p-4">
                            <div class="mb-8">Create a spreadsheet for your bets that looks like the sheet below and paste the URL in below.
                                <input placeholder="URL for Bet Sheet" type="text"
                                    value={Setup.betSheetUrl}
                                    oninput={(e) => { Setup.setBetSheetUrl(e.target.value) }}
                                    class="w-full px-4 text-blue-500 border rounded-full inline-block" />
                                <img alt="helper image" class="shadow-xl rounded-lg border-gray-300 border-2 inline-block mt-8" src="images/betsheet.png" />
                            </div>
                        </div>
                    </div>
                </div>
                <div class="block bg-gray-300 rounded-full text-xl bold pl-4 mb-2 mt-8">Step 3 - Bug Hero Team?</div>
                <div class="mb-8 ">
                    <div class="p-4">
                        <label for="bughero" class="cursor-pointer">
                            <input id="bughero" type="checkbox"
                                checked={Setup.useBugHero}
                                onclick={() => { Setup.setUseBugHero(!Setup.useBugHero) }} />
                                Show Generated Bug Hero Teams
                        </label>
                        <p class="text-gray-800">Show the bug hero team as bets in the scheduler.
                        Bug Hero is a team responsible for shielding the bet teams from interruptions that require engineering attention.
                        Six one week bets will be generated based on the team names of the bets.</p>
                    </div>
                </div>
                <div class="block bg-gray-300 rounded-full text-xl bold pl-4 mb-2 mt-8">Step 4 - Hit go</div>
                <div class="mb-8 text-center">
                    {Setup.isSetup() ?
                        <a class="focus:bg-blue-600 shadow hover:shadow-lg focus:outline-none w-64 mt-8 text-center hover:bg-blue-600 bg-blue-500 text-blue-100 px-4 py-2 rounded-full inline-block"
                            href="javascript:;" onclick={this.go}>Go</a>
                        : 'You must enter URLs to continue'}

                </div>
            </div>
        </Layout>
    },
    go() {
        People.loadList()
        m.route.set('/')
    }
}