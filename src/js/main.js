let listBox = document.querySelector('.item__box');
let list = document.querySelector('.item');
let listTitle
let listDday
let listStartDay
let listEndDay

const createEl = (el, data) => {
    for (let i = 0; i < el.length; i++) {
        console.log(data[i])
        if (data[i][el[i].dataset.index]) {
            el[i].textContent = data[i][el[i].dataset.index];
        } else {
            // el[i].classList = "hide"
        }
    }
}

const findEl = () => {
    listTitle = document.querySelectorAll('.title span');
    listDday = document.querySelectorAll('.d_day span');
    listStartDay = document.querySelectorAll('.start span');
    listEndDay = document.querySelectorAll('.end span');
}


const cloneEl = (number) => {
    for (let i = 1; i < number; i++) {
        listBox.appendChild(list.cloneNode('ture'))
    }

    findEl()
}

// fetch("/snowball/list.json")
fetch("/list.json")
    .then((response, reject) => {
        return response.json()
    })
    .then(data => {
        cloneEl(data.length)
        console.log(data)
        createEl(listTitle, data)
        createEl(listDday, data)
        createEl(listStartDay, data)
        createEl(listEndDay, data)
    })
