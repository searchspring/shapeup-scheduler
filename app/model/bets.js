const m = require('mithril')
const jsonstore = require('../utils/jsonstore')

const Bets = {
    list: [],
    loadList() {
        Bets.list = jsonstore.get('bets.list', [])
    },
    save: () => {
        jsonstore.set('bets.list', Bets.list)
    },
    addSelected: (selected, bet) => {
        selected.map((name) => {
            bet.people.push(name)
        })
        Bets.save()
    },
    removePerson: (name, bet) => {
        bet.people = bet.people.filter((tofilter) => {
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
    sync: () => {
        let pat = localStorage.getItem('pat')
        if (!pat) {
            pat = prompt('please enter asana access token')
            localStorage.setItem('pat', pat)
        }
        let projectId = '1149610717173685'
        let taskFields = 'custom_fields,tags.name,tags.color,memberships.section.name,memberships.project.name,name,assignee.photo,assignee.name,assignee.email,due_on,modified_at,html_notes,notes,stories'
        m.request({
            method: 'GET',
            url: `https://app.asana.com/api/1.0/tasks`,
            headers: {
                'Authorization': `Bearer ${pat}`
            },
            params: {
                'completed_since': new Date().toISOString(),
                'project': projectId,
                'opt_fields': taskFields
            }
        }).then((response) => {
            Bets.list = []
            console.log(response.data[0]);
            response.data.map((task) => {
                let inBetTable = false
                task.memberships.map((member) => {
                    if (member.section.name === 'Bet Table' || member.section.name === 'Shaping') {
                        inBetTable = true
                    }
                })
                let team = ''
                task.custom_fields.map((custom) => {
                    if (custom && custom.name.toLowerCase() === 'team') {
                        if (!custom.enum_value) {
                            team = 'not set'
                        } else {
                            team = custom.enum_value.name
                        }
                    }
                })
                let size = 30
                task.custom_fields.map((custom) => {
                    if (custom && custom.name.toLowerCase() === 'bet size') {
                        if (custom.enum_value) {
                            size = custom.enum_value.name.toLowerCase() === 'large' ? 30 : 10
                        }
                    }
                })
                if (inBetTable) {
                    Bets.list.push({
                        name: task.name,
                        team: team,
                        daysRequired: size,
                        people: []
                    })
                }
            })
            Bets.list.sort((a, b) => {
                let aSort = a.team.toLowerCase() + a.name.toLowerCase()
                let bSort = b.team.toLowerCase() + b.name.toLowerCase()
                return aSort.localeCompare(bSort)
            })
            Bets.save()
        })
    }
}
module.exports = Bets