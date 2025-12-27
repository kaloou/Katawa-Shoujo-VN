let isTextLoading = false;
let currentMusic = null;
let musicFadeInterval = null;
let globalMusicVolume = 0.75;
let isQcmactive = false;
let isHidingText = false;

// document.onkeyup = (event) => {
// 	pressKey(event);
// };

//==========KEY PRESS Fonction==========
function pressKey(event) {
	event.preventDefault();
	if (isDisplay(divGame)) {
		if (event.key === 'Escape') {
			toggleEscape();
		} else if ((event.key === ' ' || event.key === 'ArrowRight' || event.key === 'Enter') && !isDisplay(divEscape)) {
			getLine();
		} else if (event.key.toLowerCase() === 'f') {
			fullScreen();
		}
	}
}

function fullScreen() {
	if (!document.fullscreenElement) {
		document.documentElement.requestFullscreen();
	} else {
		document.exitFullscreen();
	}
}

function toggleEscape() {
	if (isDisplay(divGame) && isDisplay(divEscape)) {
		hide(divEscape);
		noFilter(divMenu);
		noFilter(divGame);
		divGame.onclick = () => {
			getLine();
		};
		document.onkeyup = (event) => {
			pressKey(event);
		};
	} else {
		showFlex(divEscape);
		blurF(divMenu);
		blurF(divGame);
		divGame.onclick = '';
		document.onkeyup = (event) => {
			pressKey(event);
		};
	}
}

function hideButton() {
	isHidingText = true;
	hide(divEscape);
	noFilter(divMenu);
	noFilter(divGame);
	hide(dialogContener);
	hide(centeredText);
	hide(textOverlay);
	hide(openEscIG);
	document.onkeyup = () => {
		showDialog();
	};
	divGame.onclick = () => {
		showDialog();
	};
}

function showDialog() {
	isHidingText = false;
	showBlock(dialogContener);
	showBlock(centeredText);
	showBlock(textOverlay);
	showBlock(openEscIG);
	divGame.onclick = () => {
		getLine();
	};
	document.onkeyup = (event) => {
		pressKey(event);
	};
}

function getLine() {
	textElement.classList.add('wait');
	if (!isTextLoading) {
		isTextLoading = true;
		textElement.classList.remove('wait');
		let xhr = new XMLHttpRequest();
		xhr.onreadystatechange = function () {
			if (xhr.readyState === 4 && xhr.status === 200) {
				let responseText = xhr.responseText;
				try {
					let response = JSON.parse(responseText);

					if (response.type === 'error') {
						if (DEBUG) console.error('Une erreur est survenue:', response.message);
					} else if (response.type === 'end') {
						if (DEBUG) console.log('Fin de la séquence, redémarrage...');
						isTextLoading = false;
						getLine();
					} else {
						if (response.seqserial === 1) {
							preloadImagesGame();
						}
						update_dialogue(response);
					}
				} catch (error) {
					if (DEBUG) console.error('Erreur lors du parsing JSON:' + error + '\nRéponse reçue:' + responseText);
				}
				isTextLoading = false;
				xhr = null;
			}
		};
		xhr.open('GET', 'PHP/get_line.php', true);
		xhr.send();
	} else {
		if (DEBUG) console.log('attend');
	}
}

