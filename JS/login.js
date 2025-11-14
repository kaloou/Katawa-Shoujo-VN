document.addEventListener('DOMContentLoaded', () => {
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

	connectBtn.addEventListener('click', connect);

	startBtn.addEventListener('click', start);

    inputUsrName.addEventListener('keyup', checkValidUsrName);
	inputPswd.addEventListener('keyup', checkValidPassword);

	connectBtn.addEventListener('mouseenter', wantDisconnect);
	connectBtn.addEventListener('mouseleave', printConnected);
});

let connectBtn, startBtn, defMenu, formLogin, inputUsrName, helpUsrName, inputPswd, liHelpPswd, inputSubmit;

/*
let regex10Char = /.{10,}/;
let regexMin = /[]/;
let regexMaj = /[A-Z]/;
let regexNum = /[0-9]/;
let regexSpeChar = /[-._!"`'#%&,:;<>=@{}~\$\(\)\*\+\/\\\?\[\]\^\|]/; // https://stackoverflow.com/a/66435604
*/
let regexUsrName = /^[a-zA-Z0-9]{3,15}$/;
let listRegexPwd = [/^.{8,25}$/, /[A-Z]/, /[a-z]/, /[0-9]/, /[-._!"`'#%&,:;<>=@{}~\$\(\)\*\+\/\\\?\[\]\^\|]/u];
//let regexPwd = /^[-A-Za-z0-9,?;.:/=+~ù%´µ£`^¨\[$*\]&|é@"#'(§^è!ç{à)°_}]{8,25}$/u;

let greenColor = "#99B681"; 			//2c9e31 or 99B681
let redColor = "#eb243b";
let pinkColor = "#FF8D7C";

let connected = false;

function connect() {
	if (!connected) {
		formLogin.style.display = 'flex';
		defMenu.style.display = 'none';
	}
}

function disconnect() {
	if (connected) {
		connected = false;
		notConnected();
		destroySession();
		connectBtn.removeEventListener('click', disconnect);
	}
}

function start() {
	if (connected) {
		divMenu.style.display = 'none';
		divGame.style.display = 'block';
	} else {
		notConnected();
	}
}

function notConnected() {
	connectBtn.textContent = 'Se Connecter';
	connectBtn.style.boxShadow = '0px 0px 0px 0.08vw '+ redColor; // code couleur : https://katawashoujo.fandom.com/wiki/Main_Page/Characters
	connectBtn.style.backgroundColor = redColor;
}

function printConnected() {
	if (connected) {
		connectBtn.textContent = 'Vous êtes connecté';
		connectBtn.style.boxShadow = '0px 0px 0px 0.08vw ' + greenColor;
		connectBtn.style.backgroundColor = greenColor;
	}
}

function wantDisconnect() {
	if (connected) {
		connectBtn.addEventListener('click', disconnect);
		connectBtn.textContent = 'Se déconnecter ?';
		connectBtn.style.boxShadow = '0px 0px 0px 0.08vw ' + pinkColor;
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

function sendConnexion(event) {
	event.preventDefault();
	if(checkValidUsrName() && checkValidPassword())
	{
		tryConnexion();
	}
}

function editSendButton(text) {
	inputSubmit.value = text;
}

function resetStyleElems(elems) {
    for(let i=0 ; i < elems.length ; i++)
    {
        elems[i].style = " ";
    }
}

function tryConnexion() {
	let xhr = getXHR(); // function from common.js
	var data = new FormData(formLogin);
	data.append("inp_submit", "Envoyer"); //car FormData ne contient pas le submit
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
								editSendButton("Connexion réussie");
                                inputSubmit.style.color = greenColor;
                                inputSubmit.style.borderColor = greenColor;
								connected = true;
								printConnected();
								formLogin.style.display = 'none';
								defMenu.style.display = 'flex';
								inputPswd.value = "";
                                inputUsrName.value = "";
                                resetStyleElems([inputPswd, inputUsrName, inputSubmit]);
                                inputSubmit.style = "";
								editSendButton("Envoyer");
								break;
							case 0:
								if (DEBUG) console.log(response);
								editSendButton("Informations incorrectes");
                                inputSubmit.style.color = redColor;
                                inputSubmit.style.borderColor = redColor;
								connected = false;
								break;
							default: 
								if (DEBUG) console.error('??? reponse.connexion ???');
						}
					}
					else {
						if (DEBUG) console.error('Données invalides');
						editSendButton("Unvalid datas");
					}
				}
				else if (!response.submit) {
					if (DEBUG) console.log(response);
					connected = false;
				} 
			} catch (error) {
				if (DEBUG) {
					console.error('Erreur lors du parsing JSON:', error);
					console.error('Réponse reçue:', responseText);
				}
			}
		}
	};
	xhr.open('POST', 'PHP/login.php', true);
	xhr.responseType = "text";
	xhr.send(data);
}
