import { Container } from "pixi.js";
import { Board } from "..";
import { SlotSymbol } from "./slotSymbol";
import { SpinManager } from "../spinManager";
import { GlowFilter } from "pixi-filters";
import gsap from "gsap";

export class Reel extends Container {
  glowFilter!: GlowFilter;

  spinManager!: SpinManager;
  slotSymbols: SlotSymbol[] = [];

  topSymbolPositionY = 0;

  paddingBetweenSymbols = 0;
  initReelHeight = 0;

  constructor(
    public board: Board,
    public combination: Array<number>,
    public posX: number
  ) {
    super();

    this.x = posX;

    this.init();
  }

  private init() {
    this.calculatePaddingBetweenSymbols();
    this.initSymbols();
    this.createSpinManager();
  }

  calculatePaddingBetweenSymbols() {
    this.paddingBetweenSymbols =
      this.board.displayHeight / this.board.boardData.symbolsPerReel +
      (this.board.symbolBoxHeight - this.board.slotSymbolHeight) /
        (this.board.boardData.symbolsPerReel - 1);
  }

  addGlowEffect() {
    this.glowFilter = new GlowFilter({
      distance: 24,
      innerStrength: 1, // Start from 0 for animation
      outerStrength: 35, // Start from 0 for animation
      color: "#F5BB8A",
      quality: 0.1,
      alpha: 0, // Start from 0 for animation
    });

    // Add the filter to the object
    this.filters = [this.glowFilter];

    // Animate the filter properties with GSAP
    gsap.to(this.glowFilter, {
      innerStrength: 5,
      outerStrength: 5,
      alpha: 0.2,
      delay: 0.4,
      duration: 1.7, // Animation duration in seconds
      ease: "power2.out", // Choose the easing function
    });
  }

  removeGlowEffect() {
    // Animate the filter properties with GSAP
    gsap.to(this.glowFilter, {
      innerStrength: 5,
      outerStrength: 5,
      alpha: 0,
      delay: 0.2,
      duration: 1.7, // Animation duration in seconds
      ease: "power2.out", // Choose the easing function
    });
  }

  private initSymbols() {
    for (let i = 0; i < this.board.boardData.symbolsPerReel; i++) {
      const symbol = new SlotSymbol(
        this.board.boardData.symbolKeys[this.combination[i]],
        -(this.board.symbolBoxHeight - this.board.slotSymbolHeight) / 2 -
          this.board.displayHeight / 2 +
          this.board.symbolBoxHeight / 2 +
          i * this.paddingBetweenSymbols,
        this.board.slotSymbolWidth,
        this.board.slotSymbolHeight
      );
      if (i === 0) {
        this.topSymbolPositionY = symbol.y;
      }
      this.slotSymbols.push(symbol);
      this.addChild(symbol);
    }
  }

  private createSpinManager() {
    this.spinManager = new SpinManager(this, {
      spinStyle: "classic",
      symbolKeys: this.board.boardData.symbolKeys,
    });
  }

  public startSpin() {
    this.addGlowEffect();
    this.spinManager.startSpin();
  }

  public stopSpin(combination: number[]) {
    this.removeGlowEffect();
    this.spinManager.stopSpin(combination);
  }
}
