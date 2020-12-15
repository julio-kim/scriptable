const { DocumentStore, TemporaryStore } = importModule('/modules/store')

class ArtveeArtist {
    constructor (artist, options) {
        super(options)
        this.artist = artist
    }

    async present() {
        let store = new DocumentStore("artvee-artist")
        if (store.size() == 0) {
            await super.loadArts(this.artist)
                .forEach(art => store.save(art.id, art))
            store.saveSync()
        }

        await super.initBase(store.all())
        super.present()
    }
}

class ArtveeDaily {
    constructor (options) {
        super(options)
    }

    async present() {
        let store = new TemporaryStore("artvee-daily")
        if (store.size() == 0) {
            await super.loadArts()
                .forEach(art => store.save(art.id, art))
            store.saveSync()
        }

        await super.initBase(store.all())
        super.present()
    }
}

module.exports = {
    ArtveeArtist,
    ArtveeDaily,
}