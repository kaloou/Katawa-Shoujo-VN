function $(elem) {
	var type = typeof elem;
	if (type == 'string') {
		return document.getElementById(elem);
	}
	return elem;
}

function hide(elem) {
	elem.style.display = 'none';
}

function showFlex(elem) {
	elem.style.display = 'flex';
}

function showBlock(elem) {
	elem.style.display = 'block';
}

function isDisplay(elem) {
	return elem.style.display === 'flex' || elem.style.display === 'block';
}

function isNotDisplay(elem) {
	return elem.style.display === 'none';
}

function blurF(elem) {
	elem.style.filter = 'blur(5px)';
}

function noFilter(elem) {
	elem.style.filter = 'none';
}

function toggle(elem, display = 'block') {
	if (elem.style.display === 'none') {
		elem.style.display = display;
	} else {
		elem.style.display = 'none';
	}
}

//============= Preload image functions =============
function preloadImage(path, onDone) {
	const img = new Image();
	img.onload = () => onDone?.(img);
	img.onerror = () => onDone?.(null);
	img.src = path;
}

function preloadImagesGame() {
	let xhr = new XMLHttpRequest();

	xhr.onreadystatechange = function () {
		if (xhr.readyState === 4) {
			if (xhr.status === 200) {
				let responseText = xhr.responseText;

				try {
					let data = JSON.parse(responseText);

					if (data.images && data.images.length > 0) {
						data.images.forEach((image) => {
							const fullPath = 'assets/internHD/' + image.image_name;

							preloadImage(fullPath, (img) => {
								if (img) {
									console.log('Image préchargée:', image.image_name);
								} else {
									console.error('Erreur de chargement:', image.image_name);
								}
							});
						});
					} else {
						console.log('Aucune image trouvée.');
					}
				} catch (error) {
					console.error('Erreur lors du parsing JSON:', error, '\nRéponse reçue:', responseText);
				}
			} else {
				console.error('Erreur XHR preloadImagesGame:', xhr.status);
			}
		}
	};

	xhr.open('GET', 'PHP/image_preloader.php', true);
	xhr.send();
}

//============= Transition animation =============
let TRANSITION_DURATION = 500;
const CIRCLE_RADIUS = 10;
const CIRCLE_SPACING = CIRCLE_RADIUS * 2;
const CURTAIN_OPACITY = 0.7;
const FADE_SPEED = 3;

function playTransition(callback) {
	const canvas = document.getElementById('transition');
	const divMenu = document.getElementById('menu_screen');
	const divGame = document.getElementById('game_screen');

	// Détecter le sens : menu visible = menu->game, game visible = game->menu
	const isMenuToGame = isDisplay(divMenu);

	canvas.style.display = 'block';
	canvas.width = window.innerWidth;
	canvas.height = window.innerHeight;

	divMenu.style.display = 'flex';
	divGame.style.display = 'block';

	// Gérer le z-index pour que la bonne div soit visible
	if (isMenuToGame) {
		divMenu.style.zIndex = '2';
		divGame.style.zIndex = '1';
	} else {
		divMenu.style.zIndex = '1';
		divGame.style.zIndex = '2';
	}

	const ctx = canvas.getContext('2d');
	let startTime;

	// Attendre un frame pour que le navigateur calcule le layout
	requestAnimationFrame(() => {
		startTime = Date.now();
		animate();
	});

	function animate() {
		const elapsed = Date.now() - startTime;
		const progress = elapsed / TRANSITION_DURATION;

		if (progress >= 1) {
			canvas.style.display = 'none';
			divMenu.style.clipPath = '';
			divGame.style.clipPath = '';
			divMenu.style.zIndex = '';
			divGame.style.zIndex = '';
			if (callback) callback();
			return;
		}

		ctx.clearRect(0, 0, canvas.width, canvas.height);

		const curtainHeight = canvas.height * progress;
		const percent = progress * 100;

		if (isMenuToGame) {
			// Menu -> Game : masquer menu, révéler game
			divMenu.style.clipPath = `inset(0 0 ${percent}% 0)`;
			divGame.style.clipPath = `inset(${100 - percent}% 0 0 0)`;
		} else {
			// Game -> Menu : masquer game, révéler menu
			divGame.style.clipPath = `inset(0 0 ${percent}% 0)`;
			divMenu.style.clipPath = `inset(${100 - percent}% 0 0 0)`;
		}

		// Ronds
		drawCircles(ctx, canvas.width, canvas.height, curtainHeight);

		requestAnimationFrame(animate);
	}

	animate();
}

function drawCircles(ctx, width, height, curtainHeight) {
	const rows = Math.ceil(height / CIRCLE_SPACING);
	const cols = Math.ceil(width / CIRCLE_SPACING) + 1;

	for (let row = 0; row < rows; row++) {
		const y = height - row * CIRCLE_SPACING;

		// Skip si au-dessus du rideau
		if (y < height - curtainHeight) continue;

		const distanceFromBottom = curtainHeight - (height - y);
		const opacity = Math.max(0, 1 - (distanceFromBottom / height) * FADE_SPEED);

		if (opacity <= 0) continue;

		ctx.fillStyle = `rgba(0, 0, 0, ${opacity * CURTAIN_OPACITY})`;

		for (let col = 0; col < cols; col++) {
			const x = col * CIRCLE_SPACING;
			ctx.beginPath();
			ctx.arc(x, y, CIRCLE_RADIUS, 0, Math.PI * 2);
			ctx.fill();
		}
	}
}
