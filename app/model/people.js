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
    }
}
module.exports = People