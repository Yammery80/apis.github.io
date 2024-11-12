//Mabdar a llamar la url y elementos de HTML
const URL_BASE = 'https://rickandmortyapi.com/api';
const divCharacter = document.querySelector('.characters');
const divButtons = document.querySelector('.buttons');
const divButtons2 = document.querySelector('.button2');

// Variables de control de página y filtros
let page = 1;
const maxPage = 42;
let selectedGender = '';
let selectedStatus = '';

//Funcion para crear la tarjeta de un personaje
function createCard(character){
    const div = document.createElement('div');
    const html = `
    <div class="imageCharacter">
        <img src="${ character.image }" alt="" width="200px">
    </div>
    <div class="infoCharacter">
        <div class="title">
            <h3>${ character.name }</h3>
        </div>
        <div class="description">
            <p>${ character.status } : ${ character.species }</p>
            <p>Location</p>
            <p>${ character.location.name }</p>
            <p>Origin</p>
            <p>${ character.origin.name }</p>
        </div>
    </div>
    `;
    div.innerHTML = html;
    div.className = 'card';
    return div;
}

//Funcion para mostrar tarjetas de varios personajes
function createCards(characters){
    divCharacter.innerHTML = '';
    characters.forEach(c => {
        divCharacter.appendChild(createCard(c));
    })
}

//Función para crear boton de Siguiente
function createButton(){
    divButtons.innerHTML='';
    const button = document.createElement('button');
    button.innerText='Siguiente';
    button.className='btn';
    button.setAttribute('data-id', page +1);
    if (page < maxPage) {
        divButtons.appendChild(button);
    }
}

//Función para crear boton de Atras
function createButton2(){
    divButtons2.innerHTML='';
    const button2 = document.createElement('button');
    button2.innerText='Atrás';
    button2.className='btn';
    button2.setAttribute('data-id', page - 1);
    if (page > 1) {
        divButtons2.appendChild(button2);   
    }
}

async function getCharacters(page=1) {
    try {
        let url = `${URL_BASE}/character/?page=${page}`;
        if (selectedGender) url += `&gender=${selectedGender}`;
        if (selectedStatus) url += `&status=${selectedStatus}`;

        const result = await fetch(url);
        const data = await result.json();
        createCards(data.results);

    } catch (error) {
        
    }
}
getCharacters(page);
createButton();
createButton2();

// Evento para el botón "Siguiente" 
divButtons.addEventListener('click', (e) => {
    if(e.target.classList.contains('btn')){
        const n_page = parseInt(e.target.getAttribute('data-id'));
        if( n_page <=maxPage && n_page !== page){
            page = n_page;
            getCharacters(page);
            createButton();
            createButton2();
        }
        }});

// Evento para el botón "Atrás"
divButtons2.addEventListener('click', (e) => {
    if (e.target.classList.contains('btn')) {
        const n_page = parseInt(e.target.getAttribute('data-id'));
        if (n_page >= 1 && n_page !== page) {
            page = n_page;
            getCharacters(page);
            createButton();
            createButton2();
        }
    }
});

document.querySelector('#gender').addEventListener('change', (e) => {
    selectedGender = e.target.value;
    page = 1; // Reinicia a la primera página al aplicar un filtro
    getCharacters(page);
    createButton();
    createButton2();
})
document.querySelector('#status').addEventListener('change', (e) => {
    selectedStatus = e.target.value;
    page = 1; // Reinicia a la primera página al aplicar un filtro
    getCharacters(page);
    createButton();
    createButton2();
})

