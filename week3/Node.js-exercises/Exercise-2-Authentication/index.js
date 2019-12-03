const fetch = require('node-fetch');
//Convert username and password to base64 using javascript code.
const key = Buffer.from('admin:hvgX8KlVEa').toString('base64');
fetch('https://restapiabasicauthe-sandbox.mxapps.io/api/books', {
        headers: { 'Authorization': `Basic ${key}` }
    })
    .then(res => res.json())
    .then(json => console.log(json)).catch(error => {
        console.log(error)
    });