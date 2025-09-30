document.addEventListener("DOMContentLoaded", () => {
  const startBtn = document.getElementById("start_button");
  const creditsBtn = document.getElementById("credits_button");

  startBtn.addEventListener("click", () => {
    document.getElementById("menu").style.display = "none";
    document.getElementById("game").style.display = "block";
  });

  creditsBtn.addEventListener("click", () => {
    window.location.href = "HTML/credits.html";
  });
});
