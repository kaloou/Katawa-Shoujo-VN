import {el} from './elements.js';
import {blur, showFlex} from './common.js';

// EVENTS
el.creditsBtn.addEventListener('click', () => {
	window.location.href = 'HTML/credits.html';
});

// el.settingsBtn.addEventListener('click', () => {
// 	showFlex(el.divEscape);
// 	blur(el.divMenu);
// 	blur(el.divGame);
// });
