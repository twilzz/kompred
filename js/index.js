const chkBoxes = document.querySelectorAll('input'),
      resultDiv = document.querySelector('#result'),
      formButton = document.querySelector('button');

formButton.addEventListener('click', (e)=> {
    e.preventDefault();
    chkBoxes.forEach((item, id) => {
        if (item.checked) {
            const newEntry = document.createElement('div');
            newEntry.innerHTML = `<li>${item.nextSibling.nodeValue}</li>`;
            newEntry.classList.add(`line`);
            resultDiv.appendChild(newEntry);
        }
    });
showPositions();
});

function showPositions() {
const posLine = document.querySelectorAll('li');
posLine.forEach(item => {
    item.addEventListener('click', async ()=> {
    console.dir(item);
    const fetchResult = await showDoors();
    
    for (let key in fetchResult) {
        console.log(key);
        const newEntry = document.createElement('div');
        newEntry.classList.add('entry');
        newEntry.innerHTML = `${key[0]}`;
        item.parentElement.after(newEntry);
        }
    });
});
}

async function showDb (){
    const fetchResult = await showDoors();
    console.log(fetchResult[0]["Потолки"]);
    fetchResult[0]["Потолки"].forEach(key => console.log(key))
}

showDb();
async function  showDoors () {
    const q = await fetch('db.json');
    const data = await q.json();
    return data;
 }


