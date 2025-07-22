let countShownPokemon = 9;
let shownPokemon = [];
const BASE_URL = `https://pokeapi.co/api/v2/pokemon?limit=${countShownPokemon}&offset=0`;

let overlayRef = document.getElementById('overlay');


function init() {
    getPokemon();
}

async function getPokemon() {
    let response = await fetch(BASE_URL);
    let responeToJson = await response.json();

    for (let index = 0; index < countShownPokemon; index++) {
        let response2 = await fetch(responeToJson["results"][index]["url"]);
        let response2ToJson = await response2.json();
         console.log(response2ToJson)
        shownPokemon.push(
            {
                "name": response2ToJson['name'],
                "img": response2ToJson['sprites']['other']['home']['front_default'],
                "types": getTypes(response2ToJson),
                "height": (response2ToJson['height']) / 10,
                "weight": (response2ToJson['weight']) /10,
                "abilities": response2ToJson['abilities'],
                "base_experience": response2ToJson['base_experience']
            }
        )
    }
    renderPokemon();
    // console.log(shownPokemon);

}

function getTypes(response2ToJson) {
    let currentTypes = "";
    for (let index = 0; index < response2ToJson['types'].length; index++) {
        currentTypes += response2ToJson['types'][index]['type']['name'] + " ";
    }
    currentTypes = currentTypes.trimEnd();
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
    overlayRef.classList.remove('d_none');
    overlayRef.innerHTML = getOverlayTemplate(index);
}

function closeOverlay() {
    overlayRef.classList.add('d_none');
}

function showMainContent(index) {
    let descriptionContentRef = document.getElementById(`content_description_${index}`);
    descriptionContentRef.innerHTML = "";
    let abilitiesString = "";
    for (let abilityIndex = 0; abilityIndex < shownPokemon[index].abilities.length; abilityIndex++) {
        abilitiesString += `${abilityIndex +1}: ` + shownPokemon[index].abilities[abilityIndex]['ability']['name'] + " <br>" ;
    }
    abilitiesString = abilitiesString.trimEnd();
    descriptionContentRef.innerHTML = getMainTemplates(index, abilitiesString);
}