function update_dialogue(response) {
	let type = response.type;
	if (typeof type === 'string' && !isNaN(parseInt(type))) {
		type = parseInt(type);
	}

	const content = response.text || '';
	const pos = response.pos || 0;
	const z = response.z || 0;
	const image_name = response.image_name || '';
	const character_name = response.character_name || '';
	const character_color = response.character_color || '';
	const character_code = response.character_code || '';
	const image_tag = response.image_tag || '';
	const width = response.width || 0;
	const height = response.height || 0;
	const music_name = response.music_name || '';

	switch (type) {
		case 1: // type 1 -> text
			// Gestion of music with pos and z...
			if (pos === 7) {
				play_music(music_name);
				setTimeout(() => getLine(), 0);
			} else if (pos === 8) {
				stop_music(z);
				setTimeout(() => getLine(), 0);
			} else {
				displayText(content, character_name, character_color, character_code);
			}
			break;
		case 2: // type 2 -> image (bg)
			if (image_name.startsWith('ev_')) {
				handle_ev(image_name, image_tag, pos, z, width, height, true);
			} else {
				change_bg(image_name, true);
				setTimeout(() => getLine(), 0);
			}
			break;
		case 3: // type 3 -> sprite
			if (image_tag === 'bg') {
				// Regle le problème des background type 3 de la bd
				change_bg(image_name, false);
				setTimeout(() => getLine(), 400);
			} else {
				// pour l'animation heartattack ou ev
				if (add_sprite(image_name, image_tag, pos, z, width, height)) {
					setTimeout(() => getLine(), 0);
				}
			}
			break;
		case 4: // type 4 -> supprime sprite
			remove_sprite(image_tag);
			setTimeout(() => getLine(), 0);
			break;
		case 5: //type 5
			add_center_div(content);
			break;
		case 6: // type 6 -> HTML interpreter
			htmlDialogueInterpreter(response.html);
			break;
		case 7: // type 7 -> QCM
			displayQCM(response);
			break;
		case 'game_end': // Fin du jeu
			displayGameEnd(response.ending_name);
			break;
		default:
			if (DEBUG) console.log("Type non géré pour l'instant : " + type);
			setTimeout(() => getLine(), 0);
			break;
	}

	if (DEBUG) {
		console.log(response);
	}
}

//==== TYPE 1 FUNCTIONS ==================================
function displayText(content, characterName = '', characterColor = '', character_code = '') {
	// cas spécial sequence 1 overlay noir
	if (character_code === 'overlay') {
		hideTextBox();
		showOverlayText(content);
		return;
	}
	// on supprime un éventuel ancien texte centré type 5 ou overlay text
	hideOverlayText();
	hideCenteredText();

	// Cas personnage qui parle
	if (characterName && characterColor && characterName !== '') {
		showNameBox(characterName, characterColor);
	} else {
		// narrateur
		hideNameBox();
	}

	// affichage du texte
	showTextBox(content);
}

//==== TYPE 2 FUNCTIONS ==================================
function change_bg(img_name, reset) {
	if (reset) {
		hideTextBox();
		hideNameBox();
		reset_sprite_stack(); // Reset immédiatement, avant la transition

		const bgTransition = document.getElementById('bg_transition');

		// Préparer le nouveau background
		bgTransition.style.backgroundImage = `url("assets/internHD/${img_name}")`;
		bgTransition.style.opacity = 1;

		// Après la transition, swap
		setTimeout(() => {
			divGame.style.backgroundImage = `url("assets/internHD/${img_name}")`;
			bgTransition.style.opacity = 0;
		}, 300);
	} else {
		divGame.style.backgroundImage = `url("assets/internHD/${img_name}")`;
	}
}

function reset_sprite_stack() {
	spriteStack.innerHTML = '';
}

function handle_ev(image_name, animation_tag, pos, z, width, height, is_background) {
	hideTextBox();
	hideNameBox();
	if (DEBUG) console.log(animation_tag);
	if (is_background) {
		reset_sprite_stack();
	}

	// Choisir l'animation selon le tag
	if (animation_tag === 'slide') {
		handle_ev_slide(image_name, pos, z, width, height, is_background);
	} else {
		// Par défaut : dézoom (si tag vide '' ou non reconnu)
		handle_ev_dezoom_animation(image_name, pos, z, width, height, is_background);
	}
}

function handle_ev_dezoom_animation(image_name, pos, z, width, height, is_background) {
	let evDiv = document.createElement('div');
	evDiv.style.backgroundImage = `url("assets/internHD/${image_name}")`;
	evDiv.style.backgroundSize = 'cover';
	evDiv.style.backgroundRepeat = 'no-repeat';
	evDiv.style.backgroundPosition = 'center';
	evDiv.style.width = '100%';
	evDiv.style.height = '100%';
	evDiv.style.position = 'absolute';
	evDiv.style.top = '0';
	evDiv.style.left = '0';
	evDiv.style.zIndex = is_background ? '0' : z;
	evDiv.style.transform = 'scale(1.3)';

	if (is_background) {
		divGame.insertBefore(evDiv, divGame.firstChild);
	} else {
		evDiv.className = 'sprite';
		evDiv.dataset.tag = 'ev_temp';
		evDiv.dataset.pos = pos;
		evDiv.dataset.z = z;
		spriteStack.appendChild(evDiv);
	}

	requestAnimationFrame(() => {
		setTimeout(() => {
			const animation = evDiv.animate([{transform: 'scale(1.3)'}, {transform: 'scale(1)'}], {
				duration: 3000,
				easing: 'ease-out',
				fill: 'forwards'
			});

			animation.finished.then(() => {
				if (is_background) {
					divGame.style.backgroundImage = `url("assets/internHD/${image_name}")`;
					evDiv.remove();
				}
				setTimeout(() => getLine(), 0);
			});
		}, 100);
	});
}

