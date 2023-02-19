const jsdom = require('jsdom')

fetch('https://wltest.dns-systems.net')
    .then(response => response.text())
    .then(body => {
        const virtualConsole = new jsdom.VirtualConsole();
        virtualConsole.on('error', () => {}); // prevent console errors from parsing CSS, etc
        return new jsdom.JSDOM(body, { virtualConsole });
    })
    .then(dom => {
        console.log(dom.window.document.getElementsByClassName('package').length)
    })
    .catch(err => console.error(err))
