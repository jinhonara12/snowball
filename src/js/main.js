fetch("/snowball/list.json")
    .then((response, reject) => {
        return response.json()
    })
    .then(data => {
        console.log(data)
    })
