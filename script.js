let startIndex = 0;
let countShownPokemon = 20;
let shownPokemon = [];
let searchArray = [];
let maxCountPokemon = 0;
const BASE_URL = `https://pokeapi.co/api/v2/pokemon?limit=100000&offset=0`;

let overlayRef = document.getElementById('overlay');

function init() {
    showLoadingSpinner();
    getPokemon(startIndex);
}

async function getPokemon(startIndex) {
    let response = await fetch(BASE_URL);
    let responeToJson = await response.json();
    maxCountPokemon = responeToJson['count'];
    for (startIndex; startIndex < countShownPokemon; startIndex++) {
        let response2 = await fetch(responeToJson["results"][startIndex]["url"]);
        let response2ToJson = await response2.json();
        await pushInShownPokemon(response2ToJson);
    }
    renderPokemon();
    hideLoadingSpinner();
}

async function pushInShownPokemon(response2ToJson) {
    shownPokemon.push(
        {
            "name": response2ToJson['name'],
            "img": response2ToJson['sprites']['other']['home']['front_default'],
            "types": await getTypes(response2ToJson),
            "height": (response2ToJson['height']) / 10,
            "weight": (response2ToJson['weight']) / 10,
            "abilities": response2ToJson['abilities'],
            "base_experience": response2ToJson['base_experience'],
            "stats": response2ToJson['stats'],
            "id": response2ToJson['id']
        }
    )
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
        renderPokemonTypeImgs(shownPokemon,index);
        getBckGrdForCard(shownPokemon, index);
    }
}

function renderPokemonTypeImgs(array, index) {
    let typeImgRef = document.getElementById(`type_imgs_${index}`);
    typeImgRef.innerHTML = "";
    for (let typeImgIndex = 0; typeImgIndex < array[index]['types'].length; typeImgIndex++) {
        typeImgRef.innerHTML += getTypeImgTemplate(array, index, typeImgIndex);
    }
}

function openOverlay(index) {
    overlayRef.classList.remove('d_none');
    overlayRef.innerHTML = getOverlayTemplate(index);
    let bckGrdRef = document.getElementById(`bck_grd_${index}`);
    let overlayBckGrdRef = document.getElementById(`overlay_bck_grd_${index}`);
    let typeRef = document.getElementById(`type_imgs_${index}`);
    let overlayTypeRef = document.getElementById(`overlay_type_imgs_${index}`)
    overlayBckGrdRef.style.backgroundColor = bckGrdRef.style.backgroundColor;
    overlayTypeRef.innerHTML = typeRef.innerHTML;
    showMainContent(shownPokemon, index);
}

function closeOverlay() {
    overlayRef.classList.add('d_none');
}

function showMainContent(array,index) {
    let descriptionContentRef = document.getElementById(`content_description_${index}`);
    descriptionContentRef.innerHTML = "";
    let abilitiesString = "";
    for (let abilityIndex = 0; abilityIndex < array[index].abilities.length; abilityIndex++) {
        abilitiesString += `${abilityIndex + 1}: ` + array[index].abilities[abilityIndex]['ability']['name'] + " <br>";
    }
    abilitiesString = abilitiesString.trimEnd();
    chosedDescPart(index, "main");
    descriptionContentRef.innerHTML = getMainTemplates(array, index, abilitiesString);
}

function chosedDescPart(index, chosedItem) {
    let descMainBtnRef = document.getElementById(`desc_main_content_${index}`);
    let descStatsBtnRef = document.getElementById(`desc_stats_content_${index}`);
    descMainBtnRef.style.borderBottomColor = "";
    descStatsBtnRef.style.borderBottomColor = "";
    markChosedDescPart(descMainBtnRef, descStatsBtnRef, chosedItem);
}

function markChosedDescPart(descMainBtnRef, descStatsBtnRef, chosedItem) {
    switch (chosedItem) {
        case "main":
            descMainBtnRef.style.borderBottomColor = "orange";
            break;
        default:
            descStatsBtnRef.style.borderBottomColor = "orange";
            break;
    }
}

function showStatsContent(array,index) {
    let descriptionContentRef = document.getElementById(`content_description_${index}`);
    descriptionContentRef.innerHTML = "";
    for (let statsIndex = 0; statsIndex < array[index]['stats'].length; statsIndex++) {
        descriptionContentRef.innerHTML += getStatTemplate(array, index, statsIndex);
        let statusRef = document.getElementById(`stat_value_${statsIndex}`);
        let statValue = array[index]['stats'][statsIndex]['base_stat'];
        statValue = Math.round(statValue / 2);
        statusRef.style.width = `${statValue}%`;
    }
    chosedDescPart(index, "stats");
}

function addNextPokemon() {
    if (countShownPokemon < maxCountPokemon) {
        startIndex += 20;
        countShownPokemon += 20;
        init();
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

function searchFunction() {
    searchArray = [];
    let input = document.getElementById('search_input');
    let filter = input.value.toUpperCase();
    for (let indexName = 0; indexName < shownPokemon.length; indexName++) {
        if (shownPokemon[indexName]['name'].toUpperCase().indexOf(filter) > -1) {
            searchArray.push(shownPokemon[indexName]);
            renderSearchedPokemon();
        } else {
        }  
    }
}

function renderSearchedPokemon() {
    let contentCardsRef = document.getElementById('content_cards');
    contentCardsRef.innerHTML = "";
    for (let index = 0; index < searchArray.length; index++) {
        contentCardsRef.innerHTML += getContentCardsSearchedTemplate(index);
        renderPokemonTypeImgs(searchArray, index);
        getBckGrdForCard(searchArray, index);
    }
}

function openSearchedOverlay(index) {
    overlayRef.classList.remove('d_none');
    overlayRef.innerHTML = getSearchedOverlayTemplate(index);
    let bckGrdRef = document.getElementById(`bck_grd_${index}`);
    let overlayBckGrdRef = document.getElementById(`overlay_bck_grd_${index}`);
    let typeRef = document.getElementById(`type_imgs_${index}`);
    let overlayTypeRef = document.getElementById(`overlay_type_imgs_${index}`)
    overlayBckGrdRef.style.backgroundColor = bckGrdRef.style.backgroundColor;
    overlayTypeRef.innerHTML = typeRef.innerHTML;
    showMainContent(searchArray, index);
}

function showSearchedPreviousPokemon(index) {
    if (index > 0) {
        index--;
    } else {
        index = (searchArray.length - 1)
    }
    openSearchedOverlay(index);
}

function showSearchedNextPokemon(index) {
    if (index < (searchArray.length - 1)) {
        index++;
    } else {
        index = 0;
    }
    openSearchedOverlay(index);
}

function showLoadingSpinner() {
    let spinnerRef = document.getElementById('loading_spinner');
    spinnerRef.classList.remove('d_none');
}

function hideLoadingSpinner() {
    let spinnerRef = document.getElementById('loading_spinner');
    spinnerRef.classList.add('d_none');
}