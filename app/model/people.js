const m = require('mithril')
const jsonstore = require('../utils/jsonstore')

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
    sync: () => {
        let sheetId = ORG_CHART_SHEET_ID
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
                if (row[1].toLowerCase() === 'engineering' && row[0] !== 'Nebo' && row[0] !== 'Will Warren') {
                    People.list.push({ name: row[0], daysAvailable: 30, manager: row[3], location: row[6] })
                }
            })
            People.list = People.list.sort((a, b) => {
                return a.name.localeCompare(b.name)
            })
            People.save()
            m.redraw()
        }).catch((err) => {
            console.error('error', err)
        });
    }
}
module.exports = People