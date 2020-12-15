class ArtveeBase {
    constructor (options) {
        this.options = Object.assign({
            enableArtInfo: true,
            refreshAfterSeconds: 30,
        }, options)
    }

    async loadArts (artist) {
        const baseUrl = 'https://artvee.com'
        const source = (artist) ? `${baseUrl}/artist/${artist}/?per_page=100` : baseUrl

        let webView = new WebView()
        await webView.loadURL(source)
    
        return webView.evaluateJavaScript(`
            let arts = [...document.querySelectorAll('.products .product-grid-item .product-wrapper')].map((ele) => {
                let productLinkEle = ele.querySelector('.product-element-top .product-image-link')
                let imageEle = productLinkEle.querySelector('img')
                let productInfoEle = ele.querySelector('.product-element-bottom > span')
                return {
                    id: parseInt(productInfoEle.querySelector('.linko').dataset.id),
                    title: productInfoEle.querySelector('h3.product-title > a').innerText,
                    artist: {
                        name: productInfoEle.querySelector('.woodmart-product-brands-links > a').innerText,
                        info: productInfoEle.querySelector('.woodmart-product-brands-links').innerText,
                        link: productInfoEle.querySelector('.woodmart-product-brands-links > a').getAttribute('href'),
                    },
                    link: productLinkEle.getAttribute('href'),
                    image: {
                        link: imageEle.getAttribute('src'),
                        width: imageEle.getAttribute('width'),
                        height: imageEle.getAttribute('height'),
                    }
                }
            }).sort((prev, next) => prev.id - next.id)
                
            completion(arts)
        `, true)
    }

    async initBase (arts) {
        console.log(JSON.stringify(arts, null, 4))
        
        let todayIdx = Math.floor(Math.random() * arts.length)
        let todayArt = arts[todayIdx]
    
        this.widget = new ListWidget()
        this.widget.refreshAfterDate = new Date(Date.now() + 1000 * this.options.refreshAfterSeconds)
        this.widget.url = todayArt.link
        this.widget.addSpacer()
    
        let titleTxt = this.widget.addText(todayArt.title)
        titleTxt.font = Font.boldRoundedSystemFont(20)
    
        let authorTxt = this.widget.addText(todayArt.artist.info)
        authorTxt.font = Font.lightSystemFont(15)
    
        this.widget.backgroundImage = await new Request(todayArt.image.link).loadImage()
    }

    present () {
        if (config.runsInWidget) {
            Script.setWidget(this.widget)
        } else {
            // for Test
            this.widget.presentLarge()
        }
        Script.complete()
    }
}

module.exports = ArtveeBase