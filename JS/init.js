const DEBUG = false;
// Transition invisible bug fix
const originalDuration = TRANSITION_DURATION;
TRANSITION_DURATION = 0;
playTransition(() => {
    TRANSITION_DURATION = originalDuration;
    hide(divGame);
});
window.addEventListener('load', function () {
	initGame();
	preloadImagesUi();
	preloadImagesGame();
	if (DEBUG) initTestButtons();


	//========EVENTS=======
	document.getElementById('transition').onclick = () => {};
	// MENU
	creditsBtn.addEventListener('click', () => {
		window.location.href = 'HTML/credits.html';
	});
	// GAME
	document.onkeyup = (event) => {
		pressKey(event);
	};
	divGame.onclick = () => {
		getLine();
	};
	// LOGIN
	inputSubmit.addEventListener('click', sendConnexion);
	formLogin.addEventListener('submit', sendConnexion);

	connectBtn.onclick = () => {
		openLoginForm();
	};
	startBtn.onclick = () => {
		start()
	};

	inputUsrName.addEventListener('keyup', checkValidUsrName);
	inputPswd.addEventListener('keyup', checkValidPassword);

	connectBtn.addEventListener('mouseenter', wantDisconnect);
	connectBtn.addEventListener('mouseleave', printConnected);

	isConnectedInSession();
	// OPTION
	settingsBtn.addEventListener('click', toggleOptionsMenu);
	creditsBtn.addEventListener('click', () => {
		window.location.href = 'HTML/credits.html';
	});
	// ESCAPE
	quitEscBtn.addEventListener('click', () => {
		toggleEscape();
	});

	hideBtn.addEventListener('click', hideButton);
	returnBtn.addEventListener('click', returnToMenuAndSave);

	openEscIG.onclick = () => {
		toggleEscape();
	};
	// SAVE
	addListenerForReset();
	saveBtn.addEventListener('click', () => {
		clickOnSave(1);
	});
	loadBtn.addEventListener('click', () => {
		clickOnSave(2);
	});
	closeSaveBtn.addEventListener('click', () => {
		clickOnSave(0);
	});
	resetAutoSaveBtn.addEventListener('click', () => {
		resetAutoSave();
	});
	// CONFIRM
	cancelBtnForCfrm.onclick = () => {
		closeConfirmDiv()
	};
	inputForConfirm.addEventListener('keyup', checkValidTitleForSave);
});

function initGame() {
	let xhr = new XMLHttpRequest();
	xhr.open('GET', 'PHP/init_session.php', true);
	xhr.onreadystatechange = function () {
		if (xhr.readyState === 4 && xhr.status === 200) {
			let response = xhr.responseText;
            if (DEBUG) console.log('✅ init_session.php -> Session initialisée : ', response); // to fix -> no response
		} else if (xhr.readyState === 4 && xhr.status !== 200) {
            if (DEBUG) console.error("❌init_session.php -> Erreur lors de l'appel AJAX : " + xhr.statusText);
		}
	};
	xhr.send();
}

// ==================== DEBUG TEST DE SESSION ===================
function getSession() {
    if (DEBUG) console.log('=== TEST DE SESSION ===');
	fetch('DEBUG/get_session.php')
		.then((response) => response.json())
		.then((data) => {
            if (DEBUG) console.log('=== DONNÉES DE SESSION ===');
            if (DEBUG) console.log(JSON.stringify(data, null, 2));
            if (DEBUG) console.log('========================');

			// Vérifier si la session est vide
			if (Object.keys(data).length === 0) {
                if (DEBUG) console.warn('⚠️ SESSION VIDE - Aucune donnée de session trouvée');
			} else {
                if (DEBUG) console.log('✅ Session active avec', Object.keys(data).length, 'propriétés');
			}
		})
		.catch((error) => {
            if (DEBUG) console.error('❌ Erreur lors de la récupération de la session:', error);
		});
}

