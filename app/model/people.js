const m = require('mithril')
const jsonstore = require('../utils/jsonstore')
const Setup = require('./setup')
const People = {
    list: [],
    selected: [],
    loadList() {
        People.list = jsonstore.get('people.list', [])
    },
    save: () => {
        jsonstore.set('people.list', People.list)
    },
    selectPerson: (person) => {
        People.selected.push(person.name)
        People.save()
    },
    deselectPerson: (person) => {
        People.selected = People.selected.filter((tofilter) => {
            return person.name !== tofilter
        })
        People.save()
    },
    hasSelectedPerson() {
        return People.selected.length > 0
    },
    isSelected(name) {
        let isSelected = false
        People.selected.map((person) => {
            if (person === name) {
                isSelected = true
            }
        })
        return isSelected
    },
    getTeams() {
        let teams = {}
        if (People.list) {
            People.list.map((person) => {
                teams[person.team.toLowerCase()] = true
            })
        }
        return teams
    },
    sync: (cb) => {
        let sheetId = Setup.getUserSheetId()
        if (!sheetId || sheetId === '') {
            alert('must set a sheet ID')
            return
        }
        var params = {
            spreadsheetId: sheetId,
            range: 'A2:J'
        };

        gapi.client.sheets.spreadsheets.values.get(params).then(function (response) {
            let values = response.result.values
            People.list = []
            values.map((row) => {
                People.list.push({ name: row[0], daysAvailable: row[2], team: row[1] })
            })
            People.list = People.list.sort((a, b) => {
                if (a.team !== b.team) {
                    return a.team.localeCompare(b.team)
                }
                return a.name.localeCompare(b.name)
            })
            People.save()
            cb()
        }).catch((e) => {
            alert(JSON.stringify(e))
            cb()
        })
    }
}

module.exports = People