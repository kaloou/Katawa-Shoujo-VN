document.addEventListener('DOMContentLoaded', () => {
    saveDiv = $('save_div');
	saveBtn = $('save_button');
	loadBtn = $('load_button');
    closeSaveDiv = $('close_save_button');
    autoSaveBtn = $('automatic_save_button');
	divButtonInSaveMenu = document.querySelector("#save_div .buttons");
	listResetBtn = document.querySelectorAll(".reset_save");
    
    saveBtn.addEventListener('click', () => {clickOnSave(1)});
    loadBtn.addEventListener('click', () => {clickOnSave(2)});
    closeSaveDiv.addEventListener('click', () => {clickOnSave(0)});

    
});

let saveDiv, saveMenuBtn, loadMenuBtn, autoSaveBtn, listResetBtn, listSaveBtn, saveDivMode;

function clickOnSave(n) {
    var textTitle;
    saveDivMode = n;
    switch(n)
    {
        case 0: 
            textTitle ="";
            break;
        case 1:
            textTitle = "Sauvegarder";
            addListenerForSave();
            break;
        case 2:
            textTitle = "Charger";
            addListenerForLoad();
            break;
        default:
            textTitle = "[ERROR] Reload the page";
            break;
    }
    extractSaves();
    closeOrOpenMenu(textTitle);
}


function appendTitleOnSavesMenu(content) { // https://www.w3schools.com/jsref/met_element_before.asp
    var title = document.createElement("h1");
    title.id = "titleForSaveMenu"
    autoSaveBtn.before(title);
    title.append(content);
}

function closeOrOpenMenu(content) {
    try {
        $('titleForSaveMenu').remove();
        hide(saveDiv);
    }
    catch {
        var title = document.createElement("h1");
        title.id = "titleForSaveMenu";
        autoSaveBtn.before(title);
        title.append(content);
        showFlex(saveDiv)
    }
}

function closeSavesMenu() {
    
}

async function extractSaves() {
    
}

function addListenerForSave() {

}

function addListenerForLoad() {

}