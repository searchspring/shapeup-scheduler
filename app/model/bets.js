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
    setAsanaToken: () => {
        let pat = prompt('please enter asana access token')
        if (pat) {
            localStorage.setItem('pat', pat)
        }
    },
    sync: (cb) => {
        let pat = localStorage.getItem('pat')
        if (!pat || pat === null || pat === 'null') {
            alert('you must set asana personal access token')
            return
        }
        let projectId = '1149610717173685'
        let taskFields = 'custom_fields,tags.name,tags.color,memberships.section.name,memberships.project.name,name,assignee.photo,assignee.name,assignee.email,due_on,modified_at,html_notes,notes,stories'
        m.request({
            method: 'GET',
            url: `https://app.asana.com/api/1.0/tasks`,
            headers: {
                'Authoriztion': `Bearer ${pat}`
            },
            params: {
                'completed_since': new Date().toISOString(),
                'project': projectId,
                'opt_fields': taskFields
            }
        }).then((response) => {
            let newList = []
            let teams = {}
            response.data.map((task) => {
                let inBetTable = false
                task.memberships.map((member) => {
                    if (member.section.name === 'Bet Table') {
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
                            if (team.toLowerCase() !== 'devops') {
                                teams[team] = true
                            }
                        }
                    }
                })
                let size = 30
                task.custom_fields.map((custom) => {
                    if (custom && custom.name.toLowerCase() === 'bet size') {
                        if (custom.enum_value) {
                            let sizeName = custom.enum_value.name.toLowerCase()
                            size = sizeName === 'large' ? 30 : sizeName === 'medium' ? 20 : 10
                        }
                    }
                })
                if (inBetTable) {
                    newList.push({
                        name: task.name,
                        id: task.gid,
                        team: team,
                        daysRequired: size,
                        people: []
                    })
                }
            })
            newList.sort((a, b) => {
                let aSort = a.team.toLowerCase() + a.name.toLowerCase()
                let bSort = b.team.toLowerCase() + b.name.toLowerCase()
                return aSort.localeCompare(bSort)
            })
            // separator 
            newList.push({
                name: '',
                team: 'BUG HERO',
                daysRequired: 30,
                people: []
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
            alert(JSON.stringify(e))
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