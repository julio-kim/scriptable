const getLodash = async () => {
    console.log('call hello')
    const { install } = importModule('/modules/moduler')
    console.log('after install moduler')
    return install('lodash')
}

module.exports.hello = async (name) => {  
    let lodash = await getLodash()
    let capName = lodash.capitalize(name)
    return `Hello ${capName}`
}
