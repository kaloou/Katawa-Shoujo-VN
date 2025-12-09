quitEscBtn.addEventListener('click', () => {
	noFilter(divMenu);
	noFilter(divGame);
	hide(divEscape);
});

hideBtn.addEventListener('click', hideButton);

returnBtn.addEventListener('click', GameToMenu);

function GameToMenu() {
	hide(divEscape);
	noFilter(divMenu);
	noFilter(divGame);

	playTransition(() => {
		showFlex(divMenu);
		hide(divGame);
	});
}