function handle_ev_slide(image_name, pos, z, width, height, is_background) {
	let evDiv = document.createElement('div');
	evDiv.style.backgroundImage = `url("assets/internHD/${image_name}")`;
	evDiv.style.backgroundSize = 'cover';
	evDiv.style.backgroundRepeat = 'no-repeat';
	evDiv.style.backgroundPosition = 'left center'; // Commence à gauche
	evDiv.style.width = '100%';
	evDiv.style.height = '100%';
	evDiv.style.position = 'absolute';
	evDiv.style.top = '0';
	evDiv.style.left = '0';
	evDiv.style.zIndex = is_background ? '0' : z;

	if (is_background) {
		divGame.insertBefore(evDiv, divGame.firstChild);
	} else {
		evDiv.className = 'sprite';
		evDiv.dataset.tag = 'ev_temp';
		evDiv.dataset.pos = pos;
		evDiv.dataset.z = z;
		spriteStack.appendChild(evDiv);
	}

	requestAnimationFrame(() => {
		setTimeout(() => {
			const animation = evDiv.animate([{backgroundPosition: 'left center'}, {backgroundPosition: 'right center'}], {
				duration: 20000, // 5 secondes pour un slide lent
				easing: 'ease-in-out',
				fill: 'forwards'
			});

			animation.finished.then(() => {
				if (is_background) {
					divGame.style.backgroundImage = `url("assets/internHD/${image_name}")`;
					divGame.style.backgroundPosition = 'right center';
					evDiv.remove();
				}
				setTimeout(() => getLine(), 0);
			});
		}, 100);
	});
}

//==== TYPE 3 FUNCTIONS ==================================
// Fonctions pour passer d'un format spécifique à la taille de l'écran
function convert_x_on_current_format(x) {
	const ORIGINAL_WIDTH = 800;
	const currentWidth = divGame.offsetWidth;
	let ratio = currentWidth / ORIGINAL_WIDTH;
	return x * ratio;
}

function convert_x_on_current_format_hd(x) {
	const HD_WIDTH = 1920;
	const currentWidth = divGame.offsetWidth;
	const ratio = currentWidth / HD_WIDTH;
	return x * ratio;
}
function convert_y_on_current_format_hd(y) {
	const HD_HEIGHT = 1080;
	const currentHeight = divGame.offsetHeight;
	const ratio = currentHeight / HD_HEIGHT;
	return y * ratio;
}

