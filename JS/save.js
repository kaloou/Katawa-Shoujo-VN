let saveDivMode,
	textTitleSaveDiv,
	max_save = 5,
	isExtractingAuto = false,
	isLunchingGame = false,
	areSavesLoading = false,
	isLoadingOneSave = false,
	isAutoSaving = false;

function start() {
	if (connected) {
		startBtn.textContent = 'lancement...';
		getAutoSave();
	}
	else printNotConnected();
}

function getAutoSave() {
	if(!isExtractingAuto)
	{
		isExtractingAuto = true;
		let xhr = new XMLHttpRequest();
		xhr.onreadystatechange = function () {
			if (xhr.readyState === 4 && xhr.status === 200) {
				let responseText = xhr.responseText;
				try {
					let response = JSON.parse(responseText);
					if (response.exist) {
						if (response.found) {
							playGame();
						}
						else {
							if (DEBUG) console.error('pas trouvé');
							connected = false;
							printNotConnected();
						}
					}
					else if (!response.exist) {
						if (DEBUG) console.log(response);
						connected = false;
						printNotConnected();
					}
				}
				catch (error) {
					if (DEBUG) console.error('Erreur lors du parsing JSON:' + error + '\nRéponse reçue:' + responseText);
					connected = false;
					printNotConnected();
				}
				isExtractingAuto = false;
				xhr = null;
			}
		};
		xhr.open('GET', 'PHP/get_auto_save.php', true);
		xhr.responseType = 'text';
		xhr.send();
	}
}

function playGame() {
	if(!isLunchingGame)
	{
		isLunchingGame = true;
		let xhr = new XMLHttpRequest();
		xhr.onreadystatechange = function () {
			if (xhr.readyState === 4 && xhr.status === 200) {
				let responseText = xhr.responseText;
				try {
					let response = JSON.parse(responseText);
					if (response.connected) {
						if (response.found) {
							showBlock(divGame);

							// === Load content in divGame ===
							change_bg(response.to_load.bg, true);
							play_music(response.to_load.music);
							if (response.to_load.sprite.image_name.startsWith('ev_')) {
								handle_ev(response.to_load.sprite.image_name, 
									response.to_load.sprite.image_tag, 
									response.to_load.sprite.pos, 
									response.to_load.sprite.z, 
									response.to_load.sprite.width, 
									response.to_load.sprite.height, 
									true);
							}
							else if (response.to_load.sprite.image_tag === 'bg') {
								change_bg(response.to_load.sprite.image_name, false);
							}
							else {
								add_sprite(response.to_load.sprite.image_name, 
									response.to_load.sprite.image_tag, 
									response.to_load.sprite.pos, 
									response.to_load.sprite.z, 
									response.to_load.sprite.width, 
									response.to_load.sprite.height);
							}
							getLine();
							// === ==== ===== = ===== ==== ===

							playTransition(() => {
								hide(divMenu);
								showFlex(openEscIG);
							});
							window.onbeforeunload = (e) => {
								e.preventDefault();
								returnToMenuAndSave();
							};
						}
						else {
							if (DEBUG) console.error('pas trouvé');
							connected = false;
							printNotConnected();
						}
					}
					else if (!response.connected) {
						if (DEBUG) console.log(response);
						connected = false;
						printNotConnected();
					}
				}
				catch (error) {
					if (DEBUG) console.error('Erreur lors du parsing JSON:' + error + '\nRéponse reçue:' + responseText);
					connected = false;
					printNotConnected();
				}
				isLunchingGame = false;
				startBtn.textContent = 'Jouer';
				xhr = null;
			}
		};
		xhr.open('GET', 'PHP/save_to_session.php', true);
		xhr.responseType = 'text';
		xhr.send();
	}
}

