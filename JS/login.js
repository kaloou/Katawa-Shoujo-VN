/*
let regex10Char = /.{10,}/;
let regexMin = /[]/;
let regexMaj = /[A-Z]/;
let regexNum = /[0-9]/;
let regexSpeChar = /[-._!"`'#%&,:;<>=@{}~\$\(\)\*\+\/\\\?\[\]\^\|]/; // https://stackoverflow.com/a/66435604
*/
let regexUsrName = /^[-_a-zA-Z0-9]{3,15}$/;
let listRegexPwd = [/^.{8,40}$/, /[A-Z]/, /[-_a-z]/, /[0-9]/];
//let regexPwd = /^[-A-Za-z0-9,?;.:/=+~ù%´µ£`^¨\[$*\]&|é@"#'(§^è!ç{à)°_}]{8,25}$/u;

// colors : https://katawashoujo.fandom.com/wiki/Main_Page/Characters
let greenColor = '#99B681'; //2c9e31 or 99B681
let redColor = '#eb243b';
let pinkColor = '#FF8D7C';

let connected = false;

let isTryingToConnect = false;

function isConnectedInSession() {
	let xhr = new XMLHttpRequest();
	xhr.onreadystatechange = function () {
		if (xhr.readyState === 4 && xhr.status === 200) {
			let responseText = xhr.responseText;
			try {
				let response = JSON.parse(responseText);
				if (response) {
					connected = true;
					printConnected();
				}
			}
			catch (error) {
				if (DEBUG) console.error('Erreur lors du parsing JSON:' + error + '\nRéponse reçue:' + responseText);
				connected = false;
			}
			xhr = null;
		}
	};
	xhr.open('GET', 'PHP/is_connected.php', true);
	xhr.responseType = 'text';
	xhr.send();
}

function printNotConnected() {
	if (!connected) {
		connectBtn.textContent = 'Se Connecter';
		connectBtn.style.boxShadow = '0 0 0 0.08vw ' + redColor;
		connectBtn.style.backgroundColor = redColor;
	}
}

function printConnected() {
	if (connected) {
		connectBtn.textContent = 'Vous êtes connecté';
		connectBtn.style.boxShadow = '0 0 0 0.08vw ' + greenColor;
		connectBtn.style.backgroundColor = greenColor;
	}
}

function wantDisconnect() {
	if (connected) {
		connectBtn.onclick = () => {
			disconnect();
		};
		connectBtn.textContent = 'Se déconnecter ?';
		connectBtn.style.boxShadow = '0 0 0 0.08vw ' + pinkColor;
		connectBtn.style.backgroundColor = pinkColor;
	}
}

function disconnect() {
	if (connected && confirm('Êtes-vous sûr de vouloir vous déconnecter')) {
		let xhr = new XMLHttpRequest();
		connected = false;
		printNotConnected();
		connectBtn.onclick = () => {
			openLoginForm();
		};
		xhr.onreadystatechange = function () {
			if (xhr.readyState === 4 && xhr.status === 200) {
				if (DEBUG) console.error(JSON.parse(xhr.responseText));
				initGame();
				xhr = null;
			}
		};
		xhr.open('GET', 'PHP/destroy_session.php', true);
		xhr.responseType = 'text';
		xhr.send();
	}
}

function openLoginForm() {
	if (!connected) {
		showFlex(formLogin);
		hide(defMenu);
	}
}

function sendConnexion(event) {
	event.preventDefault();
	if (!connected && !isTryingToConnect && checkValidUsrName() && checkValidPassword()) {
		isTryingToConnect = true; // to be sure the user is'nt spamming connexion resquests
		tryConnexion();
	}
}

function checkValidUsrName() {
	var testInput = inputUsrName.value.trim();

	if (regexUsrName.test(testInput)) {
		helpUsrName.style.color = greenColor;
		inputUsrName.style.color = greenColor;
		inputUsrName.style.borderColor = greenColor;
		return true;
	}
	else {
		helpUsrName.style.color = redColor;
		inputUsrName.style.color = redColor;
		inputUsrName.style.borderColor = redColor;
		return false;
	}
}

function checkValidPassword() {
	var nbrErrors = 0;
	var testInput = inputPswd.value.trim();

	for (var i = 0; i < listRegexPwd.length; i++) {
		if (listRegexPwd[i].test(testInput)) {
			liHelpPswd[i].style.color = greenColor;
		}
		else {
			nbrErrors += 1;
			liHelpPswd[i].style.color = redColor;
		}
	}

	if (nbrErrors === 0) {
		inputPswd.style.color = greenColor;
		inputPswd.style.borderColor = greenColor;
		return true;
	}
	else {
		inputPswd.style.color = redColor;
		inputPswd.style.borderColor = redColor;
		return false;
	}
}

function tryConnexion() {
	let xhr = new XMLHttpRequest();
	editSendButton('Connexion en cours');
	var data = new FormData(formLogin);
	data.append('inp_submit', 'Envoyer'); //car FormData ne contient pas le submit
	xhr.onreadystatechange = function () {
		if (xhr.readyState === 4 && xhr.status === 200) {
			let responseText = xhr.responseText;
			try {
				let response = JSON.parse(responseText);
				if (response.submit) {
					if (response.valid) {
						switch (response.connexion) {
							case 1:
								if (DEBUG) console.log(response);
								editSendButton('Connexion réussie');
								inputSubmit.style.color = greenColor;
								inputSubmit.style.borderColor = greenColor;
								connected = true;
								printConnected();
								hide(formLogin);
								showFlex(defMenu);
								inputPswd.value = '';
								inputUsrName.value = '';
								resetStyleElems([inputPswd, inputUsrName, inputSubmit]);
								inputSubmit.style = '';
								editSendButton('Envoyer');
								break;
							case 0:
								if (DEBUG) console.log(response);
								editSendButton('Informations incorrectes');
								inputSubmit.style.color = redColor;
								inputSubmit.style.borderColor = redColor;
								connected = false;
								break;
							default:
								if (DEBUG) console.error('??? reponse.connexion ???');
								editSendButton('[ERROR] Reload Page');
						}
					}
					else {
						if (DEBUG) console.error('Données invalides');
						editSendButton('[ERROR] Respecter les conditions des champs');
					}
				}
				else {
					if (DEBUG) console.log(response);
					connected = false;
				}
			}
			catch (error) {
				if (DEBUG) console.error('Erreur lors du parsing JSON:' + error + '\nRéponse reçue:' + responseText);
			}
			isTryingToConnect = false;
			xhr = null;
		}
	};
	xhr.open('POST', 'PHP/login.php', true);
	xhr.responseType = 'text';
	xhr.send(data);
}

function editSendButton(text) {
	inputSubmit.value = text;
}

function resetStyleElems(elems) {
	for (var i = 0; i < elems.length; i++) {
		elems[i].style = '';
	}
}