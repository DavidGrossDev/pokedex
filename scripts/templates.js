function getContentCardsTemplate(index) {
    return `<div class="poke-card" onclick="openOverlay(${index})">
                <div class="card-header bckgrnd-dg"><h2>${shownPokemon[index]['name']}</h2></div>
                <div class="card-img"><img src="${shownPokemon[index]['img']}" alt=""></div>
                <div class="card-footer bckgrnd-dg">${shownPokemon[index]['types']}</div>
            </div>`
}

function getOverlayTemplate(index) {
    return `<div class="overlay-card" onclick="event.stopPropagation()">
            <section class="card-header bckgrnd-dg">
                <h2>${shownPokemon[index].name}</h2>
            </section>
            <section class="overlay-card-img"><img src="${shownPokemon[index]['img']}" alt=""></section>
            <section class="card-footer bckgrnd-dg brd-rad-none">
                ${shownPokemon[index]['types']}
            </section>
            <section class="overlay-card-description">
                <div class="description-head">
                    <div class="brd-rgt" onclick="showMainContent(${index})">main</div>
                    <div>stats</div>
                    <div class="brd-lft">evo chain</div>
                </div>
                <div id="content_description_${index}" class="description-content">
                </div>
            </section>
            <section class="overlay-card-btns bckgrnd-dg">
                <button>Back</button>
                <button>Forward</button>
            </section>
        </div>`
}

function getMainTemplates(index, abilitiesString) {
    return`<table>
        <tr>
            <td>Height</td>
            <td>: ${shownPokemon[index].height} m</td>
        </tr>
        <tr>
            <td>Weight</td>
            <td>: ${shownPokemon[index].weight} kg</td>
        </tr>
        <tr>
            <td>Base experience</td>
            <td>: ${shownPokemon[index].base_experience}</td>
        </tr>
        <tr>
            <td>Abilities</td>
            <td>: ${abilitiesString}</td>
        </tr>
    </table>`
}