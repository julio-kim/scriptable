console.log('call hello')
const { install } = importModule('/modules/moduler/moduler.js')
console.log('after install moduler')
const lodash = await install('lodash')
console.log('after install lodash')

module.exports.hello = async (name) => {  
    let capName = lodash.capitalize(name)
    return `Hello ${capName}`
}
/*
module.exports.hello = (name) => {

    return `Hello ${name}`
}
*/
