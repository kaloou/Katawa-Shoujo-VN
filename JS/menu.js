document.addEventListener('DOMContentLoaded', () => {
	window.onload = function () {
		creditsBtn = document.getElementById('credits_button');
		settingsBtn = document.getElementById('settings_button');
		divEscape = document.getElementById('escape');
		divMenu = document.getElementById('menu_screen');
		divGame = document.getElementById('game_screen');

		creditsBtn.addEventListener('click', () => {
			window.location.href = 'HTML/credits.html';
		});

		settingsBtn.addEventListener('click', () => {
			divEscape.style.display = 'flex';
			divMenu.style.filter = 'blur(5px)';
			divGame.style.filter = 'blur(5px)';
		});
	};
});

let creditsBtn, settingsBtn;