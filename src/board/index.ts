import { Container, Graphics } from "pixi.js";
import { Reel } from "./reel";
import { ReelStatusEvents } from "./enums";

export type boardDataType = {
  reelsCount: number;
  symbolsPerReel: number;
  spinDelayBetweenReels: number;
  symbolKeys: Array<string>;
  initCombination: Array<number>[];
  config: {
    symbolTextureOriginalWidth: number;
    symbolTextureOriginalHeight: number;
  };
  padding: number;
};

export type boardWinningType = {
  lines: number[][];
};

export class Board extends Container {
  state: "readyForSpin" | "startSpin" | "spinning" | "FinishedSpin" =
    "readyForSpin";
  command: "none" | "stop" = "none";
  reels: Reel[] = [];

  slotSymbolWidth = 0;
  slotSymbolHeight = 0;

  symbolBoxWidth = 0;
  symbolBoxHeight = 0;

  winnings: boardWinningType | undefined;

  resultCombination!: number[][] | undefined;

  constructor(
    public posX: number,
    public posY: number,
    public displayWidth: number,
    public displayHeight: number,
    public boardData: boardDataType
  ) {
    super({ x: posX, y: posY });

    if (!this.validate()) return;

    this.symbolBoxWidth =
      (displayWidth - boardData.padding) / boardData.reelsCount;
    this.symbolBoxHeight = displayHeight / boardData.symbolsPerReel;

    this.slotSymbolWidth = Math.min(this.symbolBoxWidth, this.symbolBoxHeight);
    this.slotSymbolHeight = Math.min(this.symbolBoxWidth, this.symbolBoxHeight);

    this.init();
  }

  private validate() {
    this.boardData.initCombination.forEach((combination) => {
      combination.forEach((n) => {
        if (n > this.boardData.symbolKeys.length - 1) {
          console.error(
            `InitCombination is not valid because of this index  ---> ${n}`
          );
          return false;
        }
      });
    });

    if (this.boardData.reelsCount > this.boardData.initCombination.length) {
      console.error(
        `InitCombination is not valid because reels number is ---> ${this.boardData.reelsCount}`
      );
      return false;
    }
    return true;
  }

  private init() {
    this.addReels();
    this.addReelEventListeners();
    this.addMask();
  }

  private addReelEventListeners() {
    this.reels.forEach((reel) => {
      reel.spinManager.eventEmitter.on(ReelStatusEvents.SpinIsStarted, () => {
        if (reel === this.reels[this.reels.length - 1]) {
          this.state = "spinning";
          if (this.command === "stop") {
            this.stopSpin();
          }
        }
      });
      reel.spinManager.eventEmitter.on(
        ReelStatusEvents.ReelSpinIsFinished,
        () => {
          if (reel === this.reels[this.reels.length - 1]) {
            this.finishSpin();
          }
        }
      );
    });
  }

  private finishSpin() {
    this.state = "FinishedSpin";
    if (this.winnings) {
      this.showWinningAnimations();
    }
  }

  private reset() {
    this.winnings = undefined;
    this.resultCombination = undefined;
    this.command = "none";
    this.state = "readyForSpin";
  }

  private showWinningAnimations() {
    console.log("Show Winning Animations");
  }

  private addMask() {
    const mask = new Graphics()
      .rect(
        -this.displayWidth / 2,
        -this.displayHeight / 2,
        this.displayWidth,
        this.displayHeight - 5
      )
      .fill();

    this.mask = mask;
    this.addChild(mask);
  }

  private addReels() {
    for (let i = 0; i < this.boardData.reelsCount; i++) {
      const reel = new Reel(
        this,
        this.boardData.initCombination[i],
        -(this.symbolBoxWidth - this.slotSymbolWidth) / 2 -
          this.displayWidth / 2 +
          this.symbolBoxWidth / 2 +
          i *
            (this.displayWidth / this.boardData.reelsCount +
              (this.symbolBoxWidth - this.slotSymbolWidth) /
                (this.boardData.reelsCount - 1))
      );
      this.reels.push(reel);
      this.addChild(reel);
    }
  }

  public startSpin() {
    if (this.state !== "readyForSpin") {
      console.warn("Board is not Ready for spin");
      return;
    }
    this.state = "startSpin";

    this.reels.forEach((reel, i) => {
      setTimeout(() => {
        reel.startSpin();
      }, i * this.boardData.spinDelayBetweenReels);
    });
  }

  public stopSpin(
    combination?: Array<Array<number>>,
    winnings?: {
      lines: number[][];
    }
  ) {
    if (winnings) {
      this.winnings = winnings;
    }

    if (combination) {
      this.resultCombination = combination;
    }

    if (this.state !== "spinning") {
      console.warn("Board is not ready for stop");
      this.command = "stop";
      return;
    }

    if (this.resultCombination === undefined) {
      console.error("Result Combination Is not Defined");
      return;
    }

    this.reels.forEach((reel, i) => {
      setTimeout(() => {
        reel.stopSpin(this.resultCombination![i]);
      }, i * this.boardData.spinDelayBetweenReels);
    });
  }
}
