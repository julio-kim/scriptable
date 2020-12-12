module.exports.hello = async (name) => {
    console.log('call hello')
    const { install } = importModule('/modules/index.js')
    console.log('after install moduler')
    const lodash = await install('lodash')
    console.log('after install lodash')
    
    let capName = lodash.capitalize(name)
    return `Hello ${capName}`
}
/*
module.exports.hello = (name) => {

    return `Hello ${name}`
}
*/
