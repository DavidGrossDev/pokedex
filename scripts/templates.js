function getContentCardsTemplate(index) {
    return `<div class="poke-card" onclick="openOverlay(${index})">
                <div class="card-header bckgrnd-dg"><h2>${shownPokemon[index]['name']}</h2></div>
                <div class="card-img"><img src="${shownPokemon[index]['img']}" alt=""></div>
                <div class="card-footer bckgrnd-dg">${shownPokemon[index]['types'][0].name}</div>
            </div>`
}

function getOverlayTemplate(index) {
    return `<div class="overlay-card" onclick="event.stopPropagation()">
            <section class="card-header bckgrnd-dg">
                <h2>${shownPokemon[index].name}</h2>
            </section>
            <section class="overlay-card-img"><img src="${shownPokemon[index]['img']}" alt=""></section>
            <section class="card-footer bckgrnd-dg brd-rad-none">
                hashshsa
            </section>
            <section class="overlay-card-description">
                <div class="description-head">
                    <div class="brd-rgt">main</div>
                    <div>stats</div>
                    <div class="brd-lft">evo chain</div>
                </div>
                <div class="description-content">
                </div>
            </section>
            <section class="overlay-card-btns bckgrnd-dg">
                <button>Back</button>
                <button>Forward</button>
            </section>
        </div>`
}