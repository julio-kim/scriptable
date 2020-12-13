module.exports.hello = async (name) => {  
    const lodash = importModule('/modules/lodash')
    let capName = lodash.capitalize(name)
    return `Hello ${capName}`
}