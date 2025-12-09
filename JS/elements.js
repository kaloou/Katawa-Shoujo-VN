// === Éléments du menu principal ===
divMenu = document.getElementById('menu_screen');
mainMenu = document.getElementById('main_menu');
defaultMenu = document.getElementById('default_menu');

// === Éléments du jeu ===
divGame = document.getElementById('game_screen');
gameScreen = document.getElementById('game_screen');
spriteStack = document.getElementById('sprite_stack');
nameElement = document.getElementById('name');
textElement = document.getElementById('text');
centeredText = document.getElementById('centered-text');
textOverlay = document.getElementById('text_overlay');
dialogContener = document.getElementById('dialog_container');

// === Éléments de l'écran d'échappement ===
divEscape = document.getElementById('escape');
openEscIG = document.getElementById('open_esc_ingame');
quitEscBtn = document.getElementById('quit_esc_button');
hideBtn = document.getElementById('hide_button');
saveBtn = document.getElementById('save_button');
optionsBtn = document.getElementById('options_button');
returnBtn = document.getElementById('return_button');

// === Éléments du menu ===
connectBtn = document.getElementById('connect_button');
startBtn = document.getElementById('start_button');
loadBtn = document.getElementById('load_button');
settingsBtn = document.getElementById('settings_button');
creditsBtn = document.getElementById('credits_button');
defMenu = document.getElementById('default_menu');

// === Éléments de connexion ===
formLogin = document.getElementById('login');
inputUsrName = document.getElementById('inp_pseudo');
inputPswd = document.getElementById('inp_pswd');
inputSubmit = document.getElementById('inp_submit');
helpUsrName = document.querySelector('#login p');
liHelpPswd = document.querySelectorAll('#login ul>li');

// === Éléments de sauvegarde ===
saveDiv = document.getElementById('save_div');
closeSaveBtn = document.getElementById('close_save_button');
divButtonInSaveMenu = document.querySelector('#save_div .buttons');
resetAutoSaveBtn = document.getElementById('reset_auto_save_button');
listOfSaveBtn = document.querySelectorAll('#save_div .save_list');
listOfResetBtn = document.querySelectorAll('#save_div .reset_save');
listOfSaveSeparator = document.querySelectorAll('#save_div .separate_saves');

// === Éléments de debug (créés dynamiquement dans init.js) ===
sessionButtonsContainer = document.getElementById('session_buttons_container');
testSessionBtn = document.getElementById('test_session_btn');
resetSessionBtn = document.getElementById('reset_session_btn');

// === Elements du menu option ======
optionsDiv = document.getElementById('options_div');
closeOptionsBtn = document.getElementById('close_options_button');
fullscreenToggle = document.getElementById('fullscreen_toggle');
resolutionSelect = document.getElementById('resolution_select');
autoModeToggle = document.getElementById('auto_mode_toggle');
textSpeedSlider = document.getElementById('text_speed_slider');
textSpeedValue = document.getElementById('text_speed_value');
musicVolumeSlider = document.getElementById('music_volume_slider');
musicVolumeValue = document.getElementById('music_volume_value');