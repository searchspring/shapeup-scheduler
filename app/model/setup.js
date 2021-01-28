const m = require('mithril')
const jsonstore = require('../utils/jsonstore')
const sheetId = new RegExp('.*spreadsheets/d/([a-zA-Z0-9-_]+).*');
const Setup = {
    userSheetUrl: 'https://docs.google.com/spreadsheets/d/1FIBx5EiM0Xa5Z15zNvcqRRPRHPj4mmssInwE-FoFlzU/edit#gid=0',
    betSheetUrl:  'https://docs.google.com/spreadsheets/d/1ViDZ9Btxzb3KCREyvIonaSp90rPpqeHq6A6sGGZ7e44/edit',
    loadFromStore(){
        this.userSheetUrl =  jsonstore.has('userSheetUrl') ?  jsonstore.get('userSheetUrl') : null
        this.betSheetUrl =  jsonstore.has('betSheetUrl') ?  jsonstore.get('betSheetUrl') : null
    },
    setUserSheetUrl(url) {
        jsonstore.set('userSheetUrl', url)
        this.userSheetUrl = url
    },
    setBetSheetUrl(url) {
        jsonstore.set('betSheetUrl', url)
        this.betSheetUrl = url
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