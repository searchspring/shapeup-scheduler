const m = require('mithril')
const People = require('../model/people')
const Setup = require('../model/setup')
const Layout = require('./Layout')
module.exports = {
    view() {
        return <Layout>
            <div style="width:80%" class="mx-auto bg-white mb-4 mt-4 p-4 rounded-lg shadow">
                <div class="text-2xl">Setup</div>
                <div class="flex">
                    <div class="flex-1">
                        <div class="block bg-gray-300 rounded-full text-xl bold pl-4 mb-2 mt-8">Step 1 - Humans</div>
                        <div class="p-4">
                            <div class="mb-8">Create a spreadsheet for your humans that looks like the sheet below and paste the URL in below.
                                <input placeholder="URL for User Sheet" type="text"
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
                            <div class="mb-8">Create a spreadsheet for your bets looks like the sheet below and paste the URL in below.
                                <input placeholder="URL for Bet Sheet" type="text"
                                    value={Setup.betSheetUrl}
                                    oninput={(e) => { Setup.setBetSheetUrl(e.target.value) }}
                                    class="w-full px-4 text-blue-500 border rounded-full inline-block" />
                                <img alt="helper image" class="shadow-xl rounded-lg border-gray-300 border-2 inline-block mt-8" src="images/betsheet.png" />
                            </div>
                        </div>
                    </div>
                </div>
                <div class="block bg-gray-300 rounded-full text-xl bold pl-4 mb-2 mt-8">Step 3 - Hit go</div>
                <div class="mb-8 text-center">
                    {Setup.isSetup() ?
                        <a class="focus:bg-blue-600 focus:outline-none w-64 mt-8 text-center hover:bg-blue-600 bg-blue-500 text-blue-100 px-4 py-2 rounded-full inline-block"
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