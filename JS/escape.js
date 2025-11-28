import {el} from './elements.js';
import {hide, blur, isDisplay, noFilter, showFlex} from './common.js';

hide(el.divEscape);

el.quitEscBtn.addEventListener('click', () => {
	noFilter(el.divMenu);
	noFilter(el.divGame);
	hide(el.divEscape);
});
el.returnBtn.addEventListener('click', GameToMenu);

export function GameToMenu() {
	noFilter(el.divMenu);
	noFilter(el.divGame);
	showFlex(el.divMenu);
	hide(el.divGame);
	hide(el.divEscape);
}

export function openEscape() {
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