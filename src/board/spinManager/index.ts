import { Reel } from "../reel";
import { calculatePercentage, getRandomIntInRange } from "../helper/math";
import { SlotSymbol } from "../reel/slotSymbol";
import gsap from "gsap";
import { EventEmitter } from "pixi.js";
import { ReelStatusEvents } from "../enums";

export class SpinManager {
  public eventEmitter!: EventEmitter;
  private isAlreadySentSpinEvenet = false;

  private isLastSpin = false;
  private resultCombination: number[] = [];

  downMotionDistance = 0;

  constructor(public reel: Reel, public symbolKeys: string[]) {
    this.eventEmitter = new EventEmitter();

    this.downMotionDistance =
      reel.paddingBetweenSymbols -
      reel.board.slotSymbolHeight +
      this.reel.board.displayHeight;
  }

  private addNextSymbols() {
    for (let i = 0; i < this.reel.board.boardData.symbolsPerReel; i++) {
      const symbol = new SlotSymbol(
        this.isLastSpin
          ? this.symbolKeys[this.resultCombination[i]]
          : this.symbolKeys[getRandomIntInRange(0, this.symbolKeys.length - 1)],
        this.reel.topSymbolPositionY -
          this.reel.paddingBetweenSymbols -
          i * this.reel.paddingBetweenSymbols -
          this.reel.y,
        this.reel.board.slotSymbolWidth,
        this.reel.board.slotSymbolHeight
      );
      this.reel.addChild(symbol);
    }
  }

  public startSpin() {
    this.addNextSymbols();
    this.reel.board.boardData.spinStyle === "classic"
      ? this.goUp()
      : this.goDown(
          this.reel.y + this.downMotionDistance,
          "back.in",
          this.reel.board.boardData.spinDuration * 1.5
        );
  }

  private goUp() {
    gsap.to(this.reel, {
      duration:
        this.reel.board.boardData.spinDuration +
        this.reel.board.boardData.spinDuration * 1.5,
      y: this.reel.y - calculatePercentage(25, this.reel.board.displayHeight),
      // ease: "back"
      ease: this.reel.board.boardData.spinStyle === "classic" ? "back.in" : "",
      onComplete: () => {
        this.goDown(
          this.reel.y +
            calculatePercentage(25, this.reel.board.displayHeight) +
            this.downMotionDistance,
          "sine.in",
          this.reel.board.boardData.spinDuration +
            this.reel.board.boardData.spinDuration * 0.8
        );
      },
    });
  }

  private goDown(targetY: number, style: string, duration: number) {
    gsap.to(this.reel, {
      duration: duration,
      y: targetY,
      ease: style,
      onComplete: () => {
        this.reel.children
          .slice(0, this.reel.board.boardData.symbolsPerReel)
          .forEach((symbol) => {
            symbol.destroy();
          });

        if (!this.isAlreadySentSpinEvenet) {
          this.eventEmitter.emit(ReelStatusEvents.SpinIsStarted);
          this.isAlreadySentSpinEvenet = true;
        }

        if (this.isLastSpin) {
          this.lastGoDown();
          return;
        }

        this.addNextSymbols();
        this.goDown(
          this.reel.y + this.downMotionDistance,
          "none",
          this.reel.board.boardData.spinDuration
        );
      },
    });
  }

  private lastGoDown() {
    this.addNextSymbols();
    this.lastSpin(
      this.reel.y + this.downMotionDistance,
      this.reel.board.boardData.spinStyle ? "back.out" : "circ.out",
      this.reel.board.boardData.spinDuration +
        this.reel.board.boardData.spinStyle ===
        "classic"
        ? this.reel.board.boardData.spinDuration * 3
        : this.reel.board.boardData.spinDuration * 3.5
    );
  }

  private lastSpin(targetY: number, style: string, duration: number) {
    gsap.to(this.reel, {
      duration: duration,
      y: targetY,
      ease: style,
      onComplete: () => {
        this.reel.children
          .slice(0, this.reel.board.boardData.symbolsPerReel)
          .forEach((symbol) => {
            symbol.destroy();
          });

        this.eventEmitter.emit(ReelStatusEvents.ReelSpinIsFinished);
        this.reset();
      },
    });
  }

  public stopSpin(combination: number[]) {
    this.isLastSpin = true;
    this.resultCombination = combination;
  }

  public reset() {
    this.isLastSpin = false;
    this.isAlreadySentSpinEvenet = false;
  }
}

// May We Will use Later

// private updateSymbolOpacity() {
//   const topBorder = this.reel.board.y - this.reel.board.displayHeight / 2;
//   const bottomBorder = this.reel.board.y + this.reel.board.displayHeight / 2;

//   this.reel.children.forEach((symbol) => {
//     const symbolY = symbol.toGlobal(this.reel.board).y;

//     // Calculate opacity based on proximity to the borders
//     if (symbolY <= topBorder || symbolY >= bottomBorder) {
//       symbol.alpha = 0; // Fully transparent
//     } else {
//       const distanceToBorder = Math.min(
//         Math.abs(symbolY - topBorder),
//         Math.abs(symbolY - bottomBorder)
//       );
//       const maxDistance = this.reel.board.displayHeight / 4; // Adjust this value as needed
//       symbol.alpha = Math.max(0, Math.min(1, distanceToBorder / maxDistance)); // Normalize to [0, 1]
//     }
//   });
// }
