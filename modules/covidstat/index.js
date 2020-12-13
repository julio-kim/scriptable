const _init = () => {
    this.widget.setPadding(0, 0, 0, 0)
    let txt = this.widget.addText('CovidStat')
    txt.centerAlignContent()
}

class CovidStat {
    constructor (options) {
        this.widget = new ListWidget()
        let _options = Object.assign({

        }, options)

        _init()
    }

    present () {
        if (config.runsInWidget) {
            Script.setWidget(this.widget)
        } else {
            // for Test
            this.widget.presentSmall()
        }
        Script.complete()
    }
}

module.exports = CovidStat