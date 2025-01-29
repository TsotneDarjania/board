// import { GamePLayObjectNames } from "../config/loadConfig";
// import { Board } from "../board";
import { Assets } from "pixi.js";
import { Game } from "../entities/game";
import { Scene, SceneAssetsType } from "../entities/scene";

export class GamePlayScene extends Scene {
  constructor(game: Game, assets: SceneAssetsType) {
    super(game, assets);
  }

  // This function will be automatically invoked after the assets are loaded.
  async start(): Promise<void> {
    // this.addBoard();
  }

  addBoard() {
    // Limitaions
    // 1. width and height of source images should be same
    // const board = new Board(this.width / 2, this.height / 2, 500, 400, {
    //   reelsCount: 3,
    //   symbolsPerReel: 3,
    //   spinDelayBetweenReels: 400, // in miliseconds
    //   symbolKeys: [GamePLayObjectNames.CrookAndFlail],
    //   initCombination: [
    //     [0, 0, 0],
    //     [0, 0, 0],
    //     [0, 0, 0],
    //   ],
    //   config: {
    //     symbolTextureOriginalWidth: 1500,
    //     symbolTextureOriginalHeight: 1500,
    //   },
    //   padding: 0,
    // });
    // this.add(board);
    // setTimeout(() => {
    //   board.startSpin();
    // }, 7000);
    // setTimeout(() => {
    //   board.stopSpin(
    //     [
    //       [0, 3, 2],
    //       [3, 4, 0],
    //       [2, 4, 0],
    //     ],
    //     {
    //       lines: [[0, 0, 0]],
    //     }
    //   );
    // }, 6000);
    // setTimeout(() => {
    //   board.startSpin();
    // }, 17000);
    // setTimeout(() => {
    //   board.stopSpin([
    //     [0, 3, 2],
    //     [3, 4, 0],
    //     [2, 4, 0],
    //     [2, 4, 0],
    //     [2, 4, 0],
    //   ]);
    // }, 20000);
  }
}
