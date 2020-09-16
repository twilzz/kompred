const chkBoxes = document.querySelectorAll('input'),
      resultDiv = document.querySelector('#result');
      

// formButton.addEventListener('click', (e)=> {
//     e.preventDefault();
//     chkBoxes.forEach((item, id) => {
//         if (item.checked) {
//             const newEntry = document.createElement('div');
//             newEntry.innerHTML = `<li>${item.nextSibling.nodeValue}</li>`;
//             newEntry.classList.add(`line`);
//             resultDiv.appendChild(newEntry);
//         }
//     });
// showPositions();
// });

console.log(chkBoxes);

chkBoxes.forEach((item, id) => {
    item.addEventListener('click', (e)=> {
    console.log(`Генерируем ${item.nextSibling.data}`);
    showDB(id).then(data => generatePosition(data));
    });
});
        

async function  showDB (id) {
    const q = await fetch('db.json');
    const data = await q.json();
    return data[id];
 }

function generatePosition(data) {
    let string = '';
    if (data.type.length > 1) {
        for (let i = 0; i<data.type.length; i++ ) {
            string = `${string} ${data.type[i]} по цене ${data.price[i]}р/м2, коэффициент ${data.kfc[i]}<br>`;
        }
    }
    const newEntry = document.createElement('div');
    newEntry.innerHTML = `<li>${data.name}</li> <br>
    содержит типы:<br> ${string}`;
    newEntry.classList.add(`line`);
    resultDiv.appendChild(newEntry);
}