function add_sprite(image_name, image_tag, pos, z, width, height) {
	// Cas particuiliers :
	if (image_tag === 'heartattack') {
		handle_heartattack(image_name, image_tag, pos, z, width, height);
		return false; // logique pour ne pas appeller directement getline
	}

	// ev_* images avec une animation
	if (image_name.startsWith('ev_')) {
		handle_ev(image_name, image_tag, pos, z, width, height, false);
		return false; // logique pour ne pas appeller directement getline
	}

	let spriteImg = document.createElement('div');
	spriteImg.style.backgroundImage = `url("assets/internHD/${image_name}")`;
	spriteImg.className = 'sprite';
	spriteImg.dataset.tag = image_tag;
	spriteImg.dataset.pos = pos;
	spriteImg.dataset.z = z;
	spriteImg.style.zIndex = z;
	spriteImg.style.backgroundRepeat = 'no-repeat';
	spriteImg.style.backgroundPosition = 'center';

	// Fix Sprites en plein écran (1920x1080) met en cover mode
	const isFullscreenSprite = width >= 1920 && height >= 1080;

	if (isFullscreenSprite) {
		spriteImg.style.backgroundSize = 'cover';
		spriteImg.style.width = '100%';
		spriteImg.style.height = '100%';
		spriteImg.style.left = convert_x_on_current_format(pos) + 'px';
	} else {
		spriteImg.style.backgroundSize = 'contain';

		let convertedX;
		if (pos === 800) {
			const baseX = 750;
			convertedX = convert_x_on_current_format(baseX);
		} else if (pos > 800) {
			// Si pos > 800, convertir 800 puis convertir le reste et additionner
			const baseX = 800;
			const remainderX = pos - 800;
			convertedX = convert_x_on_current_format(baseX) + convert_x_on_current_format(remainderX);
		} else {
			convertedX = convert_x_on_current_format(pos);
		}

		spriteImg.style.left = convertedX + 'px';
		spriteImg.style.bottom = '0';

		// dimensions
		spriteImg.style.width = (width > 0 ? width : 200) + 'px';
		spriteImg.style.height = (height > 0 ? height : 200) + 'px';
	}

	let existingSprite = spriteStack.querySelector(`div[data-tag="${image_tag}"]`);

	if (existingSprite) {
		// transition du sprite s'il y en a déjà un autre
		const oldPos = parseFloat(existingSprite.dataset.pos);
		const newPos = parseFloat(pos);

		// pas de transition pour les sprites plein écran ou si même position
		if (oldPos !== newPos && !isFullscreenSprite) {
			const newLeft = parseFloat(spriteImg.style.left);

			existingSprite.style.backgroundImage = spriteImg.style.backgroundImage;
			existingSprite.dataset.pos = pos;
			existingSprite.dataset.z = z;
			existingSprite.style.zIndex = z;
			existingSprite.style.width = spriteImg.style.width;
			existingSprite.style.height = spriteImg.style.height;

			existingSprite.style.transition = 'left 0.5s ease-in-out';

			existingSprite.style.left = newLeft + 'px';

			setTimeout(() => {
				existingSprite.style.transition = '';
			}, 500);
		} else {
			spriteImg.style.opacity = '0';
			spriteImg.classList.add('sprite-fade-in');
			existingSprite.replaceWith(spriteImg);
		}
	} else {
		spriteImg.style.opacity = '0';
		spriteImg.classList.add('sprite-fade-in');
		spriteStack.appendChild(spriteImg);
	}

	return true; // Pas d'animation, sprite ajouté immédiatement
}

function handle_heartattack(image_name, image_tag, pos, z, width) {
	hideTextBox();
	hideNameBox();

	let heart = document.createElement('div');
	heart.style.backgroundImage = `url("assets/internHD/${image_name}")`;
	heart.className = 'sprite heart-flash';
	heart.dataset.tag = image_tag;
	heart.dataset.pos = pos;
	heart.dataset.z = z;
	heart.style.zIndex = z;
	heart.style.backgroundSize = 'cover';
	heart.style.backgroundRepeat = 'no-repeat';
	heart.style.opacity = '0.2';

	const originalX = pos % 800;
	const convertedX = convert_x_on_current_format(originalX);

	heart.style.left = convertedX - convert_x_on_current_format_hd(width) / 2 + 'px';
	heart.style.bottom = '0';
	heart.style.width = divGame.offsetWidth + 'px';
	heart.style.height = divGame.offsetHeight + 'px';

	// --- dégradé horizontal (centre opaque → côtés transparents) ---
	heart.style.maskImage =
		'linear-gradient(to right, transparent 0%, rgba(0,0,0,1) 25%, rgba(0,0,0,1) 75%, transparent 100%)';
	heart.style.webkitMaskImage =
		'linear-gradient(to right, transparent 0%, rgba(0,0,0,1) 25%, rgba(0,0,0,1) 75%, transparent 100%)';
	heart.style.maskMode = 'alpha';
	heart.style.webkitMaskMode = 'alpha';

	// Si un sprite du même tag existe déjà → le remplacer
	let existing = spriteStack.querySelector(`div[data-tag="${image_tag}"]`);
	if (existing) existing.replaceWith(heart);
	else spriteStack.appendChild(heart);

	// requestAnimationFrame pour s'assurer que l'élément est rendu
	requestAnimationFrame(() => {
		setTimeout(() => {
			const animation = heart.animate(
				[
					{opacity: 0.2, transform: 'scale(0.95)'},
					{opacity: 0.3, transform: 'scale(1.1)'},
					{opacity: 0.2, transform: 'scale(1)'}
				],
				{
					duration: 600,
					easing: 'ease-in-out'
				}
			);

			animation.finished.then(() => {
				setTimeout(() => getLine(), 0);
			});
		}, 200);
	});
}

//==== TYPE 4 FUNCTIONS ==================================
function remove_sprite(image_tag) {
	let spriteToRemove = spriteStack.querySelector(`div[data-tag="${image_tag}"]`);
	if (spriteToRemove) {
		spriteToRemove.remove();
	}
}

