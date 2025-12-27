// Transition invisible pour fix un bug
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
			console.log('✅ init_session.php -> Session initialisée : ', response); // to fix -> no response
		} else if (xhr.readyState === 4 && xhr.status !== 200) {
			console.error("❌init_session.php -> Erreur lors de l'appel AJAX : " + xhr.statusText);
		}
	};
	xhr.send();
}

// ==================== PRELOAD IMAGES DEPUIS LE CHEMIN ===================
function preloadImagesUi() {
	preloadImage('assets/extern/UI/bg-config-gallery.png');
	preloadImage('assets/extern/UI/main/background-unsatured.png');
    preloadImage('assets/internHD/bg_op_snowywoods.png');
}
