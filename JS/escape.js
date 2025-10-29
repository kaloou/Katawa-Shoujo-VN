document.addEventListener("DOMContentLoaded", () => {
    const divMenu = document.getElementById("menu");
    const divGame = document.getElementById("game");
    const divEscape = document.getElementById("escape");
    const continueBtn = document.getElementById("continue_button");
    const saveBtn = document.getElementById("save_button");
    const loadBtn = document.getElementById("load_button");
    const returnBtn = document.getElementById("return_button");
    
    returnBtn.addEventListener("click", GameToMenu);
    continueBtn.addEventListener("click", () => { divEscape.style.display = "none" });

    function GameToMenu() {
        divMenu.style.display = "flex";
        divGame.style.display = "none";
        divEscape.style.display = "none";
    }
});