// import { Boot } from "./scenes/Boot";
// import { GameOver } from "./scenes/GameOver";
// import { Game as MainGame } from "./scenes/Game";
// import { MainMenu } from "./scenes/MainMenu";
import { AUTO, Game } from "phaser";
// import { Preloader } from "./scenes/Preloader";
import Level1 from "./scenes/Level1";

//  Find out more information about the Game Config at:
//  https://docs.phaser.io/api-documentation/typedef/types-core#gameconfig
const config: Phaser.Types.Core.GameConfig = {
  type: AUTO,
  width: 800,
  height: 600,
  physics: {
    default: "arcade",
    arcade: {
      gravity: { x: 0, y: 300 },
      debug: true,
    },
  },
  scene: [Level1],
};

const StartGame = (parent: string) => {
  return new Game({ ...config, parent });
};

export default StartGame;
