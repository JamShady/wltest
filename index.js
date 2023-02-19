fetch('https://wltest.dns-systems.net')
    .then(response => {
        console.log(response)
    })
    .catch(err => console.error(err))
