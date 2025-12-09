let saveDivMode,
	saves,
	textTitle,
	max_save = 5,
	saveAreLoading = false;

function clickOnSave(n) {
	if (connected && !saveAreLoading) {
		textTitle = null;
		switch (n) {
			case 0:
				toggleSaveMenu();
				break;
			case 1:
				saveAreLoading = true;
				textTitle = 'Sauvegarder';
	            saveDivMode = 1;
				saveBtn.textContent = "chargement...";
                extractSaves();
				addListenerForSave();
				break;
			case 2:
				saveAreLoading = true;
				textTitle = 'Charger';
	            saveDivMode = 2;
				loadBtn.textContent = "chargement...";
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
	if (isDisplay(saveDiv)) {
		$('titleForSaveMenu').remove();
		if(!isDisplay(divEscape)) {
			noFilter(divGame);
			noFilter(divMenu);
		}
		hide(saveDiv);
		document.onkeyup = (event) => {
			pressKey(event);
		};
	} else {
		var title = document.createElement('h1');
		title.id = 'titleForSaveMenu';
		resetAutoSaveBtn.before(title);
		title.append(textTitle);
		blurF(divGame);
		blurF(divMenu);
		showFlex(saveDiv);
		document.onkeyup = (event) => {
			closeSaveWithEsc(event);
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
	console.error('Save' + n);
}

function loadThisSave(n) {
	console.error('Load' + n);
}

function resetAutoSave() {}

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
	for (var i = 0; i < max_save; i++) {}
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
                            playTransition(() => {
                                hide(divMenu);
                                showBlock(divGame);
                                showFlex(openEscIG);
                            });
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
			startBtn.textContent = 'Jouer';
			xhr = null;
		}
	};
	xhr.open('GET', 'PHP/get_auto_save.php', true);
	xhr.responseType = 'text';
	xhr.send();
}