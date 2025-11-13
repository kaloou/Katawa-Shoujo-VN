document.addEventListener('DOMContentLoaded', () => {
	// IDS
	divMenu = document.getElementById('menu_screen');
	divGame = document.getElementById('game_screen');
	nameElement = document.getElementById('name');
	textElement = document.getElementById('text');
	divEscape = document.getElementById('escape');
	spriteStack = document.getElementById('sprite_stack');
	hideBtn = document.getElementById('hide_button');
	dialogContener = document.getElementById('dialog_container');

	// EVENTS
	document.addEventListener('keyup', pressKey);
	hideBtn.addEventListener('click', hideButton);
	divGame.addEventListener('click', getLine);
});

let divMenu, divGame, nameElement, textElement, divEscape, spriteStack, hideBtn, dialogContener;
//==========KEY PRESS FUNCTION==========
function pressKey(event) {
	event.preventDefault();
	if (event.key === 'Escape') {
		openEscape();
	} else if (
		(event.key === ' ' || event.key === 'ArrowRight' || event.key === 'Enter') &&
		divGame.style.display === 'block'
	) {
		getLine();
	} else if (event.key === 'ArrowLeft' && divGame.style.display === 'block') {
		// revenir au diagolgue précédent
	} else if (event.key.toLowerCase() === 'f' && divGame.style.display === 'block') {
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
	if (divEscape.style.display === 'none') {
		divEscape.style.display = 'flex';
		divMenu.style.filter = 'blur(5px)';
		divGame.style.filter = 'blur(5px)';
	} else if (divEscape.style.display === 'flex') {
		divEscape.style.display = 'none';
		divMenu.style.filter = 'none';
		divGame.style.filter = 'none';
	}
}

function hideButton() {
	divEscape.style.display = 'none';
	divMenu.style.filter = 'none';
	divGame.style.filter = 'none';
	dialogContener.style.display = 'none';
	document.addEventListener('keydown', showDialog);
	divGame.addEventListener('click', showDialog);
}

function showDialog() {
	dialogContener.style.display = 'block';
	divGame.removeEventListener('click', showDialog);
	document.removeEventListener('keydown', showDialog);
}
//==== MAIN FUNCTIONS ==================================
function getLine() {
	let xhr = getXHR(); // function from common.js
	xhr.onreadystatechange = function () {
		if (xhr.readyState === 4 && xhr.status === 200) {
			let responseText = xhr.responseText;

			try {
				let response = JSON.parse(responseText);

				if (response.type === 'error') {
					if (DEBUG) console.error('Une erreur est survenue:', response.message);
				} else if (response.type === 'end') {
					if (DEBUG) console.log('Fin de la séquence, redémarrage...');
					getLine();
				} else {
					if (response.seqserial === 1) {
						preloadImages();
					}
					update_dialogue(response);
				}
			} catch (error) {
				if (DEBUG) {
					console.error('Erreur lors du parsing JSON:', error);
					console.error('Réponse reçue:', responseText);
				}
			}
		}
	};
	xhr.open('GET', 'PHP/get_line.php', true);
	xhr.send();
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
	//supp la div center si existe, si pas opti plus tard remplacer tout le css du textElement temporairement
	const oldCenteredDiv = document.querySelector('.centered-text');
	if (oldCenteredDiv) oldCenteredDiv.remove();

	if (characterName && characterColor && characterName !== '') {
		textElement.style.display = 'flex';
		nameElement.style.display = 'flex';
		nameElement.innerHTML = `<span style="color: ${characterColor};">${characterName}</span>`;
	} else if (character_code === 'centered') {
		// game screen ref
		const parent = textElement.parentNode;

		nameElement.style.display = 'none';
		nameElement.innerHTML = '';
		textElement.style.display = 'none';
		textElement.innerHTML = '';

		const centeredDiv = document.createElement('div');
		centeredDiv.classList.add('centered-text');
		centeredDiv.innerHTML = `<span>${content}</span>`;

		// css
		Object.assign(centeredDiv.style, {
			position: 'absolute',
			top: '50%',
			left: '50%',
			transform: 'translate(-50%, -50%)',
			textAlign: 'center',
			color: 'white',
			fontSize: '1.5rem'
		});

		// On ajoute la div dans game screen
		parent.appendChild(centeredDiv);

		return;
	} else {
		// narrateur
		textElement.style.display = 'flex';
		nameElement.style.display = 'none';
		nameElement.innerHTML = `<span></span>`;
	}
	textElement.style.display = 'flex';
	textElement.innerHTML = `<span>${content}</span>`;

	// clignotement
	triggerLogoEffect();
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
		}, 200);
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
	const currentWidth = window.innerWidth;
	const ratio = currentWidth / ORIGINAL_WIDTH;
	return x * ratio;
}
function convert_y_on_current_format(y) {
	const ORIGINAL_HEIGHT = 600;
	const currentHeight = window.innerHeight;
	const ratio = currentHeight / ORIGINAL_HEIGHT;
	return y * ratio;
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
		handle_heartattck(image_name, image_tag, pos, z, width, height);
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

	let existingSprite = spriteStack.querySelector(`div[data-tag="${image_tag}"]`);
	if (existingSprite) existingSprite.replaceWith(spriteImg);
	else spriteStack.appendChild(spriteImg);
}

function handle_heartattck(image_name, image_tag, pos, z, width, height) {
	textElement.style.display = 'none';
	nameElement.style.display = 'none';

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
	//
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

//==== UI FUNCTIONS ==================================
function triggerLogoEffect() {
	// reset opacité
	textElement.classList.remove('blink', 'pop');
	textElement.style.opacity = '1';

	// force reflow
	void textElement.offsetWidth;

	// mini pop une fois
	textElement.classList.add('pop');

	// après le pop, lancer le clignotement
	setTimeout(() => {
		textElement.classList.remove('pop');
		void textElement.offsetWidth; // reflow
		textElement.classList.add('blink');
	}, 300); // durée = durée de l'animation pop
}

//==== UTILITY FUNCTIONS ==================================
