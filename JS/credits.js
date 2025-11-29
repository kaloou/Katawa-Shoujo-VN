// === Éléments des crédits ===
let videoCredit = document.getElementById('bg-video');
let playButtonCredits = document.getElementById('play_button_credits');


// EVENTS
document.addEventListener('click', playPause);
videoCredit.addEventListener('loadeddata', playPause);

function playPause() {
	if (videoCredit.paused) {
		videoCredit.play();
		playButtonCredits.style.display = 'none';
	} else {
		videoCredit.pause();
		playButtonCredits.style.display = 'block';
	}
}

