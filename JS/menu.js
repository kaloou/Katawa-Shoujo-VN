document.addEventListener('DOMContentLoaded', () => {
	window.onload = function () {
		const creditsBtn = document.getElementById('credits_button');
		const settingsBtn = document.getElementById('settings_button');
		const divEscape = document.getElementById('escape');

		creditsBtn.addEventListener('click', () => {
			window.location.href = 'HTML/credits.html';
		});

		settingsBtn.addEventListener('click', () => {
			divEscape.style.display = 'flex';
		});
	};
});
