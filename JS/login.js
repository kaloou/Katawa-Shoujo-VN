import {el} from './elements.js';
import {$, showFlex, hide, showBlock} from './common.js';
import {DEBUG} from './init.js';
// ici il faut importer elements en verifiant que tout est chargé dans le element.js et donc supprimer tout le domContentLoaded

// el.inputSubmit.addEventListener('click', sendConnexion);
// el.formLogin.addEventListener('submit', sendConnexion);

// el.connectBtn.addEventListener('click', openLoginForm);

// el.startBtn.addEventListener('click', start);

// el.inputUsrName.addEventListener('keyup', checkValidUsrName);
// el.inputPswd.addEventListener('keyup', checkValidPassword);

// el.connectBtn.addEventListener('mouseenter', wantDisconnect);
// el.connectBtn.addEventListener('mouseleave', printConnected);

isConnectedInSession();

// let connectBtn,
// 	startBtn,
// 	defMenu,
// 	formLogin,
// 	inputUsrName,
// 	helpUsrName,
// 	inputPswd,
// 	liHelpPswd,
// 	inputSubmit,
// 	divMenu,
// 	divGame;

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
			} catch (error) {
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

export function openLoginForm() {
	if (!connected) {
		showFlex(el.formLogin);
		hide(el.defMenu);
	}
}

function disconnect() {
	if (connected) {
		connected = false;
		printNotConnected();
		destroySession();
		el.connectBtn.removeEventListener('click', disconnect);
	}
}

export function start() {
	if (connected) {
		getAutoSave();
	} else printNotConnected();
}

export function printNotConnected() {
	if (!connected) {
		el.connectBtn.textContent = 'Se Connecter';
		el.connectBtn.style.boxShadow = '0 0 0 0.08vw ' + redColor;
		el.connectBtn.style.backgroundColor = redColor;
	}
}

export function printConnected() {
	if (connected) {
		el.connectBtn.textContent = 'Vous êtes connecté';
		el.connectBtn.style.boxShadow = '0 0 0 0.08vw ' + greenColor;
		el.connectBtn.style.backgroundColor = greenColor;
	}
}

export function wantDisconnect() {
	if (connected) {
		el.connectBtn.addEventListener('click', disconnect);
		el.connectBtn.textContent = 'Se déconnecter ?';
		el.connectBtn.style.boxShadow = '0 0 0 0.08vw ' + pinkColor;
		el.connectBtn.style.backgroundColor = pinkColor;
	}
}

export function checkValidPassword() {
	var nbrErrors = 0;
	var testInput = el.inputPswd.value.trim();

	for (var i = 0; i < listRegexPwd.length; i++) {
		if (listRegexPwd[i].test(testInput)) {
			el.liHelpPswd[i].style.color = greenColor;
		} else {
			nbrErrors += 1;
			el.liHelpPswd[i].style.color = redColor;
		}
	}

	if (nbrErrors === 0) {
		el.inputPswd.style.color = greenColor;
		el.inputPswd.style.borderColor = greenColor;
		return true;
	} else {
		el.inputPswd.style.color = redColor;
		el.inputPswd.style.borderColor = redColor;
		return false;
	}
}

export function checkValidUsrName() {
	var testInput = el.inputUsrName.value.trim();

	if (regexUsrName.test(testInput)) {
		el.helpUsrName.style.color = greenColor;
		el.inputUsrName.style.color = greenColor;
		el.inputUsrName.style.borderColor = greenColor;
		return true;
	} else {
		el.helpUsrName.style.color = redColor;
		el.inputUsrName.style.color = redColor;
		el.inputUsrName.style.borderColor = redColor;
		return false;
	}
}

export function sendConnexion(event) {
	event.preventDefault();
	if (!connected && !isTryingToConnect && checkValidUsrName() && checkValidPassword()) {
		isTryingToConnect = true; // to be sure the user is'nt spamming connexion resquests
		tryConnexion();
	}
}

function editSendButton(text) {
	el.inputSubmit.value = text;
}

function resetStyleElems(elems) {
	for (var i = 0; i < elems.length; i++) {
		elems[i].style = '';
	}
}

function tryConnexion() {
	let xhr = new XMLHttpRequest();
	editSendButton('Connexion en cours');
	var data = new FormData(el.formLogin);
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
								el.inputSubmit.style.color = greenColor;
								el.inputSubmit.style.borderColor = greenColor;
								connected = true;
								printConnected();
								hide(el.formLogin);
								showFlex(el.defMenu);
								el.inputPswd.value = '';
								el.inputUsrName.value = '';
								resetStyleElems([el.inputPswd, el.inputUsrName, el.inputSubmit]);
								el.inputSubmit.style = '';
								editSendButton('Envoyer');
								break;
							case 0:
								if (DEBUG) console.log(response);
								editSendButton('Informations incorrectes');
								el.inputSubmit.style.color = redColor;
								el.inputSubmit.style.borderColor = redColor;
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
			} catch (error) {
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

function getAutoSave() {
	let xhr = new XMLHttpRequest();
	xhr.onreadystatechange = function () {
		if (xhr.readyState === 4 && xhr.status === 200) {
			let responseText = xhr.responseText;
			try {
				let response = JSON.parse(responseText);
				if (response.exist) {
					if (response.found) {
						hide(el.divMenu);
						showBlock(el.divGame);
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

//refaire !!
function destroySession() {
	if (confirm('Êtes-vous sûr de vouloir détruire la session ?')) {
		console.log('=== DESTRUCTION DE SESSION ===');
		fetch('PHP/destroy_session.php')
			.then((response) => response.json())
			.then((data) => {
				console.log('=== SESSION DELETE ===');
				console.log(JSON.stringify(data, null, 2));
				console.log('=============================');
				console.log('✅ Session DELETE avec succès');
			})
			.catch((error) => {
				console.error('❌ Erreur lors de la destruction de la session:', error);
			});
	}
}