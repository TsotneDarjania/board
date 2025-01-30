import { Game } from "../entities/game";
import { Scene, SceneAssetsType } from "../entities/scene";
import { GamePLayObjectNames } from "../config/loadConfig";
import { Board } from "../board";

export class GamePlayScene extends Scene {
  constructor(game: Game, assets: SceneAssetsType) {
    super(game, assets);
  }

  // This function will be automatically invoked after the assets are loaded.
  start(): void {
    this.addBoard();
  }

  addBoard() {
    // Limitaions
    // 1. width and height of source images should be same
    const board = new Board(this.width / 2, this.height / 2, 500, 500, {
      reelsCount: 3,
      symbolsPerReel: 3,
      spinDelayBetweenReels: 400, // in miliseconds
      symbolKeys: [
        GamePLayObjectNames.CrookAndFlail,
        GamePLayObjectNames.Eye,
        GamePLayObjectNames.Pharaon,
        GamePLayObjectNames.Pyramid,
      ],
      initCombination: [
        [0, 1, 2],
        [3, 0, 0],
        [0, 0, 0],
      ],
      config: {
        symbolTextureOriginalWidth: 1500,
        symbolTextureOriginalHeight: 1500,
      },
      padding: 0,
      spinDuration: 0.13,
      spinStyle: "classic",
    });
    this.add(board);

    setTimeout(() => {
      board.startSpin();
    }, 3000);
    setTimeout(() => {
      board.stopSpin(
        [
          [0, 0, 0],
          [0, 0, 0],
          [0, 0, 0],
        ],
        {
          lines: [
            [0, 0, 0],
            [1, 1, 1],
          ],
        }
      );
    }, 6000);
    setTimeout(() => {
      board.startSpin();
    }, 11000);
    setTimeout(() => {
      board.stopSpin([
        [0, 0, 2],
        [0, 2, 0],
        [1, 1, 0],
      ]);
    }, 11000);
  }
}
