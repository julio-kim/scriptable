const _loadData = async () => {
    const source = 'http://ncov.mohw.go.kr'
    let webView = new WebView()
    await webView.loadURL(source)

    let covid = await webView.evaluateJavaScript(`
        const baseSelector = 'div.mainlive_container div.liveboard_layout '
        let date = document.querySelector(baseSelector + 'h2 span.livedate').innerText
        let domestic = document.querySelector(baseSelector + 'div.liveNum_today_new ul li:nth-child(1) span.data').innerText
        let overseas = document.querySelector(baseSelector + 'div.liveNum_today_new ul li:nth-child(2) span.data').innerText
        
        completion({date, count: {
            domestic: domestic.replace(",", ""), overseas
        }, wpsData: WPS_data })
    `, true)

    return {
        count: parseInt(covid.count.domestic) + parseInt(covid.count.overseas),
        date: covid.date.replace(/\(|\)/g, '').split(',')[0]
    }
}

const _getIconSize = () => Device.isPhone() ? new Size(12, 12) : new Size(16, 16)

const _getLevelColor = (count) => {
    if (count >= 500) return '#222831'
    else if (count < 500 && count >= 300) return '#dc143c'
    else if (count < 300 && count >= 100) return '#f05454'
    else return '#0099ff'
}

const _getIcon = async (iconName, color = 'white') => {
    let fm = FileManager.local()
    let dir = fm.documentsDirectory()
    let path = fm.joinPath(`${dir}`, `${iconName}.png`)
    
    if (fm.fileExists(path)) {
        return fm.readImage(path)
    } else {
        let iconImage = await loadImage(`https://iconsdb.com/icons/download/${color}/${iconName}.png`)
        fm.writeImage(path, iconImage)
        return iconImage
    }
}

const _init = function () {
    
    let txt = this.widget.addText('CovidStat')
    txt.centerAlignText()
}

class CovidStat {
    constructor (options) {
        this.widget = new ListWidget()
        this.widget.setPadding(0, 0, 0, 0)

        if (options && options.size) {
            let sizes = options.size.split['|']
            options.titleSize = (sizes[0]) ? sizes[0] : undefined
            options.countSize = (sizes[1]) ? sizes[1] : undefined
            options.dateSize = (sizes[2]) ? sizes[2] : undefined
        }

        this.options = Object.assign({
            refreshAfterSeconds: 30,
            titleSize: '17:20',
            countSize: '55:70',
            dateSize: '15:15'
        }, options)
    }

    async init () {
        this.covid = await _loadData()
        _init.bind(this)()
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