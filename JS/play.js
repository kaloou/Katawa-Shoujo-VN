function playGame() {
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
	xhr.open('GET', 'PHP/play.php', true);
	xhr.responseType = 'text';
	xhr.send();
}