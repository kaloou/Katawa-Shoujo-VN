import {el} from './elements.js';

// EVENTS
document.addEventListener('click', playPause);

function playPause() {
	if (el.videoCredit.paused) {
		el.videoCredit.play();
		el.playButtonCredits.style.display = 'none';
	} else {
		el.videoCredit.pause();
		el.playButtonCredits.style.display = 'block';
	}
}

el.videoCredit.addEventListener('loadeddata', playPause);
