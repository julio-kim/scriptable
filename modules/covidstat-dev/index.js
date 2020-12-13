const CovidStatBase = importModule('/modules/covidstatbase')

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
        date: covid.date.replace(/\(|\)/g, '').split(',')[0]
    }
}
/*
const _areaGraph = () => {

}
*/
class CovidStat extends CovidStatBase {
    async init () {
        let covid = await _loadData()
        await super.initBase('코로나-19', source, covid)
//        super.setBackgroundImage(_areaGraph())
    }
}

module.exports = CovidStat