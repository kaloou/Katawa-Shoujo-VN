// === Variables globales pour les options ===
let optionsDiv;
let closeOptionsBtn;
let fullscreenToggle;
let resolutionSelect;
let autoModeToggle;
let textSpeedSlider;
let textSpeedValue;
let musicVolumeSlider;
let musicVolumeValue;

// Variables pour le mode auto
let autoModeInterval = null;
let autoModeDelay = 3000; // 3 secondes par défaut

// Variable pour la vitesse de lecture du texte
let textDisplaySpeed = 50; // Vitesse par défaut (1-100)

// === Initialisation ===
document.addEventListener('DOMContentLoaded', () => {
	// Récupérer les éléments du DOM
	optionsDiv = document.getElementById('options_div');
	closeOptionsBtn = document.getElementById('close_options_button');
	fullscreenToggle = document.getElementById('fullscreen_toggle');
	resolutionSelect = document.getElementById('resolution_select');
	autoModeToggle = document.getElementById('auto_mode_toggle');
	textSpeedSlider = document.getElementById('text_speed_slider');
	textSpeedValue = document.getElementById('text_speed_value');
	musicVolumeSlider = document.getElementById('music_volume_slider');
	musicVolumeValue = document.getElementById('music_volume_value');

	// Charger les options sauvegardées
	loadOptions();

	// Event listeners
	optionsBtn.addEventListener('click', toggleOptionsMenu);
	closeOptionsBtn.addEventListener('click', toggleOptionsMenu);

	// Mode plein écran
	fullscreenToggle.addEventListener('change', (e) => {
		if (e.target.checked) {
			enterFullscreen();
		} else {
			exitFullscreen();
		}
		saveOptions();
	});

	// Résolution
	resolutionSelect.addEventListener('change', (e) => {
		changeResolution(e.target.value);
		saveOptions();
	});

	// Mode automatique
	autoModeToggle.addEventListener('change', (e) => {
		if (e.target.checked) {
			startAutoMode();
		} else {
			stopAutoMode();
		}
		saveOptions();
	});

	// Vitesse de lecture
	textSpeedSlider.addEventListener('input', (e) => {
		textDisplaySpeed = parseInt(e.target.value);
		textSpeedValue.textContent = textDisplaySpeed;
		saveOptions();
	});

	// Volume de la musique
	musicVolumeSlider.addEventListener('input', (e) => {
		const volume = parseInt(e.target.value);
		musicVolumeValue.textContent = volume;
		setMusicVolume(volume);
		saveOptions();
	});

	// Détecter les changements de plein écran (par ex: touche F11 ou Escape)
	document.addEventListener('fullscreenchange', updateFullscreenToggle);
	document.addEventListener('webkitfullscreenchange', updateFullscreenToggle);
	document.addEventListener('mozfullscreenchange', updateFullscreenToggle);
	document.addEventListener('MSFullscreenChange', updateFullscreenToggle);
});

// === Fonctions d'ouverture/fermeture du menu ===
function toggleOptionsMenu() {
	if (isDisplay(optionsDiv)) {
		hide(optionsDiv);
		document.onkeyup = (event) => {
			pressKey(event);
		};
	} else {
		showFlex(optionsDiv);
		document.onkeyup = (event) => {
			closeOptionsWithEsc(event);
		};
	}
}

function closeOptionsWithEsc(event) {
	event.preventDefault();
	if (event.key === 'Escape') {
		toggleOptionsMenu();
	}
}

// === Mode plein écran ===
function enterFullscreen() {
	if (!document.fullscreenElement) {
		document.documentElement.requestFullscreen().catch((err) => {
			console.error('Erreur lors du passage en plein écran:', err);
			fullscreenToggle.checked = false;
		});
	}
}

function exitFullscreen() {
	if (document.fullscreenElement) {
		document.exitFullscreen().catch((err) => {
			console.error('Erreur lors de la sortie du plein écran:', err);
		});
	}
}

function updateFullscreenToggle() {
	fullscreenToggle.checked = !!document.fullscreenElement;
	saveOptions();
}

