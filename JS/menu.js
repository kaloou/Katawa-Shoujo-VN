document.addEventListener("DOMContentLoaded", () => {
	window.onload = function () {
		const creditsBtn = document.getElementById("credits_button");
		const settingsBtn = document.getElementById("settings_button");
		const divEscape = document.getElementById("escape"); 
		const divMenu = document.getElementById("menu");
    	const divGame = document.getElementById("game");

		creditsBtn.addEventListener("click", () => {
            window.location.href = "HTML/credits.html";
		});

		settingsBtn.addEventListener("click", () => {
			divEscape.style.display = "flex";
            divMenu.style.filter = "blur(5px)";
            divGame.style.filter = "blur(5px)";
		});
	};
});
