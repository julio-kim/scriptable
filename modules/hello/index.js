module.exports.hello = (name) => {  
    const lodash = importModule('/modules/lodash')
    const moment = importModule('/modules/moment')
    let capName = lodash.capitalize(name)
    return `Hello ${capName}!! (${moment().format('YYYY/MM/DD HH:mm:ss')})`
}