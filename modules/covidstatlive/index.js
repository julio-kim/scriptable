const source = 'http://corona-live.com'

const _loadData = async () => {
    let webView = new WebView()
    await webView.loadURL(source)

    let covid = await webView.evaluateJavaScript(`
        setTimeout(() => {
            let button = document.querySelector('#root-portal button')
            if (button) button.click()
            
            let date = document.querySelector('#__next > div:nth-child(1) > div:nth-child(4) > div:nth-child(1)').innerText
            let count = document.querySelector('#__next > div:nth-child(1) > div:nth-child(6) > div:nth-child(3) > div:nth-child(5) > strong').innerText.trim()
            
            completion({date, count})        
        }, 2000)
    `, true)

    return {
        count: parseInt(covid.count.replace(/명/g, '')),
        date: covid.date
    }
}

const _getIconSize = () => Device.isPhone() ? new Size(12, 12) : new Size(16, 16)

const _getTitleSize = () => Device.isPhone() ? 17 : 20

const _getCountSize = (count) => {
    if (count >= 1000) {
        return Device.isPhone() ? 45 : 55
    } else {
        return Device.isPhone() ? 55 : 70    
    }
}

const _getDateSize = () => Device.isPhone() ? 11 : 14

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
        let iconImage = await _loadImage(`https://iconsdb.com/icons/download/${color}/${iconName}.png`)
        fm.writeImage(path, iconImage)
        return iconImage
    }
}

const _loadImage = async (imageUrl) => {
    let request = new Request(imageUrl)
    return await request.loadImage()
}


class CovidStatLive {
    constructor (options) {
        this.widget = new ListWidget()
        this.widget.setPadding(0, 0, 0, 0)
        this.widget.url = source

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
        let covid = await _loadData()
        this.widget.backgroundColor = new Color(_getLevelColor(covid.count))
        this.widget.refreshAfterDate = new Date(Date.now() + 1000 * this.options.refreshAfterSeconds)

        let titleRow = this.widget.addStack()
        let titleStack = titleRow.addStack()
        titleStack.layoutHorizontally()
        titleStack.centerAlignContent()
        
        titleStack.addSpacer()
        
        let imageIco = titleStack.addImage(await _getIcon('star-11-32'))
        imageIco.imageSize = _getIconSize()
        imageIco.centerAlignImage()
        
        titleStack.addSpacer(2)
        
        let titleTxt = titleStack.addText('코로나-19')
        titleTxt.centerAlignText()
        titleTxt.textColor = Color.white()
        titleTxt.font = Font.boldRoundedSystemFont(_getTitleSize())
        
        titleStack.addSpacer()
        
        let countTxt = this.widget.addText(covid.count.toString())
        countTxt.centerAlignText()
        countTxt.textColor = Color.white()
        countTxt.font = Font.thinSystemFont(_getCountSize(covid.count))
        
        let dateTxt = this.widget.addText(covid.date)
        dateTxt.centerAlignText()
        dateTxt.textColor = Color.white()
        dateTxt.font = Font.thinSystemFont(_getDateSize())
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