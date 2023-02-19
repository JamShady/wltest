const jsdom = require('jsdom')

fetch('https://wltest.dns-systems.net')
    .then(response => response.text())
    .then(body => {
        const virtualConsole = new jsdom.VirtualConsole();
        virtualConsole.on('error', () => {}); // prevent console errors from parsing CSS, etc
        return new jsdom.JSDOM(body, { virtualConsole });
    })
    .then(dom => Array.from(dom.window.document.getElementsByClassName('package'))
        .map(packageDiv => {
            const getContentByClass = className => packageDiv
                .getElementsByClassName(className)[0]
                .innerHTML
                .replace(/<.*?>/g, '') // strip out html tags
                .trim()

            const formatPrice = priceStr => parseInt(priceStr.replace(/\D/g, ''))


            const title = getContentByClass('header')

            // the description is split across these fields, and there's little guidance as to how exactly this should be returned
            // so I'm collating and presenting in this format as it's the most flexible to change
            const desc = ['package-name', 'package-description', 'package-data']
                .map(getContentByClass)


            const packagePriceContents = getContentByClass('package-price')

            const price = formatPrice(getContentByClass('price-big'))
            const isMonthly = packagePriceContents.includes('Per Month')
            const annualPrice = price * (isMonthly ? 12 : 1)

            const saving = packagePriceContents.match(/Save £(\d+\.\d{2}) on the monthly price/)
            const discount = saving
                ? formatPrice(saving[1])
                : null


            return {
                title,
                desc,
                price,
                annualPrice,
                discount,
            }
        })
        .sort((a, b) => b.annualPrice - a.annualPrice) // order by annual price in descending order
        .map(product => {
            delete product.annualPrice
            return product
        })
    )
    .then(packages => {
        // packages represents the required JSON data
        // console.table(packages) // the lengthy description makes this overflow the screen
        console.log(packages)
    })
    .catch(err => console.error(err))
