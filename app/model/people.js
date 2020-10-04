const m = require('mithril')
const jsonstore = require('../utils/jsonstore')
const SHEET_ID= '1lagMGiB21B3CmVytMQkj3jeYa7hl0gQv4WwUAX7_9GA'
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
        let sheetId = SHEET_ID
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
                if (row[0] !== 'Nebo' && row[0] !== 'Will Warren') {
                    let available = 30
                    if (row[3]) {
                        available = 30 - parseInt(row[3])
                    }
                    People.list.push({ name: row[0], daysAvailable: available, manager: row[1], team: row[2] })
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
        }).catch((err) => {
            console.error('error', err)
        });
    }
}
module.exports = People