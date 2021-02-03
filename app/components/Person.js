const m = require('mithril')
const People = require('../model/people')

module.exports = {
    selected: false,
    view: (vnode) => {
        let person = vnode.attrs.person
        let daysAvailable = vnode.attrs.daysAvailable
        let personDaysAvailable = daysAvailable[person.name]
        let w = parseInt(personDaysAvailable / 30 * 100)
        let bg = 'bg-blue-300'
        if (personDaysAvailable <= 0) {
            if (personDaysAvailable < 0) {
                bg = 'bg-red-500'
            } else {
                bg = 'bg-gray-300'
            }
            w = Math.abs(w)
            w = w > 100 ? 100 : w
        }
        if (person) {
            let classProgressBar = `rounded-full top-0 absolute px-2 ${bg}`
            let classBackgroundBar = 'px-2 rounded-full bg-gray-300'
            let classMain = 'hover:opacity-75 select-none text-xs relative cursor-pointer rounded-full ' + (vnode.state.selected ? 'border-solid border border-blue-800' : 'border-solid border border-white')
            return <div class={classMain}
                onclick={() => {
                    vnode.state.selected = !vnode.state.selected
                    if (vnode.state.selected) {
                        People.selectPerson(person)
                    } else {
                        People.deselectPerson(person)
                    }
                }}>
                <div class={classBackgroundBar}>&nbsp;</div>
                <div class={classProgressBar} style={'width: ' + w + '%'}>&nbsp;</div>
                <div class="top-0 absolute px-2 hover:opacity-75">{person.name} ({personDaysAvailable})</div>
            </div>
        } else {
            return m('', 'no person set')
        }
    }
}