document.addEventListener("DOMContentLoaded", () => {
    const divMenu = document.getElementById("menu_screen");
    const divGame = document.getElementById("game_screen");
    const divEscape = document.getElementById("escape");
    const continueBtn = document.getElementById("continue_button");
    const saveBtn = document.getElementById("save_button");
    const loadBtn = document.getElementById("load_button");
    const returnBtn = document.getElementById("return_button");

    continueBtn.addEventListener("click", () => { 
        divMenu.style.filter = "none";
        divGame.style.filter = "none";
        divEscape.style.display = "none"; 
    });
    returnBtn.addEventListener("click", GameToMenu);

    function GameToMenu() {
        divMenu.style.filter = "none";
        divGame.style.filter = "none";
        divMenu.style.display = "flex";
        divGame.style.display = "none";
        divEscape.style.display = "none";
    }

    hide(divEscape);
});