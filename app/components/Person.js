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
            w = 100
        }
        if (person) {
            return m(`.cursor-pointer.w-full.rounded-full.${vnode.state.selected ? 'border-solid.border.border-blue-800' : 'border-solid.border.border-white'}`, {
                onclick: () => {
                    vnode.state.selected = !vnode.state.selected
                    if (vnode.state.selected) {
                        People.selectPerson(person)
                    } else {
                        People.deselectPerson(person)
                    }
                }
            },
                m(`.hover:opacity-75.shadow.w-full.bg-gray-300.rounded-full`,
                    m(`.${bg}.text-xs.leading-none.px-2.py-1.rounded-full.select-none`,
                        { style: { width: w + '%' } }, person.name + ` (${personDaysAvailable})` 
                    )))
        } else {
            return m('', 'no person set')
        }
    }
}