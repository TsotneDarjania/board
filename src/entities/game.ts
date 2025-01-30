import { GamePlayScene } from "../scenes/gameplay";
import gameConfig from "../config/gameConfig";
import { Application, Assets } from "pixi.js";
import { gamePlayAssets } from "../config/loadConfig";

export class Game extends Application {
  gamePlayScene!: GamePlayScene;

  constructor() {
    super();

    this.setup()
      .then(async () => {
        console.log(Assets.cache);
        this.startGame();
      })
      .catch((err) => {
        throw new Error(err);
      });
  }

  private async setup() {
    await this.init({
      background: gameConfig.backgroundColor,
      resizeTo: window,
      antialias: true,
      resolution: window.devicePixelRatio || 1,
      autoDensity: true,
      roundPixels: true,
    });
    document.getElementById(gameConfig.htmlRootId)!.appendChild(this.canvas);
  }

  startGame() {
    this.gamePlayScene = new GamePlayScene(this, gamePlayAssets);
  }
}
