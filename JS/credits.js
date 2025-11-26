// === Éléments des crédits ===
let videoCredit = document.getElementById('bg-video');
let playButtonCredits = document.getElementById('play_button_credits');


// EVENTS
document.addEventListener('click', playPause);
videoCredit.addEventListener('loadeddata', playPause);

function playPause() {
	if (el.videoCredit.paused) {
		el.videoCredit.play();
		el.playButtonCredits.style.display = 'none';
	} else {
		el.videoCredit.pause();
		el.playButtonCredits.style.display = 'block';
	}
}

