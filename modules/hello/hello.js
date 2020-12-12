console.log('call hello')
const { install } = importModule('/modules')
console.log('after install moduler')
const lodash = await install('lodash')
console.log('after install lodash')

module.exports.hello = (name) => {
    let capName = lodash.capitalize(name)
    return `Hello ${capName}`
}
/*
module.exports.hello = (name) => {
    return `Hello ${name}`
}
*/