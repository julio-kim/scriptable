const StoreBase = importModule('/modules/storebase')

class CacheStore extends StoreBase {
    constructor (storeName) {
        super(FileManager.local().cacheDirectory(), storeName)
    }
}

module.exports = CacheStore