document.addEventListener('DOMContentLoaded', () => {
    saveDiv = $('save_div');
	saveBtn = $('save_button');
	loadBtn = $('load_button');
    closeSaveDiv = $('close_save_button');
    resetAutoSaveBtn = $('reset_auto_save_button');
	divButtonInSaveMenu = document.querySelector("#save_div .buttons");
	listResetBtn = document.querySelectorAll(".reset_save");
    
    saveBtn.addEventListener('click', () => {clickOnSave(1)});
    loadBtn.addEventListener('click', () => {clickOnSave(2)});
    closeSaveDiv.addEventListener('click', () => {clickOnSave(0)});

    // window.addEventListener('beforeunload', (event) => {
    //     event.preventDefault();
    //     keepInAutoSave();
    // });
});

let saveDiv, saveMenuBtn, loadMenuBtn, resetAutoSaveBtn, listResetBtn, listSaveBtn, saveDivMode;

function clickOnSave(n) {
    var textTitle;
    saveDivMode = n;
    if (connected) {
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
        toggleSaveMenu(textTitle);
    }
    else {
        printNotConnected();
    }
}

function appendTitleOnSavesMenu(content) { // https://www.w3schools.com/jsref/met_element_before.asp
    var title = document.createElement("h1");
    title.id = "titleForSaveMenu"
    resetAutoSaveBtn.before(title);
    title.append(content);
}

function toggleSaveMenu(content) {
    if(isDisplay(saveDiv))
    {
        $('titleForSaveMenu').remove();
        hide(saveDiv);
        document.removeEventListener('keyup', closeSaveWithEsc);
        document.addEventListener('keyup', pressKey);
    }
    else {
        var title = document.createElement("h1");
        title.id = "titleForSaveMenu";
        resetAutoSaveBtn.before(title);
        title.append(content);
        showFlex(saveDiv)
        document.addEventListener('keyup', closeSaveWithEsc);
        document.removeEventListener('keyup', pressKey);
    }
}

function closeSaveWithEsc(event) {
	event.preventDefault();
	if (event.key === 'Escape') {
		toggleSaveMenu();
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