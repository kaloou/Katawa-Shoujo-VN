export const el = {
	// === Éléments du menu principal ===
	divMenu: document.getElementById('menu_screen'),
	mainMenu: document.getElementById('main_menu'),
	defaultMenu: document.getElementById('default_menu'),

	// === Éléments du jeu ===
	divGame: document.getElementById('game_screen'),
    gameScreen: document.getElementById('game_screen'),
	spriteStack: document.getElementById('sprite_stack'),
	nameElement: document.getElementById('name'),
	textElement: document.getElementById('text'),
	centeredText: document.getElementById('centered-text'),
	textOverlay: document.getElementById('text_overlay'),
	dialogContener: document.getElementById('dialog_container'),

	// === Éléments de l'écran d'échappement ===
	divEscape: document.getElementById('escape'),
	quitEscBtn: document.getElementById('quit_esc_button'),
	hideButton: document.getElementById('hide_button'),
	saveButton: document.getElementById('save_button'),
	returnBtn: document.getElementById('return_button'),

	// === Éléments du menu ===
	connectButton: document.getElementById('connect_button'),
	startButton: document.getElementById('start_button'),
	loadButton: document.getElementById('load_button'),
	settingsButton: document.getElementById('settings_button'),
	creditsButton: document.getElementById('credits_button'),

	// === Éléments de connexion ===
	loginForm: document.getElementById('login'),
	inputPseudo: document.getElementById('inp_pseudo'),
	inputPassword: document.getElementById('inp_pswd'),
	inputSubmit: document.getElementById('inp_submit'),

	// === Éléments de sauvegarde ===
	saveDiv: document.getElementById('save_div'),
	saveBtn: document.getElementById('save_button'),
	loadBtn: document.getElementById('load_button'),
	closeSaveBtn: document.getElementById('close_save_button'),
	divButtonInSaveMenu: document.querySelector('#save_div .buttons'),
	resetAutoSaveBtn: document.getElementById('reset_auto_save_button'),
	listOfSaveBtn: document.querySelectorAll('#save_div .save_list'),
	listOfResetBtn: document.querySelectorAll('#save_div .reset_save'),
	listOfSaveSeparator: document.querySelectorAll('#save_div separate_saves'),

	// === Éléments des crédits ===
	videoCredit: document.getElementById('bg-video'),
	playButtonCredits: document.getElementById('play_button_credits'),

	// === Éléments de debug (créés dynamiquement dans init.js) ===
	sessionButtonsContainer: document.getElementById('session_buttons_container'),
	testSessionBtn: document.getElementById('test_session_btn'),
	resetSessionBtn: document.getElementById('reset_session_btn')
};
