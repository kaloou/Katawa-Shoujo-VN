document.addEventListener("DOMContentLoaded", () => {
    let regex8Char = /.{10,}/;
    let regexMaj = /[A-Z]/;
    let regexMin = /[a-z]/;
    let regexNum = /[0-9]/;
    let regexSpeChar = /[a-zA-z0-9]/;

    let connected = false;

    const connectBtn = document.getElementById("connect_button");
    const startBtn = document.getElementById("start_button");
    const divMenu = document.getElementById("menu");
    const divGame = document.getElementById("game");
    const inputPswd = document.getElementById("inp_pswd");
    const ulTestPswd = document.querySelectorAll("#inp_pswd>ul>li");
    const inputSubmit = document.getElementById("inp_submit");

    inputSubmit.addEventListener("click", (event) => {event.preventDefault()})

    connectBtn.addEventListener("click", Connect);

    startBtn.addEventListener("click", Start);

    inputPswd.addEventListener("keydown", CheckValidPassword);

    connectBtn.addEventListener("mouseenter", WantDisconnect);
    connectBtn.addEventListener("mouseleave", PrintConnected);

    function Connect()
    {
        if(!connected)
        {
            connected = true;
            PrintConnected();
        }
    }

    function Disconnect() {
        if(connected)
        {
            connected = false;
            NotConnected();
            connectBtn.removeEventListener("click", Disconnect);
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
            connectBtn.addEventListener("click", Disconnect);
            connectBtn.textContent = "Se déconnecter ?";
            connectBtn.style.boxShadow = "0px 0px 0px 0.08vw #FF8D7C";
            connectBtn.style.backgroundColor = "#FF8D7C";
        }
    }

    function CheckValidPassword() {
        text_input = inputPswd.value.trim();
        inputPswd.style.backgroundColor = "#ff0000";
        if(regex8Char.test(text_input))
        {
            ulTestPswd[1].style.color = "#99B681";
        }
        else
        {
            
        }

        if(regexMaj.test(text_input))
        {
            ulTestPswd[2].style.color = "#99B681";
        }
        else
        {

        }

        if(regexMin.test(text_input))
        {
            ulTestPswd[3].style.color = "#99B681"
        }
        else
        {

        }

        if(regexMin.test(text_input))
        {
            ulTestPswd[4].style.color = "#99B681";
        }
        else
        {
            
        }

        if(regexSpeChar.test(text_input))
        {
            ulTestPswd[5].style.color = "#99B681";
        }
        else
        {

        }
    }
});