import {el} from './elements.js';
import {hide} from './common.js';

// EVENTS
el.quitEscButton.addEventListener('click', () => {
	el.menuScreen.style.filter = 'none';
	el.gameScreen.style.filter = 'none';
	el.escape.style.display = 'none';
});

el.returnButton.addEventListener('click', GameToMenu);

hide(el.escape);

function GameToMenu() {
	el.menuScreen.style.filter = 'none';
	el.gameScreen.style.filter = 'none';
	el.menuScreen.style.display = 'flex';
	el.gameScreen.style.display = 'none';
	el.escape.style.display = 'none';
}
