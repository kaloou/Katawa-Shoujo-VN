document.addEventListener('DOMContentLoaded', () => {
	/*
    let regex10Char = /.{10,}/;
    let regexMin = /[]/;
    let regexMaj = /[A-Z]/;
    let regexNum = /[0-9]/;
    let regexSpeChar = /[-._!"`'#%&,:;<>=@{}~\$\(\)\*\+\/\\\?\[\]\^\|]/; // https://stackoverflow.com/a/66435604
    */
    let regexUsrName = /^[a-zA-Z0-9]{3,}$/;
	let listRegexPwd = [/.{8,}/, /[A-Z]/, /[a-z]/, /[0-9]/, /[-._!"`'#%&,:;<>=@{}~\$\(\)\*\+\/\\\?\[\]\^\|ùµ°]/];
	let regexPwd = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[-._!"`'#%&,:;<>=@{}~$()*/\\?[\]^|ùµ°]).{8,}$/;

	let connected = false;

	const connectBtn = document.getElementById('connect_button');
	const startBtn = document.getElementById('start_button');
	const divMenu = document.getElementById('menu_screen');
	const divGame = document.getElementById('game_screen');
	const defMenu = document.getElementById('default_menu');
	const formLogin = document.getElementById('login');
	const inputUsrName = document.getElementById('inp_pseudo');
    const helpUsrName = document.querySelector('#login p');
	const inputPswd = document.getElementById('inp_pswd');
	const liHelpPswd = document.querySelectorAll('#login ul>li');
	const inputSubmit = document.getElementById('inp_submit');

	inputSubmit.addEventListener('click', sendConnexion);
    formLogin.addEventListener('submit', sendConnexion);

	connectBtn.addEventListener('click', connect);

	startBtn.addEventListener('click', start);

    inputUsrName.addEventListener('keyup', checkValidUsrName);
	inputPswd.addEventListener('keyup', checkValidPassword);

	connectBtn.addEventListener('mouseenter', wantDisconnect);
	connectBtn.addEventListener('mouseleave', printConnected);

    //tryConnexion();

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
		connectBtn.textContent = 'Se Connecter';
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
		var testInput = inputPswd.value.trim();

		for (let i = 0; i < listRegexPwd.length; i++) {
			if (listRegexPwd[i].test(testInput)) {
				liHelpPswd[i].style.color = '#99B681';
			} else {
				nbrErrors += 1;
				liHelpPswd[i].style.color = '#eb243b';
			}
		}

		if (nbrErrors === 0) {
			inputPswd.style.color = '#99B681';
			inputPswd.style.borderColor = '#99B681';
			return true;
		} else {
			inputPswd.style.color = '#eb243b';
			inputPswd.style.borderColor = '#eb243b';
			return false;
		}
	}

    function checkValidUsrName() {
		var testInput = inputUsrName.value.trim();

        if (regexUsrName.test(testInput)) {
            helpUsrName.style.color = '#99B681';
            inputUsrName.style.color = '#99B681';
            inputUsrName.style.borderColor = '#99B681';
            return true;
        } else {
            helpUsrName.style.color = '#eb243b';
            inputUsrName.style.color = '#eb243b';
            inputUsrName.style.borderColor = '#eb243b';
            return false;
        }
	}

    function sendConnexion(event) {
        if(checkValidUsrName() && checkValidPassword())
        {
            inputSubmit.value = "Envoyer";

            //tryConnexion();
            formLogin.style.display = 'none';
            defMenu.style.display = 'flex';
            //formLogin.submit();
        }
        else event.preventDefault();
    }



/*

    function tryConnexion() {
        let xhr = getXHR(); // function from common.js
        xhr.onreadystatechange = function () {
            if (xhr.readyState === 4 && xhr.status === 200) {
                let responseText = xhr.responseText;

                try {
                    let response = JSON.parse(responseText);

                    if (!response.submit) {
                        if (DEBUG) console.error('Pas connecté');
                        connected = false;
                    } else if (response.submit) {
                        if (response.valid) {
                            switch (response.connexion) {
                                case "Connexion réussie":
                                    connected = true;
                                    break;
                                case "Mauvaises infos":
                                    connected = false;
                                    break;
                                default: 
                                    if (DEBUG) console.error('??? reponse.connexion ???');
                            }
                        }
                        else if (DEBUG) console.error('Données invalides');
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
        xhr.send();
    }*/
});