//==== TYPE 5 ==================================
function add_center_div(content) {
	hideTextBox();
	hideNameBox();

	showCenteredText(content);
}
//==== TYPE 6 ==================================

function htmlDialogueInterpreter(html_string) {
	hideNameBox();
	hideOverlayText();
	hideCenteredText();

	showFlex(textElement);
	textElement.style.opacity = '1';

	// Insère le HTML directement
	textElement.innerHTML = html_string;

	triggerLogoEffect(textElement);
}
//==== MUSIQUE ==================================
function play_music(music_name) {
	if (!music_name || music_name === '') {
		if (DEBUG) console.error('Nom de musique invalide');
		return;
	}

	if (currentMusic) {
		currentMusic.pause();
		currentMusic.currentTime = 0;
	}

	currentMusic = new Audio(`assets/extern/bgm_mp3/${music_name}`);
	currentMusic.loop = true;
	currentMusic.volume = globalMusicVolume;

	currentMusic.play().catch((error) => {
		if (DEBUG) console.error('Erreur lors de la lecture de la musique:', error);
	});

	if (DEBUG) console.log('Musique lancée:', music_name);
}

function stop_music(fadeout_seconds) {
	if (!currentMusic) {
		if (DEBUG) console.log('Aucune musique à arrêter');
		return;
	}

	if (musicFadeInterval) {
		clearInterval(musicFadeInterval);
		musicFadeInterval = null;
	}

	if (fadeout_seconds === 0) {
		currentMusic.pause();
		currentMusic.currentTime = 0;
		currentMusic = null;
		if (DEBUG) console.log('Musique arrêtée instantanément');
		return;
	}

	const fadeStep = currentMusic.volume / (fadeout_seconds * 20); // 20 steps par seconde
	musicFadeInterval = setInterval(() => {
		if (currentMusic.volume > fadeStep) {
			currentMusic.volume -= fadeStep;
		} else {
			currentMusic.volume = 0;
			currentMusic.pause();
			currentMusic.currentTime = 0;
			currentMusic = null;
			clearInterval(musicFadeInterval);
			musicFadeInterval = null;
			if (DEBUG) console.log('Musique arrêtée avec fadeout');
		}
	}, 50);
}

//==== UTILITY FUNCTIONS ==================================
//==== UI HELPERS (affichage texte / name / centered) ==================

// text box -> type 1 normal
// centeredText -> type 5 (note papier)
// overlaytext -> overlay debut de jeu

//==== ANIMATION D'APPARITION DU TEXTE ==================
function animateText(element, content, callback) {
	const speed = textDisplaySpeed ?? 90;

	// Si vitesse au max (100), affichage instantané
	if (speed >= 100) {
		element.innerHTML = `<span>${content}</span>`;
		if (callback) {
			callback();
		}
		return;
	}

	const delay = (101 - speed) / 2;

	element.innerHTML = '<span></span>';
	const span = element.querySelector('span');

	let i = 0;
	function addChar() {
		if (i < content.length) {
			span.textContent += content[i];
			i++;
			setTimeout(addChar, delay);
		} else if (callback) {
			callback();
		}
	}
	addChar();
}

function showNameBox(characterName, characterColor = '#ffffff') {
	showFlex(nameElement);
	nameElement.innerHTML = `<span style="color: ${characterColor};">${characterName}</span>`;
	nameElement.style.opacity = '1';
}

function hideNameBox() {
	hide(nameElement);
	nameElement.innerHTML = '';
	nameElement.style.opacity = '0';
}

function showTextBox(content) {
	showFlex(textElement);
	textElement.style.opacity = '1';

	animateText(textElement, content, () => {
		triggerLogoEffect(textElement);
	});
}

function hideTextBox() {
	textElement.classList.remove('blink', 'pop');
	hide(textElement);
	textElement.innerHTML = '';
	textElement.style.opacity = '0';
}

function showCenteredText(content) {
	showFlex(centeredText);
	centeredText.style.opacity = '1';

	animateText(centeredText, content);
}

function hideCenteredText() {
	hide(centeredText);
	centeredText.innerHTML = '';
	centeredText.style.opacity = '0';
}

