let countShownPokemon = 20;
let shownPokemon = [];
let maxCountPokemon = 0;
const BASE_URL = `https://pokeapi.co/api/v2/pokemon?limit=100000&offset=0`;

let overlayRef = document.getElementById('overlay');

function init() {
    showLoadingSpinner();
    getPokemon();
}

async function getPokemon() {
    let response = await fetch(BASE_URL);
    let responeToJson = await response.json();
    maxCountPokemon = responeToJson['count'];
    //console.log(responeToJson);



    for (let index = 0; index < countShownPokemon; index++) {
        let response2 = await fetch(responeToJson["results"][index]["url"]);
        let response2ToJson = await response2.json();
        // console.log(response2ToJson);

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
    renderPokemon();
    hideLoadingSpinner();
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
        getBckGrdForCard(index);
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
    let overlayBckGrdRef = document.getElementById(`overlay_bck_grd_${index}`);
    let typeRef = document.getElementById(`type_imgs_${index}`);
    let overlayTypeRef = document.getElementById(`overlay_type_imgs_${index}`)
    overlayBckGrdRef.style.backgroundColor = bckGrdRef.style.backgroundColor;
    overlayTypeRef.innerHTML = typeRef.innerHTML;
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

function addNextPokemon() {
    if (countShownPokemon < maxCountPokemon) {
        shownPokemon = [];
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

function loadAllPokemon() {
    console.log(maxCountPokemon);

    shownPokemon = [];
    countShownPokemon = maxCountPokemon;
    init();
}

function searchFunction() {
    let input = document.getElementById('search_input');
    let filter = input.value.toUpperCase();
    let contentCardRef = document.getElementById('content_cards');
    let pokemonName = contentCardRef.getElementsByTagName('section');

    for (let indexName = 0; indexName < pokemonName.length; indexName++) {
        let txt = pokemonName[indexName].getElementsByTagName('h2')[0];
        let txtValue = txt.textContent || txt.innerText;
        if (txtValue.toUpperCase().indexOf(filter) > -1) {
            pokemonName[indexName].style.display = "";
        } else {
            pokemonName[indexName].style.display = "none";
        }
    }
}

function showLoadingSpinner() {
    let spinnerRef = document.getElementById('loading_spinner');
    spinnerRef.classList.remove('d_none');
}

function hideLoadingSpinner() {
    let spinnerRef = document.getElementById('loading_spinner');
    spinnerRef.classList.add('d_none');
}