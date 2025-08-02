function getBckGrdForCard(array, index) {
    let bckGrdRef = document.getElementById(`bck_grd_${index}`);
    let bckGrdColor = "";

    switch (array[index]['types'][0]['name']) {
        case "grass":
            bckGrdColor = "rgb(60, 175, 37)";
            break;
        case "fire":
            bckGrdColor = "rgb(230, 90, 45)";
            break;
        case "water":
            bckGrdColor = "rgb(37, 135, 235)";
            break;
        case "bug":
            bckGrdColor = "rgb(143, 151, 37)";
            break;
        case "normal":
            bckGrdColor = "rgb(138, 141, 143)";
            break;
        case "poison":
            bckGrdColor = "rgb(138, 72, 192)";
            break;
        case "electric":
            bckGrdColor = "rgb(230, 200, 5)";
            break;
        case "ground":
            bckGrdColor = "rgb(174, 109, 25)";
            break;
        case "fairy":
            bckGrdColor = "rgb(230, 163, 235)";
            break;
        case "fighting":
            bckGrdColor = "rgb(230, 164, 5)";
            break;
        case "flying":
            bckGrdColor = "rgb(211, 211, 211)";
            break;
        case "psychic":
            bckGrdColor = "rgb(150, 51, 125)";
            break;
        case "rock":
            bckGrdColor = "rgb(170, 169, 129)";
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
            bckGrdColor = "rgb(56, 78, 235)";
            break;
        case "dark":
            bckGrdColor = "rgb(50, 42, 44)";
            break;
        default:
            bckGrdColor = "rgb(0, 0, 0)";
            break;
    }
    return bckGrdRef.style.backgroundColor = bckGrdColor;
}