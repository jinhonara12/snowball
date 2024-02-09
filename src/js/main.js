// fetch("https://jsonplaceholder.typicode.com/posts/1")
fetch("/1.text")
    .then((response, reject) => {
        return response.json()
    })
    .then(data => {
        console.log(data)
    })
