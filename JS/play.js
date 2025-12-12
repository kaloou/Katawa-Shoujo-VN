function playGame() {
    let xhr = new XMLHttpRequest();
	xhr.onreadystatechange = function () {
		if (xhr.readyState === 4 && xhr.status === 200) {
			let responseText = xhr.responseText;
			try {
				let response = JSON.parse(responseText);
				if (response.connected) {
                        if (response.found) {
							loadDivGame(response.to_load);
                            playTransition(() => {
                                hide(divMenu);
                                showBlock(divGame);
                                showFlex(openEscIG);
                            });
					} else {
						if (DEBUG) console.error('pas trouvé');
						printNotConnected();
					}
				} else if (!response.connected) {
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


function loadDivGame(toLoad)
{
	switch(parseInt(toLoad.rep.type))
	{
		case 6:
			add_center_div(toLoad.centered_text);
			break;
		case 7:
			htmlDialogueInterpreter(toLoad.html)
			break;
		default:
			displayText(toLoad.text.content, toLoad.text.char_name, toLoad.text.char_color, toLoad.text.char_code);
			change_bg(toLoad.bg, true);
			if (toLoad.sprite.image_name.startsWith('ev_')) {
				handle_ev(toLoad.sprite.image_name, toLoad.sprite.image_tag, 
					toLoad.sprite.pos, toLoad.sprite.z, toLoad.sprite.width, toLoad.sprite.height, true);
			}
			else if (toLoad.sprite.image_tag === 'bg') {
				// handle problem in DB for type 3 with 'bg' tag
				change_bg(toLoad.sprite.image_name, false);
			}
			else
			{
				add_sprite(toLoad.sprite.image_name, toLoad.sprite.image_tag, 
					toLoad.sprite.pos, toLoad.sprite.z, toLoad.sprite.width, toLoad.sprite.height);
			}
			break;
	}
}

	// $_SESSION['to_save']['rep']['seqid'] = 1;
    // $_SESSION['to_save']['rep']['seqserial'] = 1;
    // $_SESSION['to_save']['rep']['type'] = 1;
    // $_SESSION['to_save']['rep']['elid'] = 1;

    // $_SESSION['to_save']['text']['char_name'] = '';
    // $_SESSION['to_save']['text']['char_color'] = '';
    // $_SESSION['to_save']['text']['content'] = '';
    // $_SESSION['to_save']['text']['char_code'] = '';

    // $_SESSION['to_save']['bg'] = '';

    // $_SESSION['to_save']['sprite']['image_name'] = '';
    // $_SESSION['to_save']['sprite']['width'] = 0;
    // $_SESSION['to_save']['sprite']['height'] = 0;
    // $_SESSION['to_save']['sprite']['image_tag'] = '';
    // $_SESSION['to_save']['sprite']['pos'] = 0;

    // $_SESSION['to_save']['sprite'] = [];

    // $_SESSION['to_save']['centered_text'] = $response['text'];

	// $_SESSION['to_save']['html'] = '';

    // $_SESSION['to_save']['music'] = $response['music_name'];