let countShownPokemon = 20;
let shownPokemon = [];
const BASE_URL = `https://pokeapi.co/api/v2/pokemon?limit=100000&offset=0`;

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
        shownPokemon.push(
            {
                "name": response2ToJson['name'],
                "img": response2ToJson['sprites']['other']['home']['front_default'],
                "types": getTypes(response2ToJson),
                "height": (response2ToJson['height']) / 10,
                "weight": (response2ToJson['weight']) / 10,
                "abilities": response2ToJson['abilities'],
                "base_experience": response2ToJson['base_experience'],
                "stats": response2ToJson['stats']
            }
        )
    }
    renderPokemon();
    console.log(shownPokemon);

}

function getTypes(response2ToJson) {
    let currentTypes = [];
    for (let index = 0; index < response2ToJson['types'].length; index++) {
        currentTypes.push(response2ToJson['types'][index]['type']['name']);
    }
    return currentTypes;
}

function renderPokemon() {
    let contentCardsRef = document.getElementById('content_cards');
    contentCardsRef.innerHTML = "";
    for (let index = 0; index < shownPokemon.length; index++) {
        contentCardsRef.innerHTML += getContentCardsTemplate(index);
        let bckGrdRef = document.getElementById(`bck_grd_${index}`);
        let bckGrdColor = "";
       
        switch (0) {
            case shownPokemon[index]['types'].indexOf("grass"):
                bckGrdColor = "rgb(22, 171, 22)";
                break;
            case shownPokemon[index]['types'].indexOf("fire"):
                bckGrdColor = "rgb(255, 166, 0)";
                break;
            case shownPokemon[index]['types'].indexOf("water"):
                bckGrdColor = "rgba(23, 91, 114, 1)";
                break;
            case shownPokemon[index]['types'].indexOf("bug"):
                bckGrdColor = "rgb(0, 100, 0)";
                break;
            case shownPokemon[index]['types'].indexOf("normal"):
                bckGrdColor = "rgba(131, 119, 119, 1)";
                break;
            case shownPokemon[index]['types'].indexOf("poison"):
                bckGrdColor = "rgb(153, 50, 204)";
                break;
            case shownPokemon[index]['types'].indexOf("electric"):
                bckGrdColor = "#bbbb21f0";
                break;
            case shownPokemon[index]['types'].indexOf("ground"):
                bckGrdColor = "rgb(185, 153, 64)";
                break;
            case shownPokemon[index]['types'].indexOf("fairy"):
                bckGrdColor = "rgb(188, 143, 143)";
                break;
            case shownPokemon[index]['types'].indexOf("fighting"):
                bckGrdColor = "rgb(165, 79, 30)";    
                break;
            case shownPokemon[index]['types'].indexOf("flying"):
                bckGrdColor = "rgb(211, 211, 211)";
                break;
            case shownPokemon[index]['types'].indexOf("psychic"):
                bckGrdColor = "rgb(150, 51, 125)";
                break;
            case shownPokemon[index]['types'].indexOf("rock"):
                bckGrdColor = "rgb(105, 47, 9)";
                break;
            case shownPokemon[index]['types'].indexOf("ice"):
                bckGrdColor = "rgb(33, 158, 189)";
                break;
            case shownPokemon[index]['types'].indexOf("steel"):
                bckGrdColor = "rgb(9, 110, 85)";
                break;
            case shownPokemon[index]['types'].indexOf("ghost"):
                bckGrdColor = "rgb(50, 12, 70)";
                break;
            case shownPokemon[index]['types'].indexOf("dragon"):
                bckGrdColor = "rgb(12, 95, 88)";
                break;
            case shownPokemon[index]['types'].indexOf("dark"):
                bckGrdColor = "rgb(3, 6, 6)";
                break;
            default:
                bckGrdColor = "rgb(0, 0, 0)";
                break;
        }
        bckGrdRef.style.backgroundColor = bckGrdColor;
    }

}

function openOverlay(index) {
    overlayRef.classList.remove('d_none');
    overlayRef.innerHTML = getOverlayTemplate(index);
    let bckGrdRef = document.getElementById(`bck_grd_${index}`);
    let overlayBckGrdRef = document.getElementById(`ovelay_bck_grd_${index}`);
    overlayBckGrdRef.style.backgroundColor = bckGrdRef.style.backgroundColor;
}

function closeOverlay() {
    overlayRef.classList.add('d_none');
}

function showMainContent(index) {
    let descriptionContentRef = document.getElementById(`content_description_${index}`);
    descriptionContentRef.innerHTML = "";
    let abilitiesString = "";
    for (let abilityIndex = 0; abilityIndex < shownPokemon[index].abilities.length; abilityIndex++) {
        abilitiesString += `${abilityIndex + 1}: ` + shownPokemon[index].abilities[abilityIndex]['ability']['name'] + " <br>";
    }
    abilitiesString = abilitiesString.trimEnd();
    descriptionContentRef.innerHTML = getMainTemplates(index, abilitiesString);
}

function showStatsContent(index) {
    let descriptionContentRef = document.getElementById(`content_description_${index}`);
    descriptionContentRef.innerHTML = "";

    for (let statsIndex = 0; statsIndex < shownPokemon[index]['stats'].length; statsIndex++) {
        descriptionContentRef.innerHTML += getStatTemplate(index, statsIndex);
        let statusRef = document.getElementById(`stat_value_${statsIndex}`);
        let statValue = shownPokemon[index]['stats'][statsIndex]['base_stat'];
        statValue = Math.round(statValue / 2);
        statusRef.style.width = `${statValue}%`;
    }
}

function addNextPokemon() {
    if (countShownPokemon < 100000) {
        shownPokemon = [];
        countShownPokemon += 20;
        getPokemon();
    }

}


