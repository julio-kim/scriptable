const getFileManager = () => {
    return FileManager.local()
}

const getModuleVersion = async (moduleName) => {
    console.log(`call getModuleVersion, ${moduleName}`)
    let request = new Request(`https://julio-kim.github.io/scriptable/version.json`)
    let moduler = await request.loadJSON()
    console.log(JSON.stringify(moduler, null, 4))
    return moduler.modules.filter(module => module.name === moduleName)[0]
}

const checkUpdate = async (moduleName, version) => {
    console.log(`call checkUpdate ${moduleName}`)
    let curModule = await getModuleVersion(moduleName)
    console.log(`curModule: ${JSON.stringify(curModule)}`)
    if (curModule) {
        return (curModule.version !== version) ? true : false
    } else {
        throw new Error(`Module not found: ${moduleName}`)
    }
}

const installedVersion = (moduleName) => {
    console.log(`call installedVersion ${moduleName}`)
    let fm = getFileManager()
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
    console.log(`call updateVersion ${moduleName}`)
    let fm = getFileManager()
    let dir = fm.documentsDirectory()
    let baseDir = `${dir}/modules`
    let curModule = await getModuleVersion(moduleName)

    let versions = { "modules": [] }
    if (fm.fileExists(`${baseDir}/version.json`)) {
        versions = JSON.parse(fm.readString(`${baseDir}/version.json`))
    }
    const index = versions.modules.findIndex(item => item.name === curModule.name)
    if (index >= 0) {
        versions.modules = [
            ...versions.modules.slice(0, index),
            ...versions.modules.slice(index + 1)
        ]
    }
    versions.modules.push(curModule)
    fm.writeString(`${baseDir}/version.json`, JSON.stringify(versions))

    if (!isNew) {
        let noti = new Notification()
        noti.title = `${curModule.name} 모듈이 업데이트 되었습니다.`
        noti.body = curModule.description
        noti.sound = 'piano_success'
        noti.openURL = 'https://julio-kim.github.io/scriptable'
        noti.schedule()    
    }
}

const installModule = async (moduleName) => {
    console.log(`call installModule ${moduleName}`)
    let fm = getFileManager()
    let dir = fm.documentsDirectory()
    const baseDir = `${dir}/modules`

    if (!fm.isDirectory(`${baseDir}/${moduleName}`)) {
        fm.createDirectory(`${baseDir}/${moduleName}`)
    }
    return writeModule(moduleName, true)
}
const updateModule = async (moduleName) => {
    console.log(`call updateModule ${moduleName}`)
    return writeModule(moduleName, false)
}

const writeModule = async (moduleName, isNew) => {
    console.log(`call writeModule ${moduleName}`)
    let fm = getFileManager()
    let dir = fm.documentsDirectory()
    const baseDir = `${dir}/modules`

    let request = new Request(`https://julio-kim.github.io/scriptable/modules/${moduleName}/index.js`)
    let moduleFile = await request.loadString()
    fm.writeString(`${baseDir}/${moduleName}/index.js`, moduleFile)

    await updateVersion(moduleName, isNew)
}

const install = async (moduleName) => {
    console.log(`call install ${moduleName}`)
    let fm = getFileManager()
    let dir = fm.documentsDirectory()
    const baseDir = `${dir}/modules`

    if (!fm.isDirectory(baseDir)) {
        fm.createDirectory(baseDir)
    }

    if (fm.fileExists(`${baseDir}/${moduleName}/index.js`)) {
        let moduleVer = installedVersion(moduleName)
        if (await checkUpdate(moduleName, moduleVer.version)) {
            await updateModule(moduleName)
        } 
    } else {
        await installModule(moduleName)
    }
    let targetModule = `/modules/${moduleName}`
    console.log(`targetModule: ${targetModule}`)
    console.log(`importModule: ${importModule}`)
    return importModule(targetModule)
}

module.exports = {
    install: (moduleName) => {
       return install(moduleName) 
    },
    list: () => {

    },
    uninstall: (moduleName) => {

    },
    hello: () => {
        let noti = new Notification()
        noti.title = 'Scriptable Moduler'
        noti.body = '✽ Moduler가 정상적으로 설치되었습니다!!'
        noti.sound = 'complete'
        noti.schedule()
    }
}