import Game from "./assets/game";

const launchButton = document.getElementById("launchButton");
launchButton.addEventListener("click", () => new Game());
