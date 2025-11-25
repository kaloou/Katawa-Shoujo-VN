import {el} from './elements.js';
import {$, hide, showFlex, isDisplay} from './common.js';
import {connected, printNotConnected} from "./login.js";
import {pressKey} from "./game.js";

// EVENTS
el.saveButton.addEventListener('click', () => {
	clickOnSave(1);
});
el.loadButton.addEventListener('click', () => {
	clickOnSave(2);
});
el.closeSaveBtn.addEventListener('click', () => {
	clickOnSave(0);
});

el.resetAutoSaveBtn.addEventListener('click', () => {
    resetSave();
});



let saveDivMode, saves;

async function clickOnSave(n) {
	var textTitle;
	if(!connected) {
		switch (n) {
			case 0:
				break;
			case 1:
				textTitle = 'Sauvegarder';
	            saveDivMode = 1;
				addListenerForSave();
				break;
			case 2:
				textTitle = 'Charger';
	            saveDivMode = 2;
				addListenerForLoad();
				break;
			default:
				textTitle = '[ERROR] Reload the page';
				break;
		}
		saves = await extractSaves();
		toggleSaveMenu(textTitle);
	} else {
		printNotConnected();
	}
}

function toggleSaveMenu(content) {
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
		title.append(content);
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

async function extractSaves() {
	let xhr = new XMLHttpRequest();
	return await new Promise(function (resolve) {
		xhr.onreadystatechange = function () {
			if (xhr.readyState === 4 && xhr.status === 200) {
				let responseText = xhr.responseText;
				try {
					let response = JSON.parse(responseText);
					if (response.received) {
						if (response.found) {
							// récup
						} else {
							if (DEBUG) console.error('Pas de save trouvées');
							location.reload();
						}
					} else {
						if (DEBUG) console.log(response);
						connected = false;
					}
					resolve(response.received);
				} catch (error) {
					if (DEBUG) console.error('Erreur lors du parsing JSON:' + error + '\nRéponse reçue:' + responseText);
					resolve(false);
				}
			}
		};
		xhr.open('POST', 'PHP/get_saves.php', true);
		xhr.responseType = 'text';
		xhr.send(data);
	});
}

function addListenerForSave() {
    for(i=0 ; i < 5 ; i++) {
        
    }
}

function addListenerForLoad() {
    for(i=0 ; i < 5 ; i++) {
        
    }
}

function removeListenerForSave() {
    for(i=0 ; i < 5 ; i++) {
        
    }
}

function removeListenerForLoad() {
    for(i=0 ; i < 5 ; i++) {
        
    }
}

function resetSave() {

}