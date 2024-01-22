import movies from '../js/movies.js';
import series from '../js/series.js';
import platforms from '../js/platforms.js';


//Convert object platforms in array
const platformsAvailable = Object.values(platforms);

const allContentAvailable = movies.concat(series);
const loadingIcon = document.getElementById('loading');
let recoveredItem = localStorage.getItem('card');
let recoveredType = localStorage.getItem('tipo');
let recoveredGender = JSON.parse(localStorage.getItem('genero'));

const relatedContentContainer = document.getElementById('relatedContentCardsContainer');
const relatedContent = document.querySelector('.relatedContent');
const forPlatform = document.getElementById('forPlatform');
const container = document.getElementById('itemContainer');
const backBtn = document.querySelector('.backBtn');

const mainContainer = document.querySelector('.mainContainer')

document.addEventListener('DOMContentLoaded', () => {
    insertElementInPage(recoveredItem);
    insertRelatedContent(recoveredType);
    document.documentElement.style.overflowY = 'scroll';
});

function insertElementInPage(elementSaved) {
    const findItem = allContentAvailable.find(element => element.name.includes(elementSaved));

    const contentPage = document.createElement('div');
    contentPage.classList.add('item__info');
    contentPage.innerHTML = `
    <span class="section1">
        <img src="${findItem.cover}" alt="cover" class="item__cover">
        <div class="item__platforms">
        <p class="plataformsMsg">¿Dónde puedo encontrarla?</p>
            <div id='platforms' class="platfonrmsIcons">
            
            </div>
            
        </div>
    </span>
        <span class="section2">
        <div class="item__info-details">
        <h1 class="item__info-name">${findItem.name}</h1>
            <p class="info__duration">Duración: ${findItem.duration}</p>
            <p class="info__duration">Año: ${findItem.year}</p>
            </div>
            <p class="item__info-sinopsis">${findItem.sinopsis}</p>
            <a href="${findItem.trailer}" class="trailer__btn" target="_blank">Ver trailer</a>
        </span>`

    container.appendChild(contentPage);

    let plataformContent = document.getElementById('platforms');

    insertPlatforms(findItem.platforms, plataformContent)

    setTimeout(() => {
        loadingIcon.style.display = 'none';
    }, 2000);
    setTimeout(() => {
        contentPage.style.animation = 'showElement 2s ease-in';
        relatedContentContainer.style.animation = 'showElement 2s ease-in';
        relatedContent.style.animation = 'showElement 2s ease-in';
        backBtn.style.animation = 'showElement 2s ease-in';
    }, 2005);
    setTimeout(() => {
        contentPage.style.opacity = '1';
        contentPage.style.display = 'flex';
        relatedContentContainer.style.opacity = '1';
        relatedContent.style.opacity = '1';
        backBtn.style.opacity = '1';
    }, 2006);

    setTimeout(() => {
        localStorage.clear();
        console.log('se limpio el local')
    }, 100);
}

function insertRelatedContent(type) {
    if (type === 'series') {
        createCards(series, recoveredGender);
        console.log('el item guardado es:', recoveredItem)
        console.log('el tipo mostrado es:', recoveredType)
        console.log('el genero guardado es:', recoveredGender)
    } else if (type === 'movies') {
        createCards(movies, recoveredGender);
        console.log('el item guardado es:', recoveredItem)
        console.log('el tipo mostrado es:', recoveredType)
        console.log('el genero guardado es:', recoveredGender)
    } else {
       createCards(allContentAvailable, recoveredGender);
       console.log('el item guardado es:', recoveredItem)
        console.log('el tipo mostrado es:', recoveredType)
        console.log('el genero guardado es:', recoveredGender)
    }
}

function createCards(array, gender) {
    let filteredArray = array.filter(elemento => elemento.gender.some(g => gender.includes(g)));

    const shuffledArray = shuffleArray(filteredArray);

    shuffledArray.forEach(element => {
        let card = document.createElement('a');
        card.classList.add('movieCard');
        card.setAttribute('href', '/pages/viewItem.html')
        card.innerHTML = `
            <p class="typeCard">${element.type}</p>
            <img src="${element.cover}" alt="cover movie" class="movieCard__img">
            <p class="movieCard__name">${element.name}</p>
        `;
        relatedContentContainer.appendChild(card);

        card.addEventListener('click', () => saveItem(element.name, element.type, element.gender));

        setTimeout(() => {
            card.style.animation = 'insertCard 1s ease-in'; 
        }, 1000);

        setTimeout(() => {
            card.style.opacity = '1'; 
        }, 1000);
    });
}

function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}


