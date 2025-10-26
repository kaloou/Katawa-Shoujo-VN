document.addEventListener('DOMContentLoaded', function () {
    getLine(); //at launch print the line save in session
});
let game_screen = document.getElementById("game");

game_screen.addEventListener("click", getLine);

function getLine() {
    let xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function () {
        if (xhr.readyState === 4 && xhr.status === 200) {
            let responseText = xhr.responseText; 

            if (responseText === "|__ERROR__|") {
                console.error("Une erreur est survenue lors de la récupération de la ligne.");
                return;
            }

            if (responseText === "|__END__|") {
                console.log("Fin de la séquence, redémarrage...");
                getLine();
                return;
            }

            update_dialogue(responseText);
        }
    };
    xhr.open("GET", "PHP/get_line.php", true);
    xhr.send();
}

function update_dialogue(line) {
    let data = line.split('|');
    
    // [0] seqid | [1] seqserial | [2] type | [3] data | [4] elid | [5] pos | [6] z | [7] image_name | [8] character_name | [9] character_color
    const seqid = data[0];
    const seqserial = data[1];
    const type = parseInt(data[2]);
    const content = data[3];
    const elid = data[4];
    const pos = data[5];
    const z = data[6];
    const image_name = data[7] || ""; // peut être vide si pas d'image associée
    const character_name = data[8] || ""; // peut être vide si pas de personnage associé
    const character_color = data[9] || ""; // peut être vide si pas de couleur associée

    if (type === 1) { // type 1 -> text
        displayText(content, character_name, character_color);
    }
    // type 2 -> image (bg)
    else if (type === 2) {
        change_bg(image_name);
        getLine(); // recall to not click again to pass dialogue
    } else {
        console.log("Type non géré pour l'instant : " + type);
        getLine();
    }

    if(DEBUG){
        console.log("Seq ID : " + seqid + " | Seq Serial : " + seqserial + " | Type : " + type);
    }

}

function displayText(content, characterName = "", characterColor = "") {
    let nameElement = document.getElementById("name");
    let textElement = document.getElementById("text");


    if (characterName && characterColor && characterName !== "") {
        nameElement.style.display = "flex";
        nameElement.innerHTML = `<p style="color: ${characterColor};">${characterName}</p>`;
    } else {
        nameElement.style.display = "none";
        nameElement.innerHTML = `<p></p>`;
    }

    textElement.innerHTML = `<p>${content}</p>`;
}


function change_bg(img_name) {
    let bg = document.getElementById('game');
    bg.style.backgroundImage = `url('assets/internHD/${img_name}')`;
}

