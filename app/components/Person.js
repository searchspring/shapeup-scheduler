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
            return m(`.cursor-pointer.mb-1.w-full.rounded-full.${vnode.state.selected ? 'border-solid.border-2.border-blue-800' : ''}`, {
                onclick: () => {
                    vnode.state.selected = !vnode.state.selected
                    if (vnode.state.selected) {
                        People.selectPerson(person)
                    } else {
                        People.deselectPerson(person)
                    }
                }
            },
                m(`.shadow.w-full.bg-gray-300.rounded-full`,
                    m(`.${bg}.text-xs.leading-none.px-2.py-1.rounded-full`,
                        { style: { width: w + '%' } }, person.name + ` (${personDaysAvailable})` 
                    )))
        } else {
            return m('', 'on person set')
        }
    }
}