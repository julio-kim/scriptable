const StoreBase = importModule('/modules/storebase')

class DocumentStore extends StoreBase {
    constructor (storeName, options) {
        super(FileManager.local().documentsDirectory(), storeName, options)
    }
}

module.exports = DocumentStore