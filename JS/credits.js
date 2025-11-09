document.addEventListener("DOMContentLoaded", () => {
    let videoCredit = document.getElementById("bg-video");
    let playButton = document.getElementById("play_button_credits");
    //playPause();
    //playButton.addEventListener("click", playPause);
    document.addEventListener("click", playPause);

    function playPause() { 
        if (videoCredit.paused)
        {
            videoCredit.play();
            playButton.style.display = "none";
        }
        else 
        {
            videoCredit.pause();
            playButton.style.display = "block";
        }
    } 

    videoCredit.onload = function () {
        playPause();
    };
});