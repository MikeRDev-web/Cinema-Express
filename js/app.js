import movies from '../js/movies.js';
import series from '../js/series.js';
const allContentAvailable = movies.concat(series);



let typeContentOnDisplay = 'all';
let valueSave = undefined;
const platformsHeader = document.querySelectorAll('.header__nav--a');


const moviesContainer = document.getElementById('moviesContainer');

document.addEventListener('DOMContentLoaded', function(){
    insertMoviesOnLoad();
    dailyRecommendation()
});

function insertMoviesOnLoad() {
    // Combina las películas y las series en un solo array
    let allContent = movies.concat(series);

    // Mezcla el array de contenido de forma aleatoria
    allContent.sort(() => Math.random() - 0.5);

    // Itera sobre el array mezclado para crear y agregar las tarjetas al contenedor
    allContent.forEach(content => {
        let contentCard = document.createElement('a');
        contentCard.setAttribute('href', '/pages/viewItem.html')
        contentCard.classList.add('movieCard');
        contentCard.classList.add('movieButton');
        contentCard.innerHTML = `
            <p class="typeCard">${content.type}</p>
            <img src="${content.cover}" alt="cover movie" class="movieCard__img">
            <p class="movieCard__name">${content.name}</p>
        `;

        contentCard.addEventListener('click', () => saveItem(content.name, content.type === 'movie' ? 'movies' : 'series', content.gender));

        setTimeout(()=>{ 
            moviesContainer.appendChild(contentCard);
        }, 300);

        setTimeout(()=>{
            contentCard.style.animation = 'insertCard .3s ease-in' 
            setTimeout(()=>{
                contentCard.style.opacity = '1' 
            }, 300);
        }, 301);
    });
}

/*Save parameters on local*/

function saveItem(card, type, gender) {
    localStorage.setItem('card', `${card}`);
    localStorage.setItem('tipo', `${type}`);
    localStorage.setItem('genero', JSON.stringify(gender));
}



const typeMovie = document.getElementById('typeMovie');
const typeSeries = document.getElementById('typeSeries');
const typeAll = document.getElementById('typeAll');

const genderButtons = document.querySelectorAll('.filters__btn')
const typeContainer = document.getElementById('typeContainer');
const genderContainer = document.getElementById('genderContainer');

genderButtons.forEach(button => {
    button.addEventListener('click', function() {
        event.preventDefault();
        filterContentForGender(this.textContent, button);
        clearStyleBtns(button, button);
    }) 
})



typeMovie.addEventListener('click', () => {
    filterContentForType('movie');
    clearStyleBtns(typeMovie, typeContainer);
    onlyClearStyleBtns(genderContainer);
})

typeSeries.addEventListener('click', ()=>{
    filterContentForType('series');
    clearStyleBtns(typeSeries, typeContainer);
    onlyClearStyleBtns(genderContainer);
})

typeAll.addEventListener('click', ()=>{
    filterContentForType('all');
    clearStyleBtns(typeAll, typeContainer);
    onlyClearStyleBtns(genderContainer);
})



