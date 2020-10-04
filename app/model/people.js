const m = require('mithril')
const People = {
    list: [],
    selected: [],
    loadList() {
        this.list = [
            { name: 'aaron', daysAvailable: 30 },
            { name: 'bobby', daysAvailable: 30 },
            { name: 'marcus', daysAvailable: 30 },
            { name: 'steve', daysAvailable: 30 },
            { name: 'akil', daysAvailable: 30 }
        ]
    },
    selectPerson: (person) => {
        People.selected.push(person.name)
    },
    deselectPerson: (person) => {
        People.selected = People.selected.filter((tofilter) => {
            return person.name !== tofilter
        })
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
                    People.list.push({ name: row[0], daysAvailable: 30, manager: row[3] })
                    console.log(row)
                }
            })
            People.list = People.list.sort((a, b)=>{
                return a.manager.localeCompare(b.manager)
            })
            m.redraw()
        }).catch((err) => {
            console.error('error', err)
        });
    }
}
module.exports = People