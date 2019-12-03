const fetch = require('node-fetch');
const url = 'https://reservation100-sandbox.mxapps.io/api/reservations';
const data = {
    "name": "Ali Kadhim",
    "numberOfPeople": 100
}
const option = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data)
}
fetch(url, option)
    .then(res => res.text())
    .then(json => console.log(json)).catch(error => {
        console.log(error)
    });



















// (async() => {
//     const rawResponse = await fetch('https://reservation100-sendbob.maxapps.io/api/reservations', {
//         method: 'POST',
//         headers: {
//             'Accept': 'application/json',
//             'Content-Type': 'application/json'
//         },
//         body: JSON.stringify({ a: 1, b: 'Textual content' })
//     });
//     const content = await rawResponse.json();

//     console.log(content);
// })();