function filterContentForType(type) {
    let filteredContent = movies.filter(item => item.type.includes(type));
    let filteredContentSeries = series.filter(item => item.type.includes(type));
    moviesContainer.innerHTML = '';
        setTimeout(() => {
            filteredContent.forEach(content => {
                let card = document.createElement('a');
                card.setAttribute('href', '/pages/viewItem.html');
                card.classList.add('movieCard');
                card.innerHTML = `
                <p class="typeCard">${content.type}</p>
            <img src="${content.cover}" alt="cover movie" class="movieCard__img">
            <p class="movieCard__name">${content.name}</p>
            `
            card.addEventListener('click', () => saveItem(content.name, `${type}`, content.gender));
                setTimeout(() => {
                    moviesContainer.appendChild(card);
                    card.style.animation = 'insertCard 1s ease-in';
                    setTimeout(() => {
                        card.style.opacity = '1';
                    }, 301)
                }, 100)
            }, 500);
            filteredContentSeries.forEach(content => {
                let card = document.createElement('a');
                card.setAttribute('href', '/pages/viewItem.html');
                card.classList.add('movieCard');
                card.innerHTML = `
                <p class="typeCard">${content.type}</p>
            <img src="${content.cover}" alt="cover movie" class="movieCard__img">
            <p class="movieCard__name">${content.name}</p>
            `
            card.addEventListener('click', () => saveItem(content.name, `${type}`, content.gender));
                setTimeout(() => {
                    moviesContainer.appendChild(card);
                    card.style.animation = 'insertCard 1s ease-in';
                    setTimeout(() => {
                        card.style.opacity = '1';
                    }, 301)
                }, 100)
            }, 500);
        });
        if(type === 'all') {
            insertMoviesOnLoad()
        }
        typeContentOnDisplay = `${type}`;
    }
    

function filterContentForGender(gender, btn) {
    if(typeContentOnDisplay === 'movie') {
        let filterGender = movies.filter(item => item.gender.includes(gender));
        moviesContainer.innerHTML = '';
            setTimeout(() => {
                filterGender.forEach(content => {
                    let card = document.createElement('a');
                    card.setAttribute('href', '/pages/viewItem.html');
                    card.classList.add('movieCard');
                    card.innerHTML = `
                    <p class="typeCard">${content.type}</p>
                <img src="${content.cover}" alt="cover movie" class="movieCard__img">
                <p class="movieCard__name">${content.name}</p>
                `
                card.addEventListener('click', () => saveItem(content.name, `${content.type}`, content.gender));
                    setTimeout(() => {
                        moviesContainer.appendChild(card);
                        card.style.animation = 'insertCard 1s ease-in';
                        setTimeout(() => {
                            card.style.opacity = '1';
                        }, 301)
                    }, 100)
                }, 500);
            });
    } else if (typeContentOnDisplay === 'series') {
        let filterGender = series.filter(item => item.gender.includes(gender));
        moviesContainer.innerHTML = '';
            setTimeout(() => {
                filterGender.forEach(content => {
                    let card = document.createElement('a');
                    card.setAttribute('href', '/pages/viewItem.html');
                    card.classList.add('movieCard');
                    card.innerHTML = `
                    <p class="typeCard">${content.type}</p>
                <img src="${content.cover}" alt="cover movie" class="movieCard__img">
                <p class="movieCard__name">${content.name}</p>
                `
                card.addEventListener('click', () => saveItem(content.name, `${content.type}`, content.gender));
                    setTimeout(() => {
                        moviesContainer.appendChild(card);
                        card.style.animation = 'insertCard 1s ease-in';
                        setTimeout(() => {
                            card.style.opacity = '1';
                        }, 301)
                    }, 100)
                }, 500);
            }); 
    } else if (typeContentOnDisplay === 'all') {
        let filterGenderMovies = allContentAvailable.filter(item => item.gender.includes(gender));
        moviesContainer.innerHTML = '';
            setTimeout(() => {
                filterGenderMovies.forEach(content => {
                    let card = document.createElement('a');
                    card.setAttribute('href', '/pages/viewItem.html');
                    card.classList.add('movieCard');
                    card.innerHTML = `
                    <p class="typeCard">${content.type}</p>
                <img src="${content.cover}" alt="cover movie" class="movieCard__img">
                <p class="movieCard__name">${content.name}</p>
                `
                card.addEventListener('click', () => saveItem(content.name, `${content.type}`, content.gender));
                    setTimeout(() => {
                        moviesContainer.appendChild(card);
                        card.style.animation = 'insertCard 1s ease-in';
                        setTimeout(() => {
                            card.style.opacity = '1';
                        }, 301)
                    }, 100)
                }, 500);
            }); 
    }
    clearStyleBtns(btn, genderContainer);
    clearStylesNav(platformsHeader)
}

