import {el} from './elements.js';
import {preloadImages, blur, showFlex, hide, showBlock, isDisplay, noFilter} from './common.js';
import {DEBUG} from './init.js';

let isTextLoading = false;

document.addEventListener('keyup', pressKey);

//==========KEY PRESS FUNCTION==========
export async function pressKey(event) {
	event.preventDefault();
	if (event.key === 'Escape') {
		openEscape();
	} else if ((event.key === ' ' || event.key === 'ArrowRight' || event.key === 'Enter') && isDisplay(el.divGame)) {
		getLine();
	} else if (event.key === 'ArrowLeft' && isDisplay(el.divGame)) {
		// revenir au diagolgue précédent
	} else if (event.key.toLowerCase() === 'f' && isDisplay(el.divGame)) {
		fullScreen();
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
	if (isDisplay(el.divEscape)) {
		hide(el.divEscape);
		noFilter(el.divMenu);
		noFilter(el.divGame);
	} else {
		showFlex(el.divEscape);
		blur(el.divMenu);
		blur(el.divGame);
	}
}

function hideButton() {
	hide(el.divEscape);
	noFilter(el.divMenu);
	noFilter(el.divGame);
	hide(el.dialogContener);
	document.addEventListener('keydown', showDialog);
	el.divGame.addEventListener('click', showDialog);
}

function showDialog() {
	el.dialogContener.style.display = 'block';
	el.divGame.removeEventListener('click', showDialog);
	document.removeEventListener('keydown', showDialog);
}
//==== MAIN FUNCTIONS ==================================
async function getLine() {
	if (!isTextLoading) {
		isTextLoading = true;
		let xhr = new XMLHttpRequest();
		return await new Promise(function (resolve) {
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
								preloadImages();
							}
							update_dialogue(response);
						}
						isTextLoading = false;
						resolve();
					} catch (error) {
						if (DEBUG) console.error('Erreur lors du parsing JSON:' + error + '\nRéponse reçue:' + responseText);
						resolve();
					}
				}
			};
			xhr.open('GET', 'PHP/get_line.php', true);
			xhr.send();
		});
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
		el.divGame.style.transition = 'opacity 0.3s ease-in';
		el.divGame.style.opacity = 0;
		setTimeout(() => {
			el.divGame.style.backgroundImage = `url("assets/internHD/${img_name}")`;
			el.divGame.style.opacity = 1;
			reset_sprite_stack();
		}, 300);
	} // j'hésite de carrement rien faire car quasiment sur que les tag 'bg' sont inutiles...bref
	else {
		el.divGame.style.backgroundImage = `url("assets/internHD/${img_name}")`;
	}
}

function reset_sprite_stack() {
	el.spriteStack.innerHTML = '';
}

//==== TYPE 3 FUNCTIONS ==================================
// Fonctions pour passer d'un format spécifique à la taille de l'écran
function convert_x_on_current_format(x) {
	const ORIGINAL_WIDTH = 800;
	const currentWidth = window.innerWidth;
	const ratio = currentWidth / ORIGINAL_WIDTH;
	return x * ratio;
}

function convert_x_on_current_format_hd(x) {
	const HD_WIDTH = 1920;
	const currentWidth = window.innerWidth;
	const ratio = currentWidth / HD_WIDTH;
	return x * ratio;
}
function convert_y_on_current_format_hd(y) {
	const HD_HEIGHT = 1080;
	const currentHeight = window.innerHeight;
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

	const originalX = pos % 800;
	const convertedX = convert_x_on_current_format(originalX);

	spriteImg.style.left = convertedX - convert_x_on_current_format_hd(width) / 2 + 'px';
	spriteImg.style.bottom = '0';

	// dimensions
	spriteImg.style.width = (width > 0 ? width : 200) + 'px';
	spriteImg.style.height = (height > 0 ? height : 200) + 'px';

	let existingSprite = el.spriteStack.querySelector(`div[data-tag="${image_tag}"]`);
	if (existingSprite) existingSprite.replaceWith(spriteImg);
	else el.spriteStack.appendChild(spriteImg);
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
	heart.style.width = window.innerWidth + 'px';
	heart.style.height = window.innerHeight + 'px';

	// --- dégradé horizontal (centre opaque → côtés transparents) ---
	heart.style.maskImage =
		'linear-gradient(to right, transparent 0%, rgba(0,0,0,1) 25%, rgba(0,0,0,1) 75%, transparent 100%)';
	heart.style.webkitMaskImage =
		'linear-gradient(to right, transparent 0%, rgba(0,0,0,1) 25%, rgba(0,0,0,1) 75%, transparent 100%)';
	heart.style.maskMode = 'alpha';
	heart.style.webkitMaskMode = 'alpha';

	// Si un sprite du même tag existe déjà → le remplacer
	let existing = el.spriteStack.querySelector(`div[data-tag="${image_tag}"]`);
	if (existing) existing.replaceWith(heart);
	else el.spriteStack.appendChild(heart);

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
	let spriteToRemove = el.spriteStack.querySelector(`div[data-tag="${image_tag}"]`);
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
	showFlex(el.nameElement);
	el.nameElement.innerHTML = `<span style="color: ${characterColor};">${characterName}</span>`;
	el.nameElement.style.opacity = '1';
}

function hideNameBox() {
	hide(el.nameElement);
	el.nameElement.innerHTML = '';
	el.nameElement.style.opacity = '0';
}

function showTextBox(content) {
	showFlex(el.textElement);
	el.textElement.innerHTML = `<span>${content}</span>`;
	el.textElement.style.opacity = '1';

	triggerLogoEffect(el.textElement);
}

function hideTextBox() {
	el.textElement.classList.remove('blink', 'pop');
	hide(el.textElement);
	el.textElement.innerHTML = '';
	el.textElement.style.opacity = '0';
}

function showCenteredText(content) {
	showFlex(el.centeredText);
	el.centeredText.innerHTML = `<span>${content}</span>`;
	el.centeredText.style.opacity = '1';
}

function hideCenteredText() {
	hide(el.centeredText);
	el.centeredText.innerHTML = '';
	el.centeredText.style.opacity = '0';
}

let cpt = 0;
function showOverlayText(content) {
	cpt++;
	if (cpt > 7) {
		el.textOverlay.innerHTML = '';
		cpt = 1;
	}

	showFlex(el.textOverlay);
	el.textOverlay.innerHTML += `<br><span>${content}</span>`;
	el.textOverlay.style.opacity = '0.7';

	triggerLogoEffect(el.textOverlay, 'pop2');
}

function hideOverlayText() {
	el.textOverlay.classList.remove('blink', 'pop2');
	hide(el.textOverlay);
	el.textOverlay.innerHTML = '';
	el.textOverlay.style.opacity = '0';
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
