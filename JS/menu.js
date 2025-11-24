import {el} from './elements.js';
import {blur, showFlex} from './common.js';

// EVENTS
el.creditsButton.addEventListener('click', () => {
	window.location.href = 'HTML/credits.html';
});

el.settingsButton.addEventListener('click', () => {
	showFlex(el.divEscape);
	blur(el.divMenu);
	blur(el.divGame);
});
