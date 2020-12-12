const { install } = importModule('/modules')
const _ = await install('lodash')

module.exports.hello = (name) => {
    let capName = _.capitalize(name)
    return `Hello ${capName}`
}