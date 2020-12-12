console.log('call hello')
const { install } = importModule('/modules')
console.log('after install moduler')
const _ = await install('lodash')
console.log('after install lodash')

module.exports.hello = (name) => {
    let capName = _.capitalize(name)
    return `Hello ${capName}`
}