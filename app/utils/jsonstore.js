module.exports = {
    set(key, value) {
        localStorage.setItem(key, JSON.stringify(value))
    },
    get(key, defaultValue) {
        if (this.has(key)) {
            return JSON.parse(localStorage.getItem(key))
        }
        if (defaultValue) {
            return defaultValue
        } else {
            throw `no entry for ${key}, and no default given`
        }
    },
    has(key) {
        return localStorage.getItem(key) !== null
    },
    remove(key){
        localStorage.removeItem(key)
    },
    clear(){
        localStorage.clear()
    }
}