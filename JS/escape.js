quitEscBtn.addEventListener('click', () => {
	noFilter(divMenu);
	noFilter(divGame);
	hide(divEscape);
});

hideBtn.addEventListener('click', hideButton);

returnBtn.addEventListener('click', GameToMenu);

function GameToMenu() {
	noFilter(divMenu);
	noFilter(divGame);
	showFlex(divMenu);
	hide(divGame);
	hide(divEscape);
	hide(openEscIG);
}