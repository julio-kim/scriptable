const getStoreFilePath = (path, storeName) => {
    const fm = FileManager.local()
    const baseDir = `${path}/store/`

    if (!fm.isDirectory(baseDir)) {
        fm.createDirectory(baseDir)
    }

    return `${baseDir}/store/${storeName}.js`
}

const init = (path, storeName, options) => {
    const storeFile = getStoreFilePath(path, storeName)
    if (fm.fileExists(storeFile)) {
        return JSON.parse(fm.readString(storeFile))
    } else {
        let store = {}
        fm.writeString(storeFile, JSON.stringify(store))
        return store
    }
}

class StoreBase {
    constructor (path, storeName, options) {
        this.path = path
        this.storeName = storeName

        this.options = Object.assign({
            pretty: false
        }, options)

        this.store = init(path, storeName, this.options)
    }

    save (id, data) {
        this.store[id] = data
    }

    saveSync () {
        const storeFile = getStoreFilePath(this.path, this.storeName)
        fm.writeString(storeFile, (this.options.pretty) ?
            JSON.stringify(this.store, null, 4) : JSON.stringify(this.store)
        )
    }

    get (id) {
        return this.store[id]
    }

    all (sortKey) {
        let datas = Object.values(this.store)
        return (sortKey) ? 
            datas.sort((prev, next) => prev[sortKey] > next[sortKey]) : datas
    }

    delete (id) {
        delete this.store[id]
    }
}

module.exports = StoreBase