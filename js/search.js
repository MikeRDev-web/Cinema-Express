
import movies from '../js/movies.js';
import series from '../js/series.js';
//import {openItem} from '../js/app.js';
document.addEventListener('DOMContentLoaded', ()=>{
    const searInput = document.getElementById('searchInput');
    const searchResult = document.getElementById('searchResult');

    searchResult.addEventListener('mouseleave', ()=>{
        searchResult.style.animation = 'closeSearch .5s ease-out';
                setTimeout(()=>{
                    searchResult.style.display = 'none';
                    searchResult.style.opacity = '0';  
                    searInput.value = '';
                }, 500)
    })
    
    searInput.addEventListener('input', ()=>{
        searching(searInput, searchResult)
    })
    
    function searching(inputText, resulContainer) {
            if(inputText.value === '') {
                resulContainer.style.animation = 'closeSearch .5s ease-out';
                setTimeout(()=>{
                    resulContainer.style.display = 'none';
                    resulContainer.style.opacity = '0';  
                }, 500)
            } else {
                const textSearch = inputText.value.toLowerCase();
                const filtereddMovies = movies.filter(movie => movie.name.toLowerCase().includes(textSearch));
                const filteredSeries = series.filter(serie => serie.name.toLowerCase().includes(textSearch));
                resulContainer.innerHTML = '';
                let resultFind = undefined;
                resulContainer.style.display = 'flex';
                searchResult.style.animation = 'openSearch .5s ease-in';
                setTimeout(()=>{
                    resulContainer.style.opacity = '1';  
                }, 500)
                
                filtereddMovies.forEach(movie => {
                    if(movie) {
                        insertResults(movie, resulContainer);
                        resultFind = true;
                    }
                })
                filteredSeries.forEach(serie => {
                    if(serie) {
                        insertResults(serie, resulContainer);
                        resultFind = true;
                    }
                })
                if(!resultFind) {
                    resulContainer.innerHTML = `<li class="notResult">Sin resultados para <span class="highlightText">"${searInput.value}"</span></li>` 
                }
               

            }
    }
    
});

function insertResults(movie, container) {

        let liElement = document.createElement('li');
        liElement.classList.add('header__search-results-li');
        liElement.innerHTML = `<a href="../pages/viewItem.html" class="header__search-results-li-content" id="open${movie.name}">
        <img src="${movie.cover}" alt="cover" class="header__search-results-li-content-cover">
        <p class="header__search-results-li-content-name">${movie.name}</p>
        <p class="header__search-results-li-content-type">${movie.type}</p>
    </a>`
    
        container.appendChild(liElement);

        liElement.addEventListener('click', ()=>{
            saveItem(movie.name, movie.type, movie.gender)
        })
}

function saveItem(card, type, gender) {
    localStorage.setItem('card', `${card}`);
    localStorage.setItem('tipo', `${type}`);
    localStorage.setItem('genero', JSON.stringify(gender));
}


