const CovidStatBase = importModule('/modules/covidstatbase')

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

class CovidStatLive extends CovidStatBase {
    async init () {
        let covid = await _loadData()
        await super.initBase('코로나LIVE', source, covid)
    }

    async present () {
        await this.init()
        super.present()
    }
}

module.exports = CovidStatLive