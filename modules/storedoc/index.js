const StoreBase = importModule('/modules/storebase')

class DocumentStore extends StoreBase {
    constructor (storeName) {
        super(FileManager.local().documentsDirectory(), storeName)
    }
}

module.exports = DocumentStore