function saveItem(card, type, gender) {
    localStorage.setItem('card', `${card}`);
    localStorage.setItem('tipo', `${type}`);
    localStorage.setItem('genero', JSON.stringify(gender));
}

function insertPlatforms(platFormsInItem, container) {
    platFormsInItem.forEach(elementInArray => {
        let filtredPlatforms = platformsAvailable.filter(element => element.name.includes(elementInArray));
        filtredPlatforms.forEach(elementFiltred => {
            let platformIcon = document.createElement('img');
            platformIcon.classList.add('platfomrIcon')
            platformIcon.setAttribute('src', elementFiltred.icon);
            platformIcon.setAttribute('title', elementFiltred.name);
            container.appendChild(platformIcon);
        })
    })
}


const platformsHeader = document.querySelectorAll('.header__nav--a');
const filtredToPlatformsContainer = document.getElementById('filtredContainer');

platformsHeader.forEach(iconClick => {
    iconClick.addEventListener('click', () => {
        let platformSelected = iconClick.dataset.platform;
        filteredForPlatform(platformSelected, recoveredType, filtredToPlatformsContainer);
        console.log('se dio click en:', platformSelected);
        iconClick.classList.add('header__nav--a-selected');
    });
});

function filteredForPlatform(platformToFind, type, container) {
    container.innerHTML = '';
        if (type === 'movie') {
            let filteredPlatforms = movies.filter(element =>
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
                container.appendChild(cardCreated);
        
                cardCreated.addEventListener('click', () => saveItem(element.name, element.type, element.gender));
        
                setTimeout(() => {
                    cardCreated.style.animation = 'insertCard 1s ease-in'; 
                }, 1000);
        
                setTimeout(() => {
                    cardCreated.style.opacity = '1'; 
                }, 1000);
                clearStylesNav(iconsPlatforms)
            })
        } else if (type === 'series') {
            let filteredPlatforms = series.filter(element =>
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
                container.appendChild(cardCreated);
        
                cardCreated.addEventListener('click', () => saveItem(element.name, element.type, element.gender));
        
                setTimeout(() => {
                    cardCreated.style.animation = 'insertCard 1s ease-in'; 
                }, 1000);
        
                setTimeout(() => {
                    cardCreated.style.opacity = '1'; 
                }, 1000);
            })
            clearStylesNav(iconsPlatforms)
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
                container.appendChild(cardCreated);
        
                cardCreated.addEventListener('click', () => saveItem(element.name, element.type, element.gender));
        
                setTimeout(() => {
                    cardCreated.style.animation = 'insertCard 1s ease-in'; 
                }, 1000);
        
                setTimeout(() => {
                    cardCreated.style.opacity = '1'; 
                }, 1000);
            })
            clearStylesNav(iconsPlatforms)
        }
}

let iconsPlatforms = document.querySelectorAll('.header__nav--a');

function clearStylesNav(elementsToClear) {
    elementsToClear.forEach(icon => {
        icon.classList.remove('header__nav--a-selected');
    });
}

function insertMoviesOnLoad() {
    //insert movie card
    movies.forEach(movie => {
        let movieCard = document.createElement('a');
        movieCard.setAttribute('href', '/pages/viewItem.html')
        movieCard.classList.add('movieCard');
        movieCard.classList.add('movieButton');
        movieCard.innerHTML = `
        <p class="typeCard">${movie.type}</p>
        <img src="${movie.cover}" alt="cover movie" class="movieCard__img">
        <p class="movieCard__name">${movie.name}</p>
        `;

        movieCard.addEventListener('click', () => saveItem(movie.name, 'movies', movie.gender));

        setTimeout(()=>{ 
            mainContainer.appendChild(movieCard);
        }, 300);

        setTimeout(()=>{
            movieCard.style.animation = 'insertCard .3s ease-in' 
            setTimeout(()=>{
                movieCard.style.opacity = '1' 
            }, 300);
        }, 301);

    });
   

    //insert serie card
    series.forEach(serie => {
        let serieCard = document.createElement('a');
        serieCard.classList.add('movieCard');
        serieCard.setAttribute('href', '/pages/viewItem.html')
        serieCard.innerHTML = `
        <p class="typeCard">${serie.type}</p>
        <img src="${serie.cover}" alt="cover movie" class="movieCard__img">
        <p class="movieCard__name">${serie.name}</p>
        `;

        serieCard.addEventListener('click', () => saveItem(serie.name, 'series', serie.gender));

        setTimeout(()=>{ 
            mainContainer.appendChild(serieCard);
        }, 300);

        setTimeout(()=>{
            serieCard.style.animation = 'insertCard .3s ease-in' 
            setTimeout(()=>{
                serieCard.style.opacity = '1' 
            }, 300);
        }, 301);
    });

    
}