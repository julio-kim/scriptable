
class CovidStat {
    constructor (options) {
        this.widget = new ListWidget()
        this.widget.setPadding(0, 0, 0, 0)
        this.widget.addText('CovidStat')
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

module.exports = CovidStatLive