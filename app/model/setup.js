const m = require('mithril')
const jsonstore = require('../utils/jsonstore')
const sheetId = new RegExp('.*spreadsheets/d/([a-zA-Z0-9-_]+).*');
const Setup = {
    userSheetUrl: '',
    betSheetUrl:  '',
    useBugHero: false,
    loadFromStore(){
        this.userSheetUrl =  jsonstore.has('userSheetUrl') ?  jsonstore.get('userSheetUrl') : null
        this.betSheetUrl =  jsonstore.has('betSheetUrl') ?  jsonstore.get('betSheetUrl') : null
        this.useBugHero =  jsonstore.has('useBugHero') ?  jsonstore.get('useBugHero') : false
    },
    setUserSheetUrl(url) {
        jsonstore.set('userSheetUrl', url)
        this.userSheetUrl = url
    },
    setBetSheetUrl(url) {
        jsonstore.set('betSheetUrl', url)
        this.betSheetUrl = url
    },
    setUseBugHero(value) {
        jsonstore.set('useBugHero', value)
        this.useBugHero = value
    },
    isSetup(){
      return jsonstore.has('userSheetUrl') && jsonstore.has('betSheetUrl')
    },
    getUserSheetId() {
        return sheetId.exec(this.userSheetUrl)[1]
    },
    getBetSheetId() {
        return sheetId.exec(this.betSheetUrl)[1]
    }

}
module.exports = Setup