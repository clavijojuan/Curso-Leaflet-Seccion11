// css
import './styles.css';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';

// js
import {
    geocode,
    clearLayers
} from './js/map.js';


// referencias

const searchBtn = document.querySelector('#searchBtn');
const searchInput = document.querySelector('input');


// events

searchInput.addEventListener('keydown', (evento) => {
    const { key, target } = evento;
    const { value } = target;
    if( value && key === 'Enter' ){
        geocode( value );
        searchInput.value = "";
    }
})

searchInput.addEventListener('input', (evento) => {
    clearLayers();
    const { value } = evento.target;
    if( value ) searchBtn.disabled = false;
    else searchBtn.disabled = true;
});


searchBtn.addEventListener('click', (evento) => {
    const { value } = searchInput;
    geocode( value );
    searchInput.value = "";
})