function clickOnSave(n) {
	if (connected) {
		textTitleSaveDiv = null;
		switch (n) {
			case 0: // Close
				toggleSaveMenu();
				break;
			case 1: // Save
				textTitleSaveDiv = 'Sauvegarder';
	            saveDivMode = 1;
				saveBtn.textContent = 'chargement...';
                extractSaves();
				addListenerForSave();
				break;
			case 2: // Load
				textTitleSaveDiv = 'Charger';
	            saveDivMode = 2;
				loadBtn.textContent = 'chargement...';
				showBlock(resetAutoSaveBtn);
                extractSaves();
				addListenerForLoad();
				break;
			default:
				textTitleSaveDiv = '[ERROR] Reload the page';
				break;
		}
	}
	else {
		printNotConnected();
		if (isDisplay(divEscape)) {
			toMenu();
		}
	}
}

function toggleSaveMenu() {
	if (isDisplay(saveDiv)) {
		titleForSaveMenu.innerHTML = '';
		hide(resetAutoSaveBtn);
		if(!isDisplay(divEscape)) {
			noFilter(divGame);
			noFilter(divMenu);
			divGame.onclick = () => {
				getLine();
			}
		}
		hide(saveDiv);
		document.onkeyup = (event) => {
			pressKey(event);
		};
		openEscIG.onclick = () => {
			toggleEscape();
		};
	}
	else {
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
	}
}

function closeSaveWithEsc(event) {
	event.preventDefault();
	if (event.key === 'Escape') {
		toggleSaveMenu();
	}
}

