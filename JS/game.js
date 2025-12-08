let isTextLoading = false;

// document.onkeyup = (event) => {
// 	pressKey(event);
// };

//==========KEY PRESS FUNCTION==========
function pressKey(event) {
	event.preventDefault();
	if (isDisplay(divGame)) {
		if (event.key === 'Escape') {
			openEscape(); 
			// si la page se charge et qu'on fait Escape, les chargements en cours se bloquent mais ce n'est pas du à la fonction.
		} else if ((event.key === ' ' || event.key === 'ArrowRight' || event.key === 'Enter')) {
			getLine();
		} else if (event.key === 'ArrowLeft') {
			// revenir au diagolgue précédent
		} else if (event.key.toLowerCase() === 'f') {
			fullScreen();
		}
	}
}

function fullScreen() {
	if (!document.fullscreenElement) {
		// Plein écran sur tout le document
		document.documentElement.requestFullscreen();
	} else {
		document.exitFullscreen();
	}
}

function openEscape() {
	if (isDisplay(divGame) && isDisplay(divEscape)) {
		hide(divEscape);
		noFilter(divMenu);
		noFilter(divGame);
	} else {
		showFlex(divEscape);
		blurF(divMenu);
		blurF(divGame);
	}
}

function hideButton() {
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

//==== MAIN FUNCTIONS ==================================
function getLine() {
	if (!isTextLoading) {
		isTextLoading = true;
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
					isTextLoading = false;
				} catch (error) {
					if (DEBUG) console.error('Erreur lors du parsing JSON:' + error + '\nRéponse reçue:' + responseText);
				}
			}
		};
		xhr.open('GET', 'PHP/get_line.php', true);
		xhr.send();
	} else {
		if (DEBUG) console.log('attend');
	}
}

function update_dialogue(response) {
	const type = parseInt(response.type);
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

	switch (type) {
		case 1: // type 1 -> text
			displayText(content, character_name, character_color, character_code);
			break;
		case 2: // type 2 -> image (bg)
			change_bg(image_name, true);
			getLine();
			break;
		case 3: // type 3 -> sprite
			if (image_tag === 'bg') {
				// handle problem in DB for type 3 with 'bg' tag
				change_bg(image_name, false);
				getLine();
			} else {
				// add sprite return false just for heartattack to see animation going
				if (add_sprite(image_name, image_tag, pos, z, width, height)) {
					getLine();
				}
			}
			break;
		case 4: // type 4 -> remove sprite
			remove_sprite(image_tag);
			getLine();
			break;
		case 5: //type 5
			add_center_div(content);
			break;
		default:
			console.log("Type non géré pour l'instant : " + type);
			getLine();
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
		divGame.style.transition = 'opacity 0.3s ease-in';
		divGame.style.opacity = 0;
		setTimeout(() => {
			divGame.style.backgroundImage = `url("assets/internHD/${img_name}")`;
			divGame.style.opacity = 1;
			reset_sprite_stack();
		}, 300);
	} // j'hésite de carrement rien faire car quasiment sur que les tag 'bg' sont inutiles...bref
	else {
		divGame.style.backgroundImage = `url("assets/internHD/${img_name}")`;
	}
}

function reset_sprite_stack() {
	spriteStack.innerHTML = '';
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
	// Exception cases
	if (image_tag === 'heartattack') {
		handle_heartattack(image_name, image_tag, pos, z, width, height);
		return false; // logique pour ne pas appeller directement getline
	}
	let spriteImg = document.createElement('div');
	spriteImg.style.backgroundImage = `url("assets/internHD/${image_name}")`;
	spriteImg.className = 'sprite';
	spriteImg.dataset.tag = image_tag;
	spriteImg.dataset.pos = pos;
	spriteImg.dataset.z = z;
	spriteImg.style.zIndex = z;
	spriteImg.style.backgroundSize = 'contain';
	spriteImg.style.backgroundRepeat = 'no-repeat';
	spriteImg.style.backgroundPosition = 'center';

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

	let existingSprite = spriteStack.querySelector(`div[data-tag="${image_tag}"]`);
    if (existingSprite) existingSprite.replaceWith(spriteImg);
    else spriteStack.appendChild(spriteImg);

    if (existingSprite) { // check for transition of the sprite if already there
        const oldPos = parseFloat(existingSprite.dataset.pos);
        const newPos = parseFloat(pos);

        if (oldPos !== newPos) {
            const oldLeft = parseFloat(existingSprite.style.left);
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
            existingSprite.replaceWith(spriteImg);
        }
    } else {
        // Nouveau sprite l'ajouter directement
        spriteStack.appendChild(spriteImg);
    }

}

function handle_heartattack(image_name, image_tag, pos, z, width, height) {
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
	heart.style.height = divGame.offsetHeight  + 'px';

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
				getLine();
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
	// exemple de ce que on doit interpreter :
	// <span style="color: #b14343">Emi<br>Aaah!</span><span style="color: #FF8D7C">Fille étrange<br>Bonjour.</span>'
	// <span style="color: #b14343">Emi<br>Parler comme quoi ?</span><span style="color: #FF8D7C">Rin<br>Comme quoi ?</span>
	// je ne sais pas ou le placer pour l'instant, doije supprimer les textbox actuelles???
}
//==== TYPE 7 ==================================
function play_music(music_name) {
	//
}

//==== TYPE 8 ==================================
function stop_music(fadeout) {
	//
}

//==== UTILITY FUNCTIONS ==================================
//==== UI HELPERS (affichage texte / name / centered) ==================

// text box -> type 1 normal
// centeredText -> type 5 (note papier)
// overlaytext -> overlay debut de jeu

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
	textElement.innerHTML = `<span>${content}</span>`;
	textElement.style.opacity = '1';

	triggerLogoEffect(textElement);
}

function hideTextBox() {
	textElement.classList.remove('blink', 'pop');
	hide(textElement);
	textElement.innerHTML = '';
	textElement.style.opacity = '0';
}

function showCenteredText(content) {
	showFlex(centeredText);
	centeredText.innerHTML = `<span>${content}</span>`;
	centeredText.style.opacity = '1';
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
	textOverlay.innerHTML += `<br><span>${content}</span>`;
	textOverlay.style.opacity = '0.7';

	triggerLogoEffect(textOverlay, 'pop2');
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
	element.classList.remove('blink', 'pop', 'pop2');

	element.classList.add(animationClass, 'blink');

	setTimeout(() => {
		element.classList.remove(animationClass);
		void element.offsetWidth;
		element.classList.add('blink');
	}, 300);
}
