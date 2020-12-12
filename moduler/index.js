const getModuleVersion = async (moduleName) => {
    console.log(`call getModuleVersion, ${moduleName}`)
    let request = new Request(`https://julio-kim.github.io/scriptable/modules/index.json`)
    let moduler = await request.loadJSON()
    console.log(JSON.stringify(moduler, null, 4))
    return moduler.modules.concat(moduler.modules)
        .filter(module => module.name === moduleName)[0]
}

const checkUpdate = async (moduleName, version) => {
    console.log('call checkUpdate')
    let curModule = await getModuleVersion(moduleName)
    if (curModule) {
        return (curModule.version !== version) ? true : false
    } else {
        throw new Error(`Module not found: ${moduleName}`)
    }
}

const installedVersion = (moduleName) => {
    console.log('call installedVersion')
    let fm = FileManager.iCloud()
    let dir = fm.documentsDirectory()
    let baseDir = `${dir}/modules`

    let version = JSON.parse(fm.readString(`${baseDir}/version.json`))
    let foundModule = version.modules.filter(module => module.name === moduleName)
    if (foundModule.length > 0) {
        return foundModule[0]
    } else {
        throw new Error(`Module not found: ${moduleName}`)
    }
}

const updateVersion = async (moduleName, isNew) => {
    console.log('call updateVersion')
    let fm = FileManager.iCloud()
    let dir = fm.documentsDirectory()
    let baseDir = `${dir}/modules`
    let curModule = await getModuleVersion(moduleName)

    let versions = []
    if (fm.fileExists(`${baseDir}/version.json`)) {
        versions = JSON.parse(fm.readString(`${baseDir}/version.json`))
    }
    const index = versions.findIndex(item => item.name === curModule.name)
    if (index >= 0) {
        versions = [
            ...versions.slice(0, index),
            ...versions.slice(index + 1)
        ]
    }
    versions.push(curModule)
    fm.writeString(`${baseDir}/version.json`, JSON.stringify(versions))

    if (!isNew) {
        let noti = new Notification()
        noti.title = `Updated ${module.name} module`
        noti.body = module.description
        noti.schedule()    
    }
}

const installModule = async (moduleName) => {
    console.log('call installModule')
    let fm = FileManager.iCloud()
    let dir = fm.documentsDirectory()
    const baseDir = `${dir}/modules`

    if (!fm.isDirectory(`${baseDir}/${moduleName}`)) {
        fm.createDirectory(`${baseDir}/${moduleName}`)
    }
    return writeModule(moduleName, true)
}
const updateModule = async (moduleName) => {
    console.log('call updateModule')
    return writeModule(moduleName, false)
}

const writeModule = async (moduleName, isNew) => {
    console.log('call writeModule')
    let fm = FileManager.iCloud()
    let dir = fm.documentsDirectory()
    const baseDir = `${dir}/modules`

    let request = new Request(`https://julio-kim.github.io/scriptable/modules/${moduleName}/${moduleName}.js`)
    let moduleFile = await request.loadString()
    fm.writeString(`${baseDir}/${moduleName}/${moduleName}.js`, moduleFile)

    await updateVersion(moduleName, isNew)
}

const install = async (moduleName) => {
    console.log('call install')
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
    return importModule(`/modules/${moduleName}/${moduleName}`)
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