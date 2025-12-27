// === Variables pour options ===
let autoModeInterval = null;
let autoModeDelay = 3000;
let textDisplaySpeed = 90;

// Init
loadOptions();
optionsBtn.addEventListener('click', toggleOptionsMenu);
closeOptionsBtn.addEventListener('click', toggleOptionsMenu);
resolutionSelect.value = 'responsive';

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

	if (autoModeToggle.checked) {
		startAutoMode();
	}

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

// === Ouvre et ferme les options ===
function toggleOptionsMenu() {
	if (isDisplay(optionsDiv)) {
		if (!isDisplay(divEscape)) {
			noFilter(divGame);
			noFilter(divMenu);
		}
		hide(optionsDiv);
		document.onkeyup = (event) => {
			pressKey(event);
		};
		openEscIG.onclick = () => {
			toggleEscape();
		};
	} else {
		showFlex(optionsDiv);
		blurF(divGame);
		blurF(divMenu);
		document.onkeyup = (event) => {
			closeOptionsWithEsc(event);
		};
		openEscIG.onclick = () => {
			toggleOptionsMenu();
		};
	}
}

function closeOptionsWithEsc(event) {
	event.preventDefault();
	if (event.key === 'Escape') {
		toggleOptionsMenu();
	}
}

// === Mode Plein écran ===
function enterFullscreen() {
	if (!document.fullscreenElement) {
		document.documentElement.requestFullscreen().catch((err) => {
			if (DEBUG) console.error('Erreur lors du passage en plein écran:', err);
			fullscreenToggle.checked = false;
		});
	}
}

function exitFullscreen() {
	if (document.fullscreenElement) {
		document.exitFullscreen().catch((err) => {
			if (DEBUG) console.error('Erreur lors de la sortie du plein écran:', err);
		});
	}
}

function updateFullscreenToggle() {
	fullscreenToggle.checked = !!document.fullscreenElement;
	saveOptions();
}

function changeResolution(resolution) {
	if (resolution === 'responsive') {
		divGame.style.width = '100dvw';
		divGame.style.height = '100dvh';
		divGame.style.border = '';
		divGame.style.borderRadius = 0;
	} else {
		var [width, height] = resolution.split('x');
		divGame.style.width = `${width}px`;
		divGame.style.height = `${height}px`;
		divGame.style.borderRadius = '1vw';
		divGame.style.border = '0.5vw solid var(--secondary-color)';
		saveOptions();
	}
}

// === Automatic mode ===
function startAutoMode() {
	if (autoModeInterval) {
		stopAutoMode();
	}
	if (isQcmactive) return;
	// Calculer le délai du mode auto en tenant compte de l'animation du texte
	// Temps d'animation moyen pour un texte de 150 caractères
	const averageTextLength = 150;
	const charDelay = Math.max(0.5, (101 - textDisplaySpeed) / 2);
	const animationTime = averageTextLength * charDelay;

	// Délai de base (2000ms) + temps d'animation
	autoModeDelay = 2000 + animationTime;

	autoModeInterval = setInterval(() => {
		if (isDisplay(divGame) && !isDisplay(divEscape) && !isQcmactive && !isHidingText) {
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
	const volumeLevel = volume / 100;
	globalMusicVolume = volumeLevel;

	if (currentMusic) {
		currentMusic.volume = volumeLevel;
	}

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
				globalMusicVolume = options.musicVolume / 100;
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
