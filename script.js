let countShownPokemon = 400;
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
                "types": await getTypes(response2ToJson),
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

async function getTypes(response2ToJson) {
    let currentTypes = [];
    for (let index = 0; index < response2ToJson['types'].length; index++) {
        currentTypes.push(
            {
                "name": response2ToJson['types'][index]['type']['name'],
                "url": response2ToJson['types'][index]['type']['url'],
                "typeImg": await getTypeImg(response2ToJson, index)
            }
        )
    }
    // console.log(currentTypes[0].typeImg);
    return currentTypes;
}

async function getTypeImg(response2ToJson, index) {
        let currentTypeImgs = "";
        let responseType = await fetch(response2ToJson['types'][index]['type']['url']);
        let responseTypeToJson = await responseType.json();
        currentTypeImgs += responseTypeToJson['sprites']['generation-viii']['brilliant-diamond-and-shining-pearl']['name_icon'];
        return currentTypeImgs;
}

function renderPokemon() {
    let contentCardsRef = document.getElementById('content_cards');
    contentCardsRef.innerHTML = "";
    for (let index = 0; index < shownPokemon.length; index++) {
        contentCardsRef.innerHTML += getContentCardsTemplate(index);
        renderPokemonTypeImgs(index);
        let bckGrdRef = document.getElementById(`bck_grd_${index}`);
        let bckGrdColor = "";

        switch (shownPokemon[index]['types'][0]['name']) {
            case "grass":
                bckGrdColor = "rgb(22, 171, 22)";
                break;
            case "fire":
                bckGrdColor = "rgb(255, 166, 0)";
                break;
            case "water":
                bckGrdColor = "rgba(23, 91, 114, 1)";
                break;
            case "bug":
                bckGrdColor = "rgb(0, 100, 0)";
                break;
            case "normal":
                bckGrdColor = "rgba(131, 119, 119, 1)";
                break;
            case "poison":
                bckGrdColor = "rgb(153, 50, 204)";
                break;
            case "electric":
                bckGrdColor = "#bbbb21f0";
                break;
            case "ground":
                bckGrdColor = "rgb(185, 153, 64)";
                break;
            case "fairy":
                bckGrdColor = "rgb(188, 143, 143)";
                break;
            case "fighting":
                bckGrdColor = "rgb(165, 79, 30)";
                break;
            case "flying":
                bckGrdColor = "rgb(211, 211, 211)";
                break;
            case "psychic":
                bckGrdColor = "rgb(150, 51, 125)";
                break;
            case "rock":
                bckGrdColor = "rgb(105, 47, 9)";
                break;
            case "ice":
                bckGrdColor = "rgb(33, 158, 189)";
                break;
            case "steel":
                bckGrdColor = "rgb(9, 110, 85)";
                break;
            case "ghost":
                bckGrdColor = "rgb(50, 12, 70)";
                break;
            case "dragon":
                bckGrdColor = "rgb(12, 95, 88)";
                break;
            case "dark":
                bckGrdColor = "rgb(3, 6, 6)";
                break;
            default:
                bckGrdColor = "rgb(0, 0, 0)";
                break;
        }
        bckGrdRef.style.backgroundColor = bckGrdColor;
    }

}

function renderPokemonTypeImgs(index) {
    let typeImgRef = document.getElementById(`type_imgs_${index}`);
    typeImgRef.innerHTML = "";
    for (let typeImgIndex = 0; typeImgIndex < shownPokemon[index]['types'].length; typeImgIndex++) {
        typeImgRef.innerHTML += getTypeImgTemplate(index, typeImgIndex);
    }

}

function openOverlay(index) {
    overlayRef.classList.remove('d_none');
    overlayRef.innerHTML = getOverlayTemplate(index);
    let bckGrdRef = document.getElementById(`bck_grd_${index}`);
    let overlayBckGrdRef = document.getElementById(`ovelay_bck_grd_${index}`);
    overlayBckGrdRef.style.backgroundColor = bckGrdRef.style.backgroundColor;
    showMainContent(index);
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
    chosedDescPart(index, "main");
    descriptionContentRef.innerHTML = getMainTemplates(index, abilitiesString);
}

function chosedDescPart(index, chosedItem) {
    let descMainBtnRef = document.getElementById(`desc_main_content_${index}`);
    let descStatsBtnRef = document.getElementById(`desc_stats_content_${index}`);
    let descEvoBtnRef = document.getElementById(`desc_evo_content_${index}`);
    descMainBtnRef.style.borderBottomColor = "";
    descStatsBtnRef.style.borderBottomColor = "";
    descEvoBtnRef.style.borderBottomColor = "";
    markChosedDescPart(descMainBtnRef, descStatsBtnRef, descEvoBtnRef, chosedItem);

}

function markChosedDescPart(descMainBtnRef, descStatsBtnRef, descEvoBtnRef, chosedItem) {
    switch (chosedItem) {
        case "main":
            descMainBtnRef.style.borderBottomColor = "orange";
            break;
        case "stats":
            descStatsBtnRef.style.borderBottomColor = "orange";
            break;
        default:
            descEvoBtnRef.style.borderBottomColor = "orange";
            break;
    }
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
    chosedDescPart(index, "stats");
}

function showEvoChain(index) {
    chosedDescPart(index, "evo");
}

function addNextPokemon() {
    if (countShownPokemon < 100000) {
        shownPokemon = [];
        countShownPokemon += 20;
        getPokemon();
    }

}

function showPreviousPokemon(index) {
    if (index > 0) {
        index--;
    } else {
        index = (shownPokemon.length - 1)
    }
    openOverlay(index);
}

function showNextPokemon(index) {
    if (index < (shownPokemon.length - 1)) {
        index++;
    } else {
        index = 0;
    }
    openOverlay(index);
}