// === Résolution ===
function changeResolution(resolution) {
	if (resolution === 'responsive') {
		// Retirer les styles de taille fixe
		document.body.style.width = '';
		document.body.style.height = '';
		document.body.style.overflow = '';
		document.documentElement.style.width = '';
		document.documentElement.style.height = '';
	} else {
		// Appliquer la résolution choisie en ouvrant une nouvelle fenêtre
		const [width, height] = resolution.split('x');
		const currentUrl = window.location.href;

		// Calculer la position pour centrer la fenêtre sur l'écran
		const left = (window.screen.width - parseInt(width)) / 2;
		const top = (window.screen.height - parseInt(height)) / 2;

		// Paramètres de fenêtre pour forcer l'ouverture d'une popup et non d'un onglet
		const windowFeatures = [
			`width=${width}`,
			`height=${height}`,
			`left=${left}`,
			`top=${top}`,
			'resizable=no',
			'toolbar=no',
			'menubar=no',
			'location=no',
			'status=no',
			'scrollbars=yes'
		].join(',');

		// Ouvrir une nouvelle fenêtre avec la résolution spécifiée
		const newWindow = window.open(currentUrl, 'GameWindow', windowFeatures);

		// S'assurer que la fenêtre a le focus
		if (newWindow) {
			newWindow.focus();
			if (DEBUG) console.log(`Nouvelle fenêtre ouverte: ${width}x${height}`);
		} else {
			console.error('Impossible d\'ouvrir la fenêtre. Vérifiez que les popups ne sont pas bloquées.');
		}

		// Remettre le select sur "responsive" après l'ouverture
		setTimeout(() => {
			resolutionSelect.value = 'responsive';
			saveOptions();
		}, 100);
	}
}

// === Mode automatique ===
function startAutoMode() {
	if (autoModeInterval) {
		stopAutoMode();
	}

	// Appeler getLine toutes les X secondes (basé sur la vitesse)
	// Plus la vitesse est élevée, plus le délai est court
	autoModeDelay = 5000 - (textDisplaySpeed * 40); // Entre 1000ms et 5000ms

	autoModeInterval = setInterval(() => {
		if (isDisplay(divGame) && !isDisplay(divEscape) && !isDisplay(optionsDiv)) {
			getLine();
		}
	}, autoModeDelay);

	if (DEBUG) console.log('Mode automatique activé avec un délai de', autoModeDelay, 'ms');
}

function stopAutoMode() {
	if (autoModeInterval) {
		clearInterval(autoModeInterval);
		autoModeInterval = null;
		if (DEBUG) console.log('Mode automatique désactivé');
	}
}

// === Volume de la musique ===
function setMusicVolume(volume) {
	// Cette fonction sera implémentée quand le système audio sera en place
	// Pour l'instant, on stocke juste la valeur
	const volumeLevel = volume / 100;

	// Si il y a des éléments audio dans le jeu, on applique le volume
	const audioElements = document.querySelectorAll('audio');
	audioElements.forEach((audio) => {
		audio.volume = volumeLevel;
	});

	if (DEBUG) console.log('Volume de la musique:', volume);
}

// === Vitesse de lecture ===
// La vitesse de lecture est utilisée par la fonction d'affichage du texte
// Elle est accessible globalement via la variable textDisplaySpeed

// === Sauvegarde et chargement des options ===
function saveOptions() {
	const options = {
		fullscreen: fullscreenToggle.checked,
		resolution: resolutionSelect.value,
		autoMode: autoModeToggle.checked,
		textSpeed: textDisplaySpeed,
		musicVolume: parseInt(musicVolumeSlider.value)
	};

	localStorage.setItem('gameOptions', JSON.stringify(options));
	if (DEBUG) console.log('Options sauvegardées:', options);
}

function loadOptions() {
	const savedOptions = localStorage.getItem('gameOptions');

	if (savedOptions) {
		try {
			const options = JSON.parse(savedOptions);

			// Appliquer les options sauvegardées
			if (options.fullscreen && !document.fullscreenElement) {
				fullscreenToggle.checked = options.fullscreen;
				// Ne pas activer le plein écran automatiquement au chargement
			}

			if (options.resolution) {
				resolutionSelect.value = options.resolution;
			}

			if (options.autoMode) {
				autoModeToggle.checked = options.autoMode;
				// Ne pas démarrer le mode auto automatiquement
			}

			if (options.textSpeed) {
				textDisplaySpeed = options.textSpeed;
				textSpeedSlider.value = options.textSpeed;
				textSpeedValue.textContent = options.textSpeed;
			}

			if (options.musicVolume !== undefined) {
				musicVolumeSlider.value = options.musicVolume;
				musicVolumeValue.textContent = options.musicVolume;
				setMusicVolume(options.musicVolume);
			}

			if (DEBUG) console.log('Options chargées:', options);
		} catch (error) {
			if (DEBUG) console.error('Erreur lors du chargement des options:', error);
		}
	}
}

// === Fonction pour obtenir la vitesse de lecture (pour utilisation externe) ===
function getTextDisplaySpeed() {
	return textDisplaySpeed;
}
