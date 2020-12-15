const StoreBase = importModule('/modules/storebase')

class DocumentStore extends StoreBase {
    constructor (storeName) {
        super(FileManager.local().documentDirectory(), storeName)
    }
}

module.exports = DocumentStore