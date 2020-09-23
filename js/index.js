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
const slides = document.querySelectorAll('.slyde'),
      stepLeft = document.querySelector('#minus'),
      stepRight = document.querySelector('#plus');

let pos = 0;

function showPosition(pos) {
    slides.forEach(item => item.style.display = 'none');
    slides[pos].style.display = 'block';
}

stepLeft.addEventListener('click',()=> {
    if (pos === 0) {
        showPosition(slides.length-1);
        pos = slides.length-1;
        } else {
        pos -=1;
        showPosition(pos);
        }
});

stepRight.addEventListener('click',()=> {
    if (pos === slides.length-1) {
        showPosition(0);
        pos = 0;
    } else {
        pos +=1;
        showPosition(pos);
    }
});
//Slyder bottom
const slydesBottom = document.querySelectorAll('.slyde-btm'),
      stepLeftBtm = document.querySelector('#minus-btm'),
      stepRightBtm = document.querySelector('#plus-btm'),
      sliderWrapper = document.querySelector('.slyder-wraper'),
      slyderInner = document.querySelector('.slyder-inner'),
      navDots = document.querySelector('.nav-dots'),
      width = window.getComputedStyle(sliderWrapper).width;
let offset = 0;
slyderInner.style.width = 100 * slydesBottom.length+'%';
slydesBottom.forEach(slide => slide.style.width = width);

function createNavDots (a) {
    for (let i=0; i< a; i++) {
        let navDot = document.createElement('div');
        navDot.classList.add('nav-dot');
        navDots.appendChild(navDot);
    }
}


createNavDots(slydesBottom.length);
const navDotsGenerated = document.querySelectorAll('.nav-dot');
console.log(navDotsGenerated);
let counter = 0;
navDotsGenerated[counter].classList.add('nav-dots-active');
stepRightBtm.addEventListener('click',()=> {
    if (offset == +width.slice(0, width.length-2) * (slydesBottom.length - 1)) {
        counter = 0;
        offset = 0;
        console.log(offset,counter);
    } else {
        offset += +width.slice(0, width.length-2);
        counter ++;
        console.log(offset,counter);
    }
    navDotsGenerated.forEach(item => item.classList.remove('nav-dots-active'));
    navDotsGenerated[counter].classList.add('nav-dots-active');
    slyderInner.style.transform = `translateX(-${offset}px)`;
});
stepLeftBtm.addEventListener('click',()=> {
    if (offset == 0) {
        offset = +width.slice(0, width.length-2) * (slydesBottom.length - 1);
        counter = slydesBottom.length-1;
        console.log(offset,counter);
    } else {
        offset -= +width.slice(0, width.length-2);
        counter --; 
        console.log(offset,counter);
    }
    navDotsGenerated.forEach(item => item.classList.remove('nav-dots-active'));
    navDotsGenerated[counter].classList.add('nav-dots-active');
    slyderInner.style.transform = `translateX(-${offset}px)`;
});

navDotsGenerated.forEach((item, id) => {
    item.addEventListener('click',() => {
        counter = id;
        offset = +width.slice(0, width.length-2) * id;
        navDotsGenerated.forEach(item => item.classList.remove('nav-dots-active'));
        navDotsGenerated[counter].classList.add('nav-dots-active');
        slyderInner.style.transform = `translateX(-${offset}px)`;
    });

});