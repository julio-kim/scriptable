const StoreBase = importModule('/modules/storebase')

class TemporaryStore extends StoreBase {
    constructor (storeName, options) {
        super(FileManager.local().temporaryDirectory(), storeName, options)
    }
}

module.exports = TemporaryStore