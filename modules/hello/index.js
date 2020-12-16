module.exports.hello = (name) => {  
    const lodash = importModule('/modules/lodash')
    let capName = lodash.capitalize(name)
    return `Hello ${capName}`
}