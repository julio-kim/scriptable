const StoreBase = importModule('/modules/storebase')

class CacheStore extends StoreBase {
    constructor (storeName, options) {
        super(FileManager.local().cacheDirectory(), storeName, options)
    }
}

module.exports = CacheStore