document.addEventListener("DOMContentLoaded", () => {
    divMenu = $("menu_screen");
    divGame = $("game_screen");
    divEscape = $("escape");
    quitEscBtn = $("quit_esc_button");
    saveBtn = $("save_button");
    loadBtn = $("load_button");
    returnBtn = $("return_button");

    quitEscBtn.addEventListener("click", () => {
        divMenu.style.filter = "none";
        divGame.style.filter = "none";
        divEscape.style.display = "none"; 
    });
    returnBtn.addEventListener("click", GameToMenu);


    hide(divEscape);
});
let returnBtn, quitEscBtn, saveBtn, loadBtn;

function GameToMenu() {
    divMenu.style.filter = "none";
    divGame.style.filter = "none";
    divMenu.style.display = "flex";
    divGame.style.display = "none";
    divEscape.style.display = "none";
}