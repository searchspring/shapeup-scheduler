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
                if (!ignore(row[0])) {
                    let available = 30
                    if (row[3]) {
                        available = 30 - parseInt(row[2])
                    }
                    People.list.push({ name: row[0], daysAvailable: available, team: row[1] })
                }
            })
            People.list = People.list.sort((a, b) => {
                if (a.team !== b.team) {
                    return a.team.localeCompare(b.team)
                }
                return a.name.localeCompare(b.name)
            })
            People.save()
            m.redraw()
            cb()
        }).catch((e) => {
            alert(JSON.stringify(e))
            cb()
        })
    }
}

function ignore(name) {
    return name === 'Nebo' ||
        name === 'Will Warren' || 
        name === 'Chris Pellett'|| 
        name === 'Zachrey Button'|| 
        name === 'Eric Hacke'|| 
        name === 'Scott Schanel'|| 
        name === 'Michael Longauer'|| 
        name === 'Łukasz Ostrowski'|| 
        name === 'Greg Hellings'|| 
        name === 'Raymond Hou'
}
module.exports = People