function extractSaves() {
	if(!areSavesLoading)
	{
		areSavesLoading = true;
		let xhr = new XMLHttpRequest();
		xhr.onreadystatechange = function () {
			if (xhr.readyState === 4 && xhr.status === 200) {
				let responseText = xhr.responseText;
				try {
					let response = JSON.parse(responseText);
					if (response.received && response.found) {
						toggleSaveMenu();
						removeDatesTitlesFromSaves();
						printDatesTitlesFromSaves(response.saves);
						if (DEBUG) console.log(response);
					}
					else {
						if (DEBUG) console.error('Pas de save trouvées' + response);
						connected = false;
						printNotConnected();
						toMenu();
					}
				}
				catch (error) {
					if (DEBUG) console.error('Erreur lors du parsing JSON:' + error + '\nRéponse reçue:' + responseText);
					connected = false;
					printNotConnected();
					toMenu();
				}
				saveBtn.textContent = 'Sauvegarder';
				loadBtn.textContent = 'Charger';
				areSavesLoading = false;
				xhr = null;
			}
		};
		xhr.open('GET', 'PHP/get_saves.php', true);
		xhr.responseType = 'text';
		xhr.send();
	}
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

function resetAutoSave() {
	showConfirmDiv(1);
	confirmBtnForCfrm.onclick = () => {
		if(!isLoadingOneSave)
		{
			isLoadingOneSave = true;
			let xhr = new XMLHttpRequest();
			xhr.onreadystatechange = function () {
				if (xhr.readyState === 4 && xhr.status === 200) {
					let responseText = xhr.responseText;
					try {
						let response = JSON.parse(responseText);
						if (response.connected) {
								getAutoSave();
							}
						else {
							if (DEBUG) console.error('Not connected');
							connected = false;
							printNotConnected();
							toMenu();
						}
					}
					catch (error) {
						if (DEBUG) console.error('Erreur lors du parsing JSON:' + error + '\nRéponse reçue:' + responseText);
						connected = false;
						printNotConnected();
						toMenu();
					}
					closeConfirmDiv();
					clickOnSave(0);
					isLoadingOneSave = false;
					xhr = null;
				}
			};
			xhr.open('GET', 'PHP/reset_auto_save.php', true);
			xhr.responseType = 'text';
			xhr.send();
		}
	};
}

function resetSave(n) {
	showConfirmDiv(0);
	confirmBtnForCfrm.onclick = () => {
		if(n<max_save && n> -1 && !isLoadingOneSave)
		{
			confirmBtnForCfrm.textContent = '...';
			isLoadingOneSave = true;
			let xhr = new XMLHttpRequest();
			xhr.onreadystatechange = function () {
				if (xhr.readyState === 4 && xhr.status === 200) {
					let responseText = xhr.responseText;
					try {
						let response = JSON.parse(responseText);
						if (response.valid) {
							if (response.connected) {
								if (response.found) {
									listOfResetBtn[n].textContent = "V";
									clickOnSave(0);
									clickOnSave(saveDivMode);
									setTimeout(
										() => {
											listOfResetBtn[n].textContent = "X";
											n = null;
										}, 2000
									);
								}
								else {
									connected = false;
									printNotConnected();
									if (DEBUG) console.error('Not found');
									n = null;
								}
							}
							else {
								if (DEBUG) console.error('Not connected');
								connected = false;
								printNotConnected();
								n = null;
							}
						}
						else {
							if (DEBUG) console.error('Not valid' + response);
							connected = false;
							printNotConnected();
							n = null;
						}
					}
					catch (error) {
						if (DEBUG) console.error('Erreur lors du parsing JSON:' + error + '\nRéponse reçue:' + responseText);
						connected = false;
						printNotConnected();
						n = null;
					}
					closeConfirmDiv();
					confirmBtnForCfrm.textContent = 'Confirmer';
					isLoadingOneSave = false;
					xhr = null;
				}
			};
			xhr.open('POST', 'PHP/reset_one_save.php', true);
			xhr.responseType = 'text';
			xhr.send(n);
		}
	};
}

function loadThisSave(n) {
	showConfirmDiv(2);
	confirmBtnForCfrm.onclick = () => {
		if(n<max_save && n> -1 && !isLoadingOneSave)
		{
			isLoadingOneSave = true;
			let xhr = new XMLHttpRequest();
			xhr.onreadystatechange = function () {
				if (xhr.readyState === 4 && xhr.status === 200) {
					let responseText = xhr.responseText;
					try {
						let response = JSON.parse(responseText);
						if (response.valid) {
							if (response.connected) {
								if (response.found) {
									playGame();
									closeConfirmDiv();
									clickOnSave(0);
								}
								else {
									connected = false;
									printNotConnected();
									if (DEBUG) console.error('Not found');
								}
							}
							else {
								if (DEBUG) console.error('Not connected');
								connected = false;
								printNotConnected();
							}
						}
						else {
							if (DEBUG) console.error('Not valid' + response);
							connected = false;
							printNotConnected();
						}
					}
					catch (error) {
						if (DEBUG) console.error('Erreur lors du parsing JSON:' + error + '\nRéponse reçue:' + responseText);
						connected = false;
						printNotConnected();
					}
					isLoadingOneSave = false;
					n = null;
					xhr = null;
				}
			};
			xhr.open('POST', 'PHP/load_save.php', true);
			xhr.responseType = 'text';
			xhr.send(n);
		}
	};
}

function saveThisSave(n) {
	showConfirmDiv(3);
	showBlock(inputForConfirm);
	confirmBtnForCfrm.onclick = () => {
		if(inputForConfirm.value.trim() == '') {
			inputForConfirm.value = 'Nouvelle partie';
		}
		if(n<max_save && n> -1 && checkValidTitleForSave() && !isLoadingOneSave)
		{
			isLoadingOneSave = true;
			let xhr = new XMLHttpRequest();
			var toSend = n + '|' + inputForConfirm.value.trim();
			xhr.onreadystatechange = function () {
				if (xhr.readyState === 4 && xhr.status === 200) {
					let responseText = xhr.responseText;
					try {
						let response = JSON.parse(responseText);
						if (response.valid) {
							if (response.connected) {
								if (!response.found) {
									connected = false;
									printNotConnected();
									toMenu();
									if (DEBUG) console.error('Not found');
								}
							}
							else {
								if (DEBUG) console.error('Not connected');
								connected = false;
								printNotConnected();
								toMenu();
							}
						}
						else {
							if (DEBUG) console.error('Not valid' + response);
							connected = false;
							printNotConnected();
							toMenu();
						}
					}
					catch (error) {
						if (DEBUG) console.error('Erreur lors du parsing JSON:' + error + '\nRéponse reçue:' + responseText);
						connected = false;
						printNotConnected();
						toMenu();
					}
					closeConfirmDiv();
					toggleSaveMenu();
					isLoadingOneSave = false;
					n = null;
					xhr = null;
				}
			};
			xhr.open('POST', 'PHP/save_game.php', true);
			xhr.responseType = 'text';
			xhr.send(toSend);
		}
	};
}

function checkValidTitleForSave()
{
	var testInput = inputForConfirm.value.trim();

	if (/^[- _a-zA-Z0-9]{1,16}$/.test(testInput)) {
		inputForConfirm.style.color = greenColor;
		inputForConfirm.style.borderColor = greenColor;
		return true;
	}
	else {
		inputForConfirm.style.color = redColor;
		inputForConfirm.style.borderColor = redColor;
		return false;
	}
}

function showConfirmDiv(mode) {
	titleForConfirmDiv.innerHTML = '';
	showFlex(confirmDiv);
	document.onkeyup = (event) => {
		closeConfirmWithEsc(event);
	}; 
	openEscIG.onclick = () => {
		closeConfirmDiv();
	};
	switch (mode)
	{
		case 0 : // Reset a save
			var textnode = document.createTextNode('Réinitialiser cette sauvegarde ?');
			titleForConfirmDiv.appendChild(textnode);
			break;
		case 1 : // Reset auto-save
			var textnode = document.createTextNode('Réinitialiser la partie en cours ?');
			titleForConfirmDiv.appendChild(textnode);
			break;
		case 2 : // Load
			var textnode = document.createTextNode('Remplacer la partie par cette sauvegarde ?');
			titleForConfirmDiv.appendChild(textnode);
			break;
		case 3 : // Save
			var textnode = document.createTextNode('Remplacer cette sauvegarde ?');
			titleForConfirmDiv.appendChild(textnode);
			break;
		default : 
			var textnode = document.createTextNode('[ERROR] Reload the page');
			titleForConfirmDiv.appendChild(textnode);
			break;
	}
}

function closeConfirmDiv() {
	hide(confirmDiv);
	hide(inputForConfirm);
	inputForConfirm.value = '';
	titleForConfirmDiv.innerHTML = '';
	document.onkeyup = (event) => {
		closeSaveWithEsc(event);
	};
	openEscIG.onclick = () => {
		toggleSaveMenu();
	};
}

function closeConfirmWithEsc(event) {
	event.preventDefault();
	if (event.key === 'Escape') {
		closeConfirmDiv();
	}
}

function returnToMenuAndSave() {
	returnBtn.textContent = 'retour...';
	autoSave();
	toMenu();
}

function autoSave() {
	if (!isAutoSaving) {
		isAutoSaving = true;
		let xhr = new XMLHttpRequest();
		xhr.onreadystatechange = function () {
			if (xhr.readyState === 4 && xhr.status === 200) {
				let responseText = xhr.responseText;
				try {
					let response = JSON.parse(responseText);
					if (!response.found || !response.connected) {
						if (DEBUG) console.log(response);
						printNotConnected();
						connected = false;
						toMenu();
					}
				}
				catch (error) {
					if (DEBUG) console.error('Erreur lors du parsing JSON:' + error + '\nRéponse reçue:' + responseText);
					printNotConnected();
					connected = false;
					toMenu();		
				}
				returnBtn.textContent = 'Revenir au Menu';
				isAutoSaving = false;
				xhr = null;
			}
		};
		xhr.open('GET', 'PHP/save_session_to_db.php', true);
		xhr.responseType = 'text';
		xhr.send();
	}
}

function toMenu() {
	hide(openEscIG);
	toggleEscape();
	noFilter(divMenu);
	noFilter(divGame);
	window.onbeforeunload = '';
	playTransition(() => {
		showFlex(divMenu);
		hide(divGame);
	});
}