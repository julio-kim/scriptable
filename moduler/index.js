const checkUpdate = async (moduleName, version) => {
    let request = new Request(`https://julio-kim.github.io/scriptable/modules/index.json`)
    let moduler = await request.loadJSON()
    let curModule = moduler.modules.concat(moduler.modules)
        .filter(module => module.name === moduleName)[0]
    if (curModule) {
        return (curModule.version !== version) ? true : false
    } else {
        throw new Error(`Module not found: ${moduleName}`)
    }
}

const installedVersion = (moduleName) => {
    let fm = FileManager.iCloud()
    let dir = fm.documentsDirectory()

    let version = JSON.parse(fm.readString(`${dir}/version.json`))
    let foundModule = version.modules.filter(module => module.name === moduleName)
    if (foundModule.length > 0) {
        return foundModule[0]
    } else {
        throw new Error(`Module not found: ${moduleName}`)
    }
}

const updateVersion = (moduleInfo, isNew) => {
    let fm = FileManager.iCloud()
    let dir = fm.documentsDirectory()

    let versions = JSON.parse(fm.readString(`${dir}/version.json`))
    const index = versions.findIndex(item => item.name === moduleInfo.name)
    if (index >= 0) {
        versions = [
            ...versions.slice(0, index),
            ...versions.slice(index + 1)
        ]
    }
    versions.push(moduleInfo)

    if (!isNew) {
        let noti = new Notification()
        noti.title = `Updated ${module.name} module`
        noti.body = module.description
        noti.schedule()    
    }
}

const installModule = async (moduleName) => {
    return writeModule(moduleName, true)
}
const updateModule = async (moduleName) => {
    return writeModule(moduleName, false)
}

const writeModule = async (moduleName, isNew) => {
    let request = new Request(`https://julio-kim.github.io/scriptable/modules/${moduleName}/${moduleName}.js`)
    let moduleFile = await request.loadString()
    fm.writeString(`${baseDir}/${moduleName}/${moduleName}.js`, moduleFile)

    updateVersion(module, isNew)
}

const install = async (moduleName) => {
    let fm = FileManager.iCloud()
    let dir = fm.documentsDirectory()
    const baseDir = `${dir}/modules`

    if (!fm.isDirectory(baseDir)) {
        fm.createDirectory(baseDir)
    }

    if (fm.fileExists(`${baseDir}/${moduleName}/${moduleName}.js`)) {
        let moduleVer = installedVersion(moduleName)
        if (await checkUpdate(moduleName, moduleVer.version)) {
            await updateModule(moduleName)
        } 
    } else {
        await installModule(moduleName)
    }
    return importModule('/modules/${moduleName}/${moduleName}')
}

module.exports = {
    install: (moduleName) => {
       return install(moduleName) 
    },
    list: () => {

    },
    uninstall: (moduleName) => {

    },
}