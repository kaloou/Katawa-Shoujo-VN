import {el} from './elements.js';
import {hide, noFilter, showFlex} from './common.js';

el.quitEscBtn.addEventListener('click', () => {
	noFilter(divMenu);
	noFilter(divGame);
	hide(divEscape);
});
el.returnBtn.addEventListener('click', GameToMenu);

function GameToMenu() {
	noFilter(divMenu);
	noFilter(divGame);
	showFlex(divMenu);
	hide(divGame);
	hide(divEscape);
}
