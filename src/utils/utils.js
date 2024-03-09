function stringify(obj) {
    return JSON.stringify(obj)
}

function parse(stringifiedObject) {
    return JSON.parse(stringifiedObject)
}

module.exports = {
    parse,
    stringify
}