function destroySession() {
	if (confirm('Êtes-vous sûr de vouloir détruire la session ?')) {
        if (DEBUG) console.log('=== DESTRUCTION DE SESSION ===');
		fetch('PHP/destroy_session.php')
			.then((response) => response.json())
			.then((data) => {
                if (DEBUG) {
                    console.log('=== SESSION DELETE ===');
                    console.log(JSON.stringify(data, null, 2));
                    console.log('=============================');
                    console.log('✅ Session DELETE avec succès');
                }
			})
			.catch((error) => {
                if (DEBUG) console.error('❌ Erreur lors de la destruction de la session:', error);
			});
	}
}

function initSession() {
    if (DEBUG) console.log('=== INITIALISATION MANUELLE DE SESSION ===');
	fetch('PHP/init_session.php')
		.then((response) => response.text())
		.then((data) => {
            if (DEBUG) console.log('✅ Session initialisée manuellement');
		})
		.catch((error) => {
            if (DEBUG) console.error("❌ Erreur lors de l'initialisation:", error);
		});
}

function initTestButtons() {
	// --- 1️⃣ Injection du HTML dans le body ---
	const html = `
		<div id="session_buttons_container" style="
			position: fixed;
			top: 20px;
			right: 20px;
			z-index: 1000;
			display: flex;
			gap: 10px;
		">
			<button id="test_session_btn" style="
				background: #ff6b6b;
				color: white;
				border: none;
				padding: 10px 15px;
				border-radius: 6px;
				font-size: 14px;
				font-weight: bold;
				cursor: pointer;
				box-shadow: 0 2px 6px rgba(0,0,0,0.3);
			">Test Session</button>
			<button id="reset_session_btn" style="
				background: #ff4757;
				color: white;
				border: none;
				padding: 10px 15px;
				border-radius: 6px;
				font-size: 14px;
				font-weight: bold;
				cursor: pointer;
				box-shadow: 0 2px 6px rgba(0,0,0,0.3);
			">Reset Session</button>
		</div>
	`;

	// Vérifie si le conteneur n'existe pas déjà pour éviter les doublons
	if (!sessionButtonsContainer) {
		document.body.insertAdjacentHTML('beforeend', html);
        if (DEBUG) console.log('✅ Boutons de test ajoutés au DOM');
		// Les éléments seront disponibles après le rendu.
		const sessionContainer = document.getElementById('session_buttons_container');
		const testBtn = document.getElementById('test_session_btn');
		const resetBtn = document.getElementById('reset_session_btn');

		// --- 2️⃣ Attachement des événements ---
		if (testBtn) {
			testBtn.addEventListener('click', getSession);
			console.log('✅ Bouton Test Session initialisé');
		} else {
			console.warn('⚠️ Bouton test_session_btn non trouvé');
		}

		if (resetBtn) {
			resetBtn.addEventListener('click', destroySession);
			console.log('✅ Bouton Reset Session initialisé');
		} else {
			console.warn('⚠️ Bouton reset_session_btn non trouvé');
		}
	} else {
		// --- 2️⃣ Attachement des événements ---
		const testBtn = testSessionBtn;
		if (testBtn) {
			testBtn.addEventListener('click', getSession);
			console.log('✅ Bouton Test Session initialisé');
		} else {
			console.warn('⚠️ Bouton test_session_btn non trouvé');
		}

		const resetBtn = resetSessionBtn;
		if (resetBtn) {
			resetBtn.addEventListener('click', destroySession);
			console.log('✅ Bouton Reset Session initialisé');
		} else {
			console.warn('⚠️ Bouton reset_session_btn non trouvé');
		}
	}

	// --- 3️⃣ Optionnel : Test auto si DEBUG actif ---
	if (typeof DEBUG !== 'undefined' && DEBUG) {
		setTimeout(() => {
			console.log('🔍 MODE DEBUG ACTIVÉ — Test automatique de session...');
			getSession();
		}, 1000);
	}
}

// ==================== PRELOAD IMAGES FROM PATHS ===================
function preloadImagesUi() {
	preloadImage('assets/extern/UI/bg-config-gallery.png');
	preloadImage('assets/extern/UI/main/background-unsatured.png');
    preloadImage('assets/internHD/bg_op_snowywoods.png');
}
