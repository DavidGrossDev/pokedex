



let countShownPokemon = 6;
let shownPokemon = [];

const BASE_URL = `https://pokeapi.co/api/v2/pokemon?limit=${countShownPokemon}&offset=0`;

let dialogRef = document.getElementById('overlay');

function init() {
    getPokemon();
}



async function getPokemon() {
    let response = await fetch(BASE_URL);
    let responeToJson = await response.json();

    for (let index = 0; index < countShownPokemon; index++) {
        let response2 = await fetch(responeToJson["results"][index]["url"]);
        let response2ToJson = await response2.json();
        shownPokemon.push(
            {
                "name": response2ToJson['name'],
                "img" : response2ToJson['sprites']['other']['home']['front_default'],
                "types": getTypes(response2ToJson)
            }
        )
    }
    renderPokemon();
    // console.log(shownPokemon);
}

function getTypes(response2ToJson) {
    let currentTypes = [];
    for (let index = 0; index < response2ToJson['types'].length; index++) {
        currentTypes.push(
            {
                "name": response2ToJson['types'][index]['type']['name']
            }
        );  
    }
    console.log(currentTypes);
    
    return currentTypes;
}

function renderPokemon() {
    let contentCardsRef = document.getElementById('content_cards');
    contentCardsRef.innerHTML = "";
    for (let index = 0; index < shownPokemon.length; index++) {
        contentCardsRef.innerHTML += getContentCardsTemplate(index); 
    }
}

function openOverlay(index) {
    
    dialogRef.classList.remove('d_none');
    dialogRef.innerHTML = getOverlayTemplate(index);
}

function closeOverlay() {
    dialogRef.classList.add('d_none');
}
