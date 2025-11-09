document.addEventListener("DOMContentLoaded", () => {
    let connected = false;

    const connectBtn = document.getElementById("connect_button");
    const startBtn = document.getElementById("start_button");
    const divMenu = document.getElementById("menu_screen");
    const divGame = document.getElementById("game_screen");

    connectBtn.addEventListener("click", Connect);

    startBtn.addEventListener("click", Start);

    connectBtn.addEventListener("mouseenter", WantDisconnect);
    connectBtn.addEventListener("mouseleave", PrintConnected);

    function Connect()
    {
        connected = true;
    }

    function Disconnect() {
        if(connected)
        {
            connected = false;
            NotConnected();
        }
    }

    function Start() {
        if (connected) {
            divMenu.style.display = "none";
            divGame.style.display = "block";
        }
        else {
            NotConnected();
        }
    }

    function NotConnected() {
        // je crée une fonction car on l'utilisera aussi pour le bouton charger
        connectBtn.textContent = "Se Connecter";
        connectBtn.style.boxShadow = "0px 0px 0px 0.08vw #eb243b"; // code couleur : https://katawashoujo.fandom.com/wiki/Main_Page/Characters
        connectBtn.style.backgroundColor = "#eb243b";
    }

    function PrintConnected() {
        if (connected) {
            connectBtn.textContent = "Vous êtes connecté";
            connectBtn.style.boxShadow = "0px 0px 0px 0.08vw #99B681";
            connectBtn.style.backgroundColor = "#99B681";
            //2c9e31
            //99B681
        }
    }

    function WantDisconnect() {
        if(connected)
        {
            connectBtn.textContent = "Se déconnecter ?";
            connectBtn.style.boxShadow = "0px 0px 0px 0.08vw #FF8D7C";
            connectBtn.style.backgroundColor = "#FF8D7C";
            connectBtn.addEventListener("click", Disconnect);
        }
    }
});