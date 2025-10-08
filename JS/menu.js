document.addEventListener("DOMContentLoaded", () => {

  window.onload = function() {
    const startBtn = document.getElementById("start_button");
    const creditsBtn = document.getElementById("credits_button");
    const connectBtn = document.getElementById("connect_button");
    const settingsBtn = document.getElementById("settings_button");

    const divMenu = document.getElementById("menu");
    const divGame = document.getElementById("game");

    const divEscape = document.getElementById("escape");

    let connected = false;

    divEscape.style.display = "none";

    // if(connected)
    // {
    //   divMenu.style.display = "none";
    //   divGame.style.display = "block";
    // }
    // else
    // {
    //   divMenu.style.display = "block";
    //   divGame.style.display = "none";
    // }

    connectBtn.addEventListener("click", Connect);

    startBtn.addEventListener("click", Start);

    creditsBtn.addEventListener("click", () => {
      window.location.href = "HTML/credits.html";
    });

    settingsBtn.addEventListener("click", OpenEscape);
    

    divEscape.addEventListener("click", GameToMenu);

    document.addEventListener("keydown", PressEscape);

    function Start()
    {
      if(connected)
      {
        divMenu.style.display = "none";
        divGame.style.display = "block";
      }
      else
      {
        NotConnected(); 
      }
    }

    function NotConnected() // je crée une fonction car on l'utilisera aussi pour le bouton charger
    {
      connectBtn.style.boxShadow = "0px 0px 0px 0.08vw #eb243b"; // code couleur : https://katawashoujo.fandom.com/wiki/Main_Page/Characters
      connectBtn.style.backgroundColor = "#eb243b";
    }

    function Connect()
    {
      connected = true;
      if(connected)
      {
        connectBtn.textContent = "Vous êtes connecté";
        connectBtn.style.boxShadow = "0px 0px 0px 0.08vw #2c9e31";
        connectBtn.style.backgroundColor = "#2c9e31";
      }
    }

    function PressEscape(event)
    {
      if(event.key == "Escape")
      {
        OpenEscape();
      }
    }

    function OpenEscape()
    {
      if(divEscape.style.display=="none")
      {
        divEscape.style.display = "flex";

      }
      else if(divEscape.style.display=="flex")
      {
        divEscape.style.display = "none";
      }
    }

    function GameToMenu()
    {
      divMenu.style.display = "flex";
      divGame.style.display = "none";
      divEscape.style.display = "none"; // supprimer ça après
    }
  }
});

