let saveDivMode,
	saves,
	textTitleSaveDiv,
	textTitleForConfirm,
	max_save = 5,
	saveAreLoading = false;

function clickOnSave(n) {
	if (connected && !saveAreLoading) {
		textTitleSaveDiv = null;
		switch (n) {
			case 0: // Close
				toggleSaveMenu();
				break;
			case 1: // Save
				saveAreLoading = true;
				textTitleSaveDiv = 'Sauvegarder';
	            saveDivMode = 1;
				saveBtn.textContent = "chargement...";
                extractSaves();
				addListenerForSave();
				break;
			case 2: // Load
				saveAreLoading = true;
				textTitleSaveDiv = 'Charger';
	            saveDivMode = 2;
				loadBtn.textContent = "chargement...";
                extractSaves();
				addListenerForLoad();
				break;
			default:
				textTitleSaveDiv = '[ERROR] Reload the page';
				break;
		}
	} else {
		printNotConnected();
	}
}

function toggleSaveMenu() {
	if (isDisplay(saveDiv)) {
		titleForSaveMenu.innerHTML = '';
		if(!isDisplay(divEscape)) {
			noFilter(divGame);
			noFilter(divMenu);
		}
		hide(saveDiv);
		document.onkeyup = (event) => {
			pressKey(event);
		};
		openEscIG.onclick = () => {
			openEscape();
		};
		removeDatesTitlesFromSaves();
	} else {
		var textnode = document.createTextNode(textTitleSaveDiv);
		titleForSaveMenu.appendChild(textnode);
		blurF(divGame);
		blurF(divMenu);
		showFlex(saveDiv);
		document.onkeyup = (event) => {
			closeSaveWithEsc(event);
		};
		openEscIG.onclick = () => {
			toggleSaveMenu();
		};
		saveBtn.textContent = "Sauvegarder";
		loadBtn.textContent = "Charger";
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
					toggleSaveMenu();
					printDatesTitlesFromSaves(response.saves);
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

function printDatesTitlesFromSaves(data) {
	for(var i = 0; i < max_save; i++) {
		var textnode = document.createTextNode(data[i]['title']);
		listOfSaveBtn[i].appendChild(textnode);
		
		var textnode = document.createTextNode(data[i]['init_date']);
		var dateOfSave = document.createElement('p');
		dateOfSave.appendChild(textnode);
		listOfSaveSeparator[i].insertBefore(dateOfSave, listOfSaveSeparator[i].firstElementChild);
	}
}

function removeDatesTitlesFromSaves() {
	for(var i = 0; i < max_save; i++) {
		listOfSaveSeparator[i].removeChild(listOfSaveSeparator[i].firstElementChild);
		listOfSaveBtn[i].innerHTML = '';
	}
}

function closeConfirmDiv() {
	hide(confirmDiv);
	hide(inputForConfirm);
	inputForConfirm.value = '';
	titleForConfirmDiv.textContent = '';
}

function showConfirmDiv(mode) {
	showFlex(confirmDiv);
	switch (mode)
	{
		case 0 : // Reset a save
			titleForConfirmDiv.textContent = 'Réinitialiser cette sauvegarde ?';
			break;
		case 1 : // Reset auto-save
			titleForConfirmDiv.textContent = 'Réinitialiser la partie en cours ?';
			break;
		case 2 : // Load
			titleForConfirmDiv.textContent = 'Remplacer la partie par cette sauvegarde ?';
			break;
		case 3 : // Save
			titleForConfirmDiv.textContent = 'Remplacer cette sauvegarde ?';
			break;
		default : 
			titleForConfirmDiv.textContent = '[ERROR] Reload the page';
			break;
	}
}

function resetAutoSave() {
	showConfirmDiv(1);
}

function saveThisSave(n) {
	console.error('Save' + n);
	showConfirmDiv(3);
	showBlock(inputForConfirm);
}

function loadThisSave(n) {
	console.error('Load' + n);
	showConfirmDiv(2);
}

function resetSave(n) {
	console.error('reset' + n);
	showConfirmDiv(0);
}

function addListenerForSave() {
	for (let i = 0; i < max_save; i++) {
		listOfSaveBtn[i].onclick = () => {
			saveThisSave(i);
		};
	}
}

function addListenerForLoad() {
	for (let i = 0; i < max_save; i++) {
		listOfSaveBtn[i].onclick = () => {
			loadThisSave(i);
		};
	}
}

function addListenerForReset() {
	for (let i = 0; i < max_save; i++) {
		listOfResetBtn[i].onclick = () => {
			resetSave(i);
		}
	}
}

function addListenerForConfirmDiv() {
	confirmBtnForCfrm.onclick = () => {return true};
	cancelBtnForCfrm.onclick = () => {closeConfirmDiv()};
}

function start() {
	if (connected) {
		startBtn.textContent = 'lancement...';
		getAutoSave();
	} else printNotConnected();
}

function getAutoSave() {
	let xhr = new XMLHttpRequest();
	xhr.onreadystatechange = function () {
		if (xhr.readyState === 4 && xhr.status === 200) {
			let responseText = xhr.responseText;
			try {
				let response = JSON.parse(responseText);
				if (response.exist) {
                        if (response.found) {
                            playGame();
					} else {
						if (DEBUG) console.error('pas trouvé');
						printNotConnected();
					}
				} else if (!response.exist) {
					if (DEBUG) console.log(response);
					printNotConnected();
				}
			} catch (error) {
				if (DEBUG) console.error('Erreur lors du parsing JSON:' + error + '\nRéponse reçue:' + responseText);
				printNotConnected();
			}
			xhr = null;
		}
	};
	xhr.open('GET', 'PHP/get_auto_save.php', true);
	xhr.responseType = 'text';
	xhr.send();
}

function returnToMenuAndSave() {
	let xhr = new XMLHttpRequest();
	xhr.onreadystatechange = function () {
		if (xhr.readyState === 4 && xhr.status === 200) {
			let responseText = xhr.responseText;
			try {
				let response = JSON.parse(responseText);
				if (response.found) {
                       if (response.connected)
					   {
							hide(divEscape);
							noFilter(divMenu);
							noFilter(divGame);

							playTransition(() => {
								showFlex(divMenu);
								hide(divGame);
							});
					   } else if (DEBUG) console.log(response);
				} else {
					if (DEBUG) console.log(response);
				}
			} catch (error) {
				if (DEBUG) console.error('Erreur lors du parsing JSON:' + error + '\nRéponse reçue:' + responseText);
			}
			xhr = null;
		}
	};
	xhr.open('GET', 'PHP/save_session_to_db.php', true);
	xhr.responseType = 'text';
	xhr.send();
}