function clearStyleBtns(button, container) {
    if (container) {
        const elementSelectedInsideContainer = container.querySelector('.elementSelected');

        if (elementSelectedInsideContainer) {
            elementSelectedInsideContainer.classList.remove('elementSelected');
        }
        button.classList.add('elementSelected');
    }
}

function onlyClearStyleBtns(container) {
    if (container) {
        const elementSelectedInsideContainer = container.querySelector('.elementSelected');

        if (elementSelectedInsideContainer) {
            elementSelectedInsideContainer.classList.remove('elementSelected');
        }
    }
}

//filtered for platform


platformsHeader.forEach(iconClick => {
    iconClick.addEventListener('click', (event) => {
        event.preventDefault();
        let platformSelected = iconClick.dataset.platform;
        filteredForPlatform(platformSelected);

        // Remover la clase de todos los elementos
        clearStylesNav(platformsHeader);

        // Agregar la clase al elemento actual
        iconClick.classList.add('header__nav--a-selected');
    });
});

//clear styles from nav 

function clearStylesNav(elementsToClear) {
    elementsToClear.forEach(icon => {
        icon.classList.remove('header__nav--a-selected');
    });
}

let filters = document.getElementById('filters');

function filteredForPlatform(platformToFind) {
    moviesContainer.innerHTML = '';
    if(platformToFind === 'allPlatforms') {
        insertMoviesOnLoad();
        if(filters.style.display = 'none'){
            filters.style.display = 'flex';
        }
    } else {
        let filteredPlatforms = allContentAvailable.filter(element =>
            element.platforms.includes(platformToFind)
        );
    
        filteredPlatforms.forEach(element => {
            let cardCreated = document.createElement('a');
            cardCreated.classList.add('movieCard');
            cardCreated.setAttribute('href', '/pages/viewItem.html')
            cardCreated.innerHTML = `
                <p class="typeCard">${element.type}</p>
                <img src="${element.cover}" alt="cover movie" class="movieCard__img">
                <p class="movieCard__name">${element.name}</p>
            `;
            moviesContainer.appendChild(cardCreated);
    
            cardCreated.addEventListener('click', () => saveItem(element.name, element.type, element.gender));
    
            setTimeout(() => {
                cardCreated.style.animation = 'insertCard 1s ease-in'; 
            }, 1000);
    
            setTimeout(() => {
                cardCreated.style.opacity = '1'; 
            }, 1000);
        })
        filters.style.display = 'none';
    }



    onlyClearStyleBtns(typeContainer)
    onlyClearStyleBtns(genderContainer)

}

//recomendacion diaria

const modalContainer = document.getElementById('modalContainer')


function dailyRecommendation() {
    const randomIndex = Math.floor(Math.random() * allContentAvailable.length);

    const randomElement = allContentAvailable[randomIndex];
    
        let createModal = document.createElement('div');
        createModal.classList.add('modalContent');
        createModal.innerHTML = ` <img src="/src/icons/close.svg" alt="" class="modalContainer__close">
        <h2 class="modalContainer__title">Recomendacion del día</h2>
        <span>
        <img src="${randomElement.cover}" alt="MovieCover" class="modalContainer__info-img">
        <p class="modalContainer__info-type">${randomElement.type}</p>
        </span>
        <a href="../pages/viewItem.html" class="modalContainer__info-btn">Quiero verla</a>`
        
        modalContainer.appendChild(createModal);

        let goBtn = document.querySelector('.modalContainer__info-btn');
        goBtn.addEventListener('click', ()=>{
            saveItem(randomElement.name, randomElement.type, randomElement.gender);
        })
        let closeBtn = document.querySelector('.modalContainer__close');
        closeBtn.addEventListener('click', ()=>{
            modalContainer.style.opacity = '0';
            document.documentElement.style.overflowY = 'scroll';
            setTimeout(()=>{
                modalContainer.remove();
            }, 300);
        })
}