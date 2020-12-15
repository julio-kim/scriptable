const StoreBase = importModule('/modules/storebase')

class DocumentStore extends StoreBase {
    constructor (storeName, options) {
        super(FileManager.local().documentsDirectory(), storeName, options)
    }
}

class CacheStore extends StoreBase {
    constructor (storeName, options) {
        super(FileManager.local().cacheDirectory(), storeName, options)
    }
}

class TemporaryStore extends StoreBase {
    constructor (storeName, options) {
        super(FileManager.local().temporaryDirectory(), storeName, options)
    }
}

module.exports = {
    DocumentStore,
    CacheStore,
    TemporaryStore,
}