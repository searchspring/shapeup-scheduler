exports.inline = (name) => {
    return exports[name].replace(' ', '.')
}