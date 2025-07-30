function getContentCardsTemplate(index) {
    return `<section class="poke-card" onclick="openOverlay(${index})">
                <div class="card-header bckgrnd-dg"><h2 class="txt-transf-capi" id="pokemon_name_${index}">${shownPokemon[index]['name']}</h2></div>
                <div id="bck_grd_${index}" class="card-img"><img src="${shownPokemon[index]['img']}" alt=""></div>
                <div id="type_imgs_${index}" class="card-footer bckgrnd-dg"></div>
            </section>`
}

function getTypeImgTemplate(index, typeImgIndex) {
    return `<img class="type-img" src="${shownPokemon[index]['types'][typeImgIndex]['typeImg']}" alt=""></img>`
}

function getOverlayTemplate(index) {
    return `<div class="overlay-card" onclick="event.stopPropagation()">
            <section class="card-header bckgrnd-dg">
                <h2>${shownPokemon[index].name}</h2>
            </section>
            <section id="overlay_bck_grd_${index}" class="overlay-card-img"><img src="${shownPokemon[index]['img']}" alt=""></section>
            <section id="overlay_type_imgs_${index}" class="card-footer bckgrnd-dg brd-rad-none">
                
            </section>
            <section class="overlay-card-description">
                <div class="description-head">
                    <div id="desc_main_content_${index}" class="main-btn brd-rgt" onclick="showMainContent(${index})">main</div>
                    <div id="desc_stats_content_${index}" class="stats-btn brd-lft" onclick="showStatsContent(${index})">stats</div>
                </div>
                <div id="content_description_${index}" class="description-content">
                </div>
            </section>
            <section class="overlay-card-btns bckgrnd-dg">
                <button onclick="showPreviousPokemon(${index})">Back</button>
                <button onclick="showNextPokemon(${index})">Forward</button>
            </section>
        </div>`
}

function getMainTemplates(index, abilitiesString) {
    return`<table class="main-table">
        <tr>
            <td><div>Height</div><div>:</div></td>
            <td> ${shownPokemon[index].height} m</td>
        </tr>
        <tr>
            <td><div>Weight</div><div>:</div></td>
            <td> ${shownPokemon[index].weight} kg</td>
        </tr>
        <tr>
            <td><div>Base experience</div><div>:</div></td>
            <td> ${shownPokemon[index].base_experience}</td>
        </tr>
        <tr>
            <td><div>Abilities</div><div>:</div></td>
            <td> ${abilitiesString}</td>
        </tr>
    </table>`
}

function getStatTemplate(index, statsIndex) {
    return `<div class="stat">
                    <div class="stat-title">${shownPokemon[index]['stats'][statsIndex]['stat']['name']}</div>
                    <div class="stat-bar">
                        <div id="stat_value_${statsIndex}" class="stat-value"></div>
                    </div>
                </div>`
}