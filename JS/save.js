import {el} from './elements.js';
import {hide, showFlex} from './common.js';
import {connected, printNotConnected} from "./login.js";
import {pressKey} from "./game.js"

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

let saveDivMode;

function clickOnSave(n) {
	var textTitle;
	saveDivMode = n;
	if (connected) {
		switch (n) {
			case 0:
				textTitle = '';
				break;
			case 1:
				textTitle = 'Sauvegarder';
				addListenerForSave();
				break;
			case 2:
				textTitle = 'Charger';
				addListenerForLoad();
				break;
			default:
				textTitle = '[ERROR] Reload the page';
				break;
		}
		extractSaves();
		toggleSaveMenu(textTitle);
	} else {
		printNotConnected();
	}
}

function appendTitleOnSavesMenu(content) {
	// https://www.w3schools.com/jsref/met_element_before.asp
	var title = document.createElement('h1');
	title.id = 'titleForSaveMenu';
	el.resetAutoSaveBtn.before(title);
	title.append(content);
}

function toggleSaveMenu(content) {
	if (isDisplay(el.saveDiv)) {
		$('titleForSaveMenu').remove();
		hide(el.saveDiv);
		document.removeEventListener('keyup', closeSaveWithEsc);
		document.addEventListener('keyup', pressKey);
	} else {
		var title = document.createElement('h1');
		title.id = 'titleForSaveMenu';
		el.resetAutoSaveBtn.before(title);
		title.append(content);
		showFlex(el.saveDiv);
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

function closeSavesMenu() {}

async function extractSaves() {}

function addListenerForSave() {}

function addListenerForLoad() {}
