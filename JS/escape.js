import {el} from './elements.js';
import {hide, noFilter, showFlex} from './common.js';

el.quitEscBtn.addEventListener('click', () => {
	noFilter(el.divMenu);
	noFilter(el.divGame);
	hide(el.divEscape);
});
el.returnBtn.addEventListener('click', GameToMenu);

function GameToMenu() {
	noFilter(el.divMenu);
	noFilter(el.divGame);
	showFlex(el.divMenu);
	hide(el.divGame);
	hide(el.divEscape);
}
