const chkBoxes = document.querySelectorAll('input'),
      resultDiv = document.querySelector('#result'),
      btn = document.querySelector('#submit');

btn.addEventListener('click', (e)=> {
    e.preventDefault();
    chkBoxes.forEach((item,id) => {
        if (item.checked === true){
        console.log(`Генерируем ${item.nextSibling.data}`);
        showDB(id).then((data) => {
            const newCard = new Positions({...data});
            newCard.createCard();
            newCard.createChoise();
        });}
    });
});

async function  showDB (id) {
    const q = await fetch('db.json');
    const data = await q.json();
    return data[id];
 }
class Positions {
    constructor ({id, name, type, price, kfc, typesize1, pricetype1, 
                 typesize2, pricetype2}) {
    this.id = id;
    this. name = name;
    this.type = type;
    this.price = price;
    this.kfc = kfc;
    this.typesize1 = typesize1;
    this.pricetype1 = pricetype1;
    this.typesize2 = typesize2;
    this.pricetype2 = pricetype2;
    }

    createCard = function () {
    let string = '';
    if (this.id === 2) {
        string = `<li>${this.type[0]} типоразмеры: ${this.typesize1} по ценам ${this.pricetype1}$</li>
                  <li>${this.type[1]} типоразмеры: ${this.typesize2} по ценам ${this.pricetype2}$</li>`;
    } else if (this.type.length > 1) {
        for (let i = 0; i<this.type.length; i++ ) {
            string = `${string} <li>${this.type[i]} по цене ${this.price[i]}р/м2, коэффициент ${this.kfc[i]} <button> Выбрать </button></li>`;
        }
    }
    const newEntry = document.createElement('div');
    newEntry.innerHTML = `<p>${this.name}<p> 
    содержит типы: ${string}`;
    newEntry.classList.add(`line`);
    resultDiv.append(newEntry);
    }

    createChoise = function () {
        const selector = document.querySelectorAll('li');
        console.log(selector);
    }
}

// Slyder
