// fetch("/index.js")
//     .then((response, reject) => {
//         return response
//     })
//     .then(data => {
//         console.log(data)
//     })

// let result = function (data) {
//     let test = document.querySelector('#test');
//     for (let i = 0; i < data.length; i++) {
//         let p = document.createElement('p');
//         p.textContent = JSON.stringify(data[i])
//         test.appendChild(p)
//     }
// }

fetch("/list.json")
    .then((response, reject) => {
        return response.json()
    })
    .then(data => {
        console.log(data)
    })
