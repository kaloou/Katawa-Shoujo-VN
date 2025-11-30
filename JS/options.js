// === Variables pour les options ===
let autoModeInterval = null;
let autoModeDelay = 3000;
let textDisplaySpeed = 50;

// Init
loadOptions();
optionsBtn.addEventListener('click', toggleOptionsMenu);
closeOptionsBtn.addEventListener('click', toggleOptionsMenu);

fullscreenToggle.addEventListener('change', (e) => {
	if (e.target.checked) {
		enterFullscreen();
	} else {
		exitFullscreen();
	}
	saveOptions();
});

resolutionSelect.addEventListener('change', (e) => {
	changeResolution(e.target.value);
	saveOptions();
});

autoModeToggle.addEventListener('change', (e) => {
	if (e.target.checked) {
		startAutoMode();
	} else {
		stopAutoMode();
	}
	saveOptions();
});

textSpeedSlider.addEventListener('input', (e) => {
	textDisplaySpeed = parseInt(e.target.value);
	textSpeedValue.textContent = textDisplaySpeed;
	saveOptions();
});

musicVolumeSlider.addEventListener('input', (e) => {
	const volume = parseInt(e.target.value);
	musicVolumeValue.textContent = volume;
	setMusicVolume(volume);
	saveOptions();
});

document.addEventListener('fullscreenchange', updateFullscreenToggle);
document.addEventListener('webkitfullscreenchange', updateFullscreenToggle);
document.addEventListener('mozfullscreenchange', updateFullscreenToggle);
document.addEventListener('MSFullscreenChange', updateFullscreenToggle);


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
		if (DEBUG) console.log('Mode responsive activé');
	} else {
		const [width, height] = resolution.split('x');
		const left = (window.screen.width - parseInt(width)) / 2;
		const top = (window.screen.height - parseInt(height)) / 2;

		const features = `width=${width},height=${height},left=${left},top=${top}`;
		window.open(window.location.href, '', features);

		resolutionSelect.value = 'responsive';
		saveOptions();
	}
}

// === Mode automatique ===
function startAutoMode() {
	if (autoModeInterval) {
		stopAutoMode();
	}

	autoModeDelay = 5000 - (textDisplaySpeed * 40);

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