let cpt = 0;
function showOverlayText(content) {
	cpt++;
	if (cpt > 7) {
		textOverlay.innerHTML = '';
		cpt = 1;
	}

	showFlex(textOverlay);
	textOverlay.style.opacity = '0.7';

	const newLine = document.createElement('br');
	const newSpan = document.createElement('span');
	textOverlay.appendChild(newLine);
	textOverlay.appendChild(newSpan);

	const speed = textDisplaySpeed ?? 90;

	// Si vitesse au max (100), affichage instantané
	if (speed >= 100) {
		newSpan.textContent = content;
		triggerLogoEffect(textOverlay, 'pop2');
		return;
	}

	const delay = (101 - speed) / 2;

	let i = 0;
	function addChar() {
		if (i < content.length) {
			newSpan.textContent += content[i];
			i++;
			setTimeout(addChar, delay);
		} else {
			triggerLogoEffect(textOverlay, 'pop2');
		}
	}

	addChar();
}

function hideOverlayText() {
	textOverlay.classList.remove('blink', 'pop2');
	hide(textOverlay);
	textOverlay.innerHTML = '';
	textOverlay.style.opacity = '0';
	cpt = 0;
}

//======================================

function triggerLogoEffect(element, animationClass = 'pop') {
	element.classList.remove('blink', 'pop', 'pop2', 'wait');

	element.classList.add(animationClass, 'blink');

	setTimeout(() => {
		element.classList.remove(animationClass);
		void element.offsetWidth;
		element.classList.add('blink');
	}, 300);
}

function displayQCM(qcm_data) {
	isQcmactive = true;
	hideTextBox();
	hideOverlayText();
	hideCenteredText();

	if (qcm_data.character_name && qcm_data.character_color) {
		showNameBox(qcm_data.character_name, qcm_data.character_color);
	} else {
		hideNameBox();
	}

	hide(openEscIG);
	window.onbeforeunload = '';

	const qcmContainer = document.createElement('div');
	qcmContainer.id = 'qcm-container';

	const questionText = document.createElement('div');
	questionText.className = 'qcm-question';
	questionText.textContent = qcm_data.qtext;

	qcmContainer.appendChild(questionText);

	const choicesContainer = document.createElement('div');
	choicesContainer.id = 'qcm-choices';

	qcm_data.options.forEach((option) => {
		const choiceDiv = document.createElement('div');
		choiceDiv.className = 'qcm-choice';
		choiceDiv.textContent = option.text;
		choiceDiv.dataset.choice = option.number;
		choiceDiv.onclick = () => handleQCMChoice(option.number);
		choicesContainer.appendChild(choiceDiv);
	});

	qcmContainer.appendChild(choicesContainer);
	divGame.appendChild(qcmContainer);

	divGame.onclick = null;
	document.onkeyup = null;
}

function handleQCMChoice(choice) {
	isQcmactive = false;
	if (DEBUG) console.log('Choix QCM:', choice);

	const choices = document.querySelectorAll('.qcm-choice');
	choices.forEach((c) => (c.onclick = null));

	let xhr = new XMLHttpRequest();
	xhr.onreadystatechange = function () {
		if (xhr.readyState === 4 && xhr.status === 200) {
			try {
				let response = JSON.parse(xhr.responseText);
				if (response.success) {
					if (DEBUG) console.log('Choix sauvegardé:', response.choice);
					const qcmContainer = document.getElementById('qcm-container');
					if (qcmContainer) qcmContainer.remove();
					hideTextBox();
					hideNameBox();

					showFlex(openEscIG);

					window.onbeforeunload = (e) => {
						e.preventDefault();
						autoSave();
					};

					divGame.onclick = () => {
						getLine();
					};
					document.onkeyup = (event) => {
						pressKey(event);
					};

					setTimeout(() => {
						getLine();
						setTimeout(() => autoSave(), 100);
					}, 100);
				} else {
					if (DEBUG) console.error('Erreur sauvegarde choix:', response.message);
				}
			} catch (error) {
				if (DEBUG) console.error('Erreur parsing JSON:', error);
			}
		}
	};
	xhr.open('POST', 'PHP/save_qcm_choice.php', true);
	xhr.send(choice.toString());
}

function displayGameEnd(ending_name) {
	hideTextBox();
	hideNameBox();
	hideOverlayText();
	hideCenteredText();

	showCenteredText('Fin atteinte : ' + ending_name);

	divGame.onclick = null;
	document.onkeyup = null;

	if (DEBUG) console.log('Fin du jeu:', ending_name);
}
