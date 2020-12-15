const StoreBase = importModule('/modules/storebase')

class TemporaryStore extends StoreBase {
    constructor (storeName) {
        super(FileManager.local().temporaryDirectory(), storeName)
    }
}

module.exports = TemporaryStore