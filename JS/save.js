import {el} from './elements.js';
import {$, hide, showFlex, isDisplay} from './common.js';
import {connected, printNotConnected} from "./login.js";
import {pressKey} from "./game.js";

// EVENTS
// el.saveBtn.addEventListener('click', () => {
// 	clickOnSave(1);
// });
// el.loadBtn.addEventListener('click', () => {
// 	clickOnSave(2);
// });
// el.closeSaveBtn.addEventListener('click', () => {
// 	clickOnSave(0);
// });

// el.resetAutoSaveBtn.addEventListener('click', () => {
//     Auto();
// });

const DEBUG = true;

let saveDivMode, saves, textTitle;
let saveAreLoading = false;

const max_save = 5; 

export function clickOnSave(n) {
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
				el.saveBtn.textContent = "chargement...";
                extractSaves();
				addListenerForSave();
				break;
			case 2:
				saveAreLoading = true;
				textTitle = 'Charger';
	            saveDivMode = 2;
				el.loadBtn.textContent = "chargement...";
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
		document.onkeyup = (event) => {
			pressKey(event);
		};
	} else {
		var title = document.createElement('h1');
		title.id = 'titleForSaveMenu';
		el.resetAutoSaveBtn.before(title);
		title.append(textTitle);
		showFlex(el.saveDiv);
		document.onkeyup = (event) => {
			closeSaveWithEsc(event);
		};
		el.saveBtn.textContent = "Sauvegarder";
		el.loadBtn.textContent = "Charger";
	}
}

function closeSaveWithEsc(event) {
	event.preventDefault();
	if (event.key === 'Escape') {
		toggleSaveMenu();
	}
}

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
				}
			} catch (error) {
				if (DEBUG) console.error('Erreur lors du parsing JSON:' + error + '\nRéponse reçue:' + responseText);
				connected = false;
				printNotConnected();
			}
			saveAreLoading = false;
			xhr = null;
		}
	};
	xhr.open('GET', 'PHP/get_saves.php', true);
	xhr.responseType = 'text';
	xhr.send();
}

function saveThisSave(n) {
	console.error("Save" + n);
}

function loadThisSave(n) {
	console.error("Load" + n);
}

export function resetAutoSave() {

}

function addListenerForSave() {
    for(let i=0 ; i < max_save ; i++) {
        el.listOfSaveBtn[i].onclick = () => {
			saveThisSave(i);
		};
    }
}

function addListenerForLoad() {
    for(let i=0 ; i < max_save ; i++) {
        el.listOfSaveBtn[i].onclick = () => {
			loadThisSave(i);
		};
    }
}

function addListenerForReset() {
	for(var i=0 ; i < max_save ; i++) {
        
    }
}