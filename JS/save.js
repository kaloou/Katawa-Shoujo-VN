import {el} from './elements.js';
import {$, hide, showFlex, isDisplay} from './common.js';
import {connected, printNotConnected} from "./login.js";
import {pressKey} from "./game.js";

// EVENTS
el.saveBtn.addEventListener('click', () => {
	clickOnSave(1);
});
el.loadBtn.addEventListener('click', () => {
	clickOnSave(2);
});
el.closeSaveBtn.addEventListener('click', () => {
	clickOnSave(0);
});

el.resetAutoSaveBtn.addEventListener('click', () => {
    resetSave();
});

const DEBUG = true;

let saveDivMode, saves, textTitle, saveAreLoading=false;

function clickOnSave(n) {
	if(connected && !saveAreLoading) {
		textTitle = null;
		switch (n) {
			case 0:
                toggleSaveMenu();
				break;
			case 1:
				saveAreLoading = true;
				textTitle = 'Sauvegarder';
	            saveDivMode = 1;
                extractSaves();
				addListenerForSave();
				break;
			case 2:
				saveAreLoading = true;
				textTitle = 'Charger';
	            saveDivMode = 2;
                extractSaves();
				addListenerForLoad();
				break;
			default:
				textTitle = '[ERROR] Reload the page';
				break;
		}
	} else {
		printNotConnected();
	}
}

function toggleSaveMenu() {
	if(isDisplay(el.saveDiv)) {
		$('titleForSaveMenu').remove();
		hide(el.saveDiv);
		document.removeEventListener('keyup', closeSaveWithEsc);
		document.addEventListener('keyup', pressKey);
        switch(saveDivMode) {
            case 1:
                removeListenerForSave();
                break;
            case 2:
                removeListenerForLoad();
                break;
            default:
                location.reload();
                break;
        }
	} else {
		var title = document.createElement('h1');
		title.id = 'titleForSaveMenu';
		el.resetAutoSaveBtn.before(title);
		title.append(textTitle);
		showFlex(el.saveDiv);
		document.removeEventListener('keyup', pressKey);
		document.addEventListener('keyup', closeSaveWithEsc);
	}
}

function closeSaveWithEsc(event) {
	event.preventDefault();
	if (event.key === 'Escape') {
		toggleSaveMenu();
	}
}

function closeSavesMenu() {}

function extractSaves() {
	let xhr = new XMLHttpRequest();
	xhr.onreadystatechange = function () {
		if (xhr.readyState === 4 && xhr.status === 200) {
			let responseText = xhr.responseText;
			try {
				let response = JSON.parse(responseText);
				if (response.received && response.found) {
						saves = response.saves;
						toggleSaveMenu();
						if (DEBUG) console.error(response);
				} else {
					if (DEBUG) console.error('Pas de save trouvées' + response);
					connected = false;
					printNotConnected();
					location.reload();
				}
			} catch (error) {
				if (DEBUG) console.error('Erreur lors du parsing JSON:' + error + '\nRéponse reçue:' + responseText);
				connected = false;
				printNotConnected();
				location.reload();
			}
			saveAreLoading = false;
			xhr = null;
		}
	};
	xhr.open('GET', 'PHP/get_saves.php', true);
	xhr.responseType = 'text';
	xhr.send();
}

function addListenerForSave() {
    for(var i=0 ; i < 5 ; i++) {
        
    }
}

function addListenerForLoad() {
    for(var i=0 ; i < 5 ; i++) {
        
    }
}

function removeListenerForSave() {
    for(var i=0 ; i < 5 ; i++) {
        
    }
}

function removeListenerForLoad() {
    for(var i=0 ; i < 5 ; i++) {
        
    }
}

function resetSave() {

}