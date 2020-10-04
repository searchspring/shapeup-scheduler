const Bets = {
    list: [],
    loadList() {
        this.list = [
            { name: 'ab testing', daysRequired: 30, people: ['bobby'] },
            { name: 'merchandising', daysRequired: 10, people: ['steve'] },
            { name: 'reporting', daysRequired: 10, people: ['aaron'] },
            { name: 'reporting', daysRequired: 10, people: ['aaron', 'bobby'] },
            { name: 'remove sql', daysRequired: 30, people: ['akil'] }
        ]
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
    }
}
module.exports = Bets