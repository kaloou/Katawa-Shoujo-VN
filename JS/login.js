import {$, showFlex, hide, showBlock} from './common.js';
import {DEBUG} from './init.js';
// ici il faut importer elements en verifiant que tout est chargé dans le element.js et donc supprimer tout le domContentLoaded
document.addEventListener('DOMContentLoaded', async () => {
	connectBtn = $('connect_button');
	startBtn = $('start_button');
	divMenu = $('menu_screen');
	divGame = $('game_screen');
	defMenu = $('default_menu');
	formLogin = $('login');
	inputUsrName = $('inp_pseudo');
	helpUsrName = document.querySelector('#login p');
	inputPswd = $('inp_pswd');
	liHelpPswd = document.querySelectorAll('#login ul>li');
	inputSubmit = $('inp_submit');

	inputSubmit.addEventListener('click', sendConnexion);
	formLogin.addEventListener('submit', sendConnexion);

	connectBtn.addEventListener('click', openLoginForm);

	startBtn.addEventListener('click', start);

	inputUsrName.addEventListener('keyup', checkValidUsrName);
	inputPswd.addEventListener('keyup', checkValidPassword);

	connectBtn.addEventListener('mouseenter', wantDisconnect);
	connectBtn.addEventListener('mouseleave', printConnected);

	if (await isConnectedInSession()) {
		// https://www.w3schools.com/js/js_async.asp → "Basic Syntax" and "Waiting for a file"
		connected = true;
		printConnected();
	}
});

let connectBtn,
	startBtn,
	defMenu,
	formLogin,
	inputUsrName,
	helpUsrName,
	inputPswd,
	liHelpPswd,
	inputSubmit,
	divMenu,
	divGame;

/*
let regex10Char = /.{10,}/;
let regexMin = /[]/;
let regexMaj = /[A-Z]/;
let regexNum = /[0-9]/;
let regexSpeChar = /[-._!"`'#%&,:;<>=@{}~\$\(\)\*\+\/\\\?\[\]\^\|]/; // https://stackoverflow.com/a/66435604
*/
let regexUsrName = /^[-_a-zA-Z0-9]{3,15}$/;
let listRegexPwd = [/^.{8,25}$/, /[A-Z]/, /[a-z]/, /[0-9]/, /[-._!"`'#%&,:;<>=@{}~\$\(\)\*\+\/\\\?\[\]\^\|]/u];
//let regexPwd = /^[-A-Za-z0-9,?;.:/=+~ù%´µ£`^¨\[$*\]&|é@"#'(§^è!ç{à)°_}]{8,25}$/u;

// colors : https://katawashoujo.fandom.com/wiki/Main_Page/Characters
let greenColor = '#99B681'; //2c9e31 or 99B681
let redColor = '#eb243b';
let pinkColor = '#FF8D7C';

export let connected = false;

let isTryingToConnect = false;

async function isConnectedInSession() {
	let xhr = new XMLHttpRequest();
	return await new Promise(function (resolve) {
		xhr.onreadystatechange = function () {
			if (xhr.readyState === 4 && xhr.status === 200) {
				let responseText = xhr.responseText;
				try {
					let response = JSON.parse(responseText);
					resolve(response.exist);
				} catch (error) {
					if (DEBUG) {
						console.error('Erreur lors du parsing JSON:', error);
						console.error('Réponse reçue:', responseText);
					}
				}
			}
		};
		xhr.open('GET', 'PHP/is_connected.php', true);
		xhr.responseType = 'text';
		xhr.send();
	});
}

function openLoginForm() {
	if (!connected) {
		showFlex(formLogin);
		hide(defMenu);
	}
}

function disconnect() {
	if (connected) {
		connected = false;
		printNotConnected();
		destroySession();
		connectBtn.removeEventListener('click', disconnect);
	}
}

async function start() {
	if (connected) {
		if (await getAutoSave()) {
			hide(divMenu);
			showBlock(divGame);
		} else printNotConnected();
	} else printNotConnected();
}

export function printNotConnected() {
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
		connectBtn.addEventListener('click', disconnect);
		connectBtn.textContent = 'Se déconnecter ?';
		connectBtn.style.boxShadow = '0 0 0 0.08vw ' + pinkColor;
		connectBtn.style.backgroundColor = pinkColor;
	}
}

function checkValidPassword() {
	var nbrErrors = 0;
	var testInput = inputPswd.value.trim();

	for (let i = 0; i < listRegexPwd.length; i++) {
		if (listRegexPwd[i].test(testInput)) {
			liHelpPswd[i].style.color = greenColor;
		} else {
			nbrErrors += 1;
			liHelpPswd[i].style.color = redColor;
		}
	}

	if (nbrErrors === 0) {
		inputPswd.style.color = greenColor;
		inputPswd.style.borderColor = greenColor;
		return true;
	} else {
		inputPswd.style.color = redColor;
		inputPswd.style.borderColor = redColor;
		return false;
	}
}

function checkValidUsrName() {
	var testInput = inputUsrName.value.trim();

	if (regexUsrName.test(testInput)) {
		helpUsrName.style.color = greenColor;
		inputUsrName.style.color = greenColor;
		inputUsrName.style.borderColor = greenColor;
		return true;
	} else {
		helpUsrName.style.color = redColor;
		inputUsrName.style.color = redColor;
		inputUsrName.style.borderColor = redColor;
		return false;
	}
}

async function sendConnexion(event) {
	event.preventDefault();
	if (!connected && !isTryingToConnect && checkValidUsrName() && checkValidPassword()) {
		isTryingToConnect = true; // to be sure the user is'nt spamming connexion resquests
		await tryConnexion();
		isTryingToConnect = false;
	}
}

function editSendButton(text) {
	inputSubmit.value = text;
}

function resetStyleElems(elems) {
	for (let i = 0; i < elems.length; i++) {
		elems[i].style = ' ';
	}
}

async function tryConnexion() {
	let xhr = new XMLHttpRequest();
	return await new Promise(function (resolve) {
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
						} else {
							if (DEBUG) console.error('Données invalides');
							editSendButton('[ERROR] Respecter les conditions des champs');
						}
					} else {
						if (DEBUG) console.log(response);
						connected = false;
					}
					resolve(response.submit);
				} catch (error) {
					if (DEBUG) {
						console.error('Erreur lors du parsing JSON:', error);
						console.error('Réponse reçue:', responseText);
					}
				}
			}
		};
		xhr.open('POST', 'PHP/login.php', true);
		xhr.responseType = 'text';
		xhr.send(data);
	});
}

async function getAutoSave() {
	let xhr = new XMLHttpRequest();
	return await new Promise(function (resolve) {
		xhr.onreadystatechange = function () {
			if (xhr.readyState === 4 && xhr.status === 200) {
				let responseText = xhr.responseText;
				try {
					let response = JSON.parse(responseText);
					if (response.exist) {
						if (response.found) {
							resolve(true);
						} else {
							if (DEBUG) console.error('pas trouvé');
							resolve(false);
						}
					} else if (!response.exist) {
						if (DEBUG) console.log(response);
						resolve(false);
					}
				} catch (error) {
					if (DEBUG) {
						console.error('Erreur lors du parsing JSON:', error);
						console.error('Réponse reçue:', responseText);
						resolve(false);
					}
				}
			}
		};
		xhr.open('GET', 'PHP/get_auto_save.php', true);
		xhr.responseType = 'text';
		xhr.send();
	});
}
