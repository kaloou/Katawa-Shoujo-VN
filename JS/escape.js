document.addEventListener("DOMContentLoaded", () => {
    divMenu = $("menu_screen");
    divGame = $("game_screen");
    divEscape = $("escape");
    quitEscBtn = $("quit_esc_button");
    saveBtn = $("save_button");
    loadBtn = $("load_button");
    returnBtn = $("return_button");

    quitEscBtn.addEventListener("click", () => {
        noFilter(divMenu);
        noFilter(divGame);
        hide(divEscape); 
    });
    returnBtn.addEventListener("click", GameToMenu);
});

let returnBtn, quitEscBtn, saveBtn, loadBtn;

function GameToMenu() {
    noFilter(divMenu);
    noFilter(divGame);
    showFlex(divMenu);
    hide(divGame);
    hide(divEscape);
}