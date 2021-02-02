const m = require('mithril')
const jsonstore = require('../utils/jsonstore')
const Setup = require('./setup')

const Bets = {
    list: [],
    selectedTeam: null,
    loadList() {
        Bets.list = jsonstore.get('bets.list', [])
    },
    save: () => {
        jsonstore.set('bets.list', Bets.list)
    },
    addSelected: (selected, bet) => {
        selected.map((name) => {
            if (!Bets.hasPerson(bet, name)) {
                bet.people.push(name)
            }
        })
        Bets.save()
    },
    hasPerson(bet, name) {
        let foundOne = false
        bet.people.map((person) => {
            if (person === name) {
                foundOne = true
            }
        })
        return foundOne
    },
    removePerson: (name, bet) => {
        let foundOne = false
        bet.people = bet.people.filter((tofilter) => {
            if (foundOne) {
                return true
            }
            foundOne = tofilter === name
            return tofilter !== name
        })
        Bets.save()
    },
    calculateDaysAvailable: (daysAvailable) => {
        if (!Bets.list) {
            console.error('bets not loaded');
        }
        let afterBet = {}
        for (let key in daysAvailable) {
            afterBet[key] = daysAvailable[key]
        }
        Bets.list.map((bet) => {
            bet.people.map((name) => {
                let required = bet.daysRequired
                let personHasLeft = afterBet[name]
                afterBet[name] = personHasLeft - required
            })
        })
        return afterBet
    },
    setAsanaToken: () => {
        let pat = prompt('please enter asana access token')
        if (pat) {
            localStorage.setItem('pat', pat)
        }
    },
    sync: (cb) => {

        let sheetId = Setup.getBetSheetId()
        if (!sheetId || sheetId === '') {
            alert('must set a sheet ID')
            return
        }
        var params = {
            spreadsheetId: sheetId,
            range: 'A2:J'
        };

        gapi.client.sheets.spreadsheets.values.get(params).then(function (response) {
            let newList = []
            let teams = {}
            response.result.values.map((task) => {
                let team = task[2]
                teams[team] = true
                let sizeName = task[1].toLowerCase().trim()
                let name = task[0]
                let size = sizeName === 'large' ? 30 : sizeName === 'medium' ? 20 : 10

                newList.push({
                    name: name,
                    id: name,
                    team: team,
                    daysRequired: size,
                    people: []
                })

            })
            newList.sort((a, b) => {
                let aSort = a.team.toLowerCase() + a.name.toLowerCase()
                let bSort = b.team.toLowerCase() + b.name.toLowerCase()
                return aSort.localeCompare(bSort)
            })
            
            for (let t in teams) {
                for (let i = 0; i < 6; i++) {
                    newList.push({
                        name: 'Bug Hero',
                        team: t,
                        id: 'bug hero' + t + i,
                        daysRequired: 5,
                        people: []
                    })
                }
            }

            Bets.list = Bets.copyOverPeople(newList)
            Bets.save()
            cb()
        }).catch((e) => {
            alert(e, JSON.stringify(e))
            cb()
        })
    },
    copyOverPeople: (newList) => {
        newList.map((newBet) => {
            let oldBet = Bets.list.find((old) => {
                if (old.id === newBet.id) {
                    return old
                }
            })
            if (oldBet) {
                newBet.people = oldBet.people
            }
        })
        return newList
    }
}
module.exports = Bets