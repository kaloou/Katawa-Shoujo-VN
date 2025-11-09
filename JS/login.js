document.addEventListener('DOMContentLoaded', () => {
	/*
    let regex10Char = /.{10,}/;
    let regexMin = /[]/;
    let regexMaj = /[A-Z]/;
    let regexNum = /[0-9]/;
    let regexSpeChar = /[-._!"`'#%&,:;<>=@{}~\$\(\)\*\+\/\\\?\[\]\^\|]/; // https://stackoverflow.com/a/66435604
    */

	let listRegex = [/.{10,}/, /[A-Z]/, /[a-z]/, /[0-9]/, /[-._!"`'#%&,:;<>=@{}~\$\(\)\*\+\/\\\?\[\]\^\|°]/];
	let regexPwd = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[-._!"`'#%&,:;<>=@{}~$()*/\\?[\]^|°]).{10,}$/;

	let connected = false;

	const connectBtn = document.getElementById('connect_button');
	const startBtn = document.getElementById('start_button');
	const divMenu = document.getElementById('menu_screen');
	const divGame = document.getElementById('game_screen');
	const defMenu = document.getElementById('default_menu');
	const formLogin = document.getElementById('login');
	const inputUsrName = document.getElementById('inp_usr');
	const inputPswd = document.getElementById('inp_pswd');
	const liIndicePswd = document.querySelectorAll('#login ul>li');
	const inputSubmit = document.getElementById('inp_submit');

	inputSubmit.addEventListener('click', (event) => {
		event.preventDefault();
		if (regexPwd.test(inputPswd.value.trim())) {
			// ne doit pas se trouver ici mais c'est temporaire
			formLogin.style.display = 'none';
			defMenu.style.display = 'flex';
		}
	}); // juste ça fait bugger live server

	connectBtn.addEventListener('click', connect);

	startBtn.addEventListener('click', start);

	inputPswd.addEventListener('keyup', checkValidPassword);

	connectBtn.addEventListener('mouseenter', wantDisconnect);
	connectBtn.addEventListener('mouseleave', printConnected);

	function connect() {
		if (!connected) {
			formLogin.style.display = 'flex';
			defMenu.style.display = 'none';
			connected = true;
			printConnected();
		}
	}

	function disconnect() {
		if (connected) {
			connected = false;
			notConnected();
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
		connectBtn.textContent = 'Se connecter';
		connectBtn.style.boxShadow = '0px 0px 0px 0.08vw #eb243b'; // code couleur : https://katawashoujo.fandom.com/wiki/Main_Page/Characters
		connectBtn.style.backgroundColor = '#eb243b';
	}

	function printConnected() {
		if (connected) {
			connectBtn.textContent = 'Vous êtes connecté';
			connectBtn.style.boxShadow = '0px 0px 0px 0.08vw #99B681';
			connectBtn.style.backgroundColor = '#99B681';
			//2c9e31
			//99B681
		}
	}

	function wantDisconnect() {
		if (connected) {
			connectBtn.addEventListener('click', disconnect);
			connectBtn.textContent = 'Se déconnecter ?';
			connectBtn.style.boxShadow = '0px 0px 0px 0.08vw #FF8D7C';
			connectBtn.style.backgroundColor = '#FF8D7C';
		}
	}

	function checkValidPassword() {
		var nbrErrors = 0;
		text_input = inputPswd.value.trim();

		for (let i = 0; i < listRegex.length; i++) {
			if (listRegex[i].test(text_input)) {
				liIndicePswd[i].style.color = '#99B681';
			} else {
				nbrErrors += 1;
				liIndicePswd[i].style.color = '#eb243b';
			}
		}

		if (nbrErrors == 0) {
			// envoyer text_input avec XML HTTP REQUEST
			inputPswd.style.color = '#99B681';
			inputPswd.style.borderColor = '#99B681';
			return true;
		} else {
			inputPswd.style.color = '#eb243b';
			inputPswd.style.borderColor = '#eb243b';
			return false;
		}
	}
});
