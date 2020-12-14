const CovidStatBase = importModule('/modules/covidstatbase')
const { SimpleAreaChart } = importModule('/modules/simplechart')

const source = 'http://ncov.mohw.go.kr'

const _loadData = async () => {
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
        date: covid.date.replace(/\(|\)/g, '').split(',')[0],
        weekly: covid.wpsData.confirm_day
    }
}

const _getLevelColor = (count) => {
    // https://color-hex.com
    if (count >= 500) return '#171c22' // #222831
    else if (count < 500 && count >= 300) return '#b01030' // dc143c
    else if (count < 300 && count >= 100) return '#c04343' // f05454
    else return '#007acc' // 0099ff
}

const _areaGraph = (covid) => {
    let size = new Size(200, 200) 
    if (config.widgetFamily == 'medium') {    
        size = new Size(400, 200)
    } else if (config.widgetFamily == 'large') {
        size = new Size(400, 400)        
    }
    
    let maxValue = Math.max(...covid.weekly)
    let chart = new SimpleAreaChart({
        width: size.width,
        height: size.height,
        minValue: 0,
        maxValue: (maxValue > 500) ? maxValue + 50 : 500,
        fillColor: _getLevelColor(covid.count)
    })
    chart.render(covid.weekly)
    return chart.toImage()
}

class CovidStat extends CovidStatBase {
    constructor (options) {
        super(options)

        this._options = Object.assign({
            weeklyChart: false,
            fakeCount: undefined,
        }, options)
    }

    async init () {
        let covid = await _loadData()
        if (this._options.fakeCount) {
            covid.count = this._options.fakeCount
        }
        await super.initBase('코로나-19', source, covid)
        if (this._options.weeklyChart) {
            super.setBackgroundImage(_areaGraph(covid))
        }
    }
}   

module.exports = CovidStat