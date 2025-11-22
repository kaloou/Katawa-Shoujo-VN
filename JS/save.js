import {el} from './elements.js';
import {hide, showFlex} from './common.js';

// EVENTS
el.saveButton.addEventListener('click', () => {
	clickOnSave(1);
});
el.loadButton.addEventListener('click', () => {
	clickOnSave(2);
});
el.closeSaveButton.addEventListener('click', () => {
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
		closeOrOpenMenu(textTitle);
	} else {
		printNotConnected();
	}
}

function appendTitleOnSavesMenu(content) {
	// https://www.w3schools.com/jsref/met_element_before.asp
	var title = document.createElement('h1');
	title.id = 'titleForSaveMenu';
	el.automaticSaveButton.before(title);
	title.append(content);
}

function closeOrOpenMenu(content) {
	try {
		document.getElementById('titleForSaveMenu')?.remove();
		hide(el.saveDiv);
	} catch {
		var title = document.createElement('h1');
		title.id = 'titleForSaveMenu';
		el.automaticSaveButton.before(title);
		title.append(content);
		showFlex(el.saveDiv);
	}
}

function closeSavesMenu() {}

async function extractSaves() {}

function addListenerForSave() {}

function addListenerForLoad() {}
