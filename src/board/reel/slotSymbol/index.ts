import { SymbolStatusEvents } from "../../enums/index";
import { Spine } from "@esotericsoftware/spine-pixi-v8";
import { Container, EventEmitter } from "pixi.js";

export class SlotSymbol extends Container {
  spine!: Spine;
  eventEmitter!: EventEmitter;

  constructor(public key: string, posY: number, width: number, height: number) {
    super();
    this.eventEmitter = new EventEmitter();

    this.y = posY;
    this.width = width;
    this.height = height;

    this.spine = Spine.from({
      skeleton: key,
      atlas: key + "_atlas",
    });

    this.spine.state.setAnimation(0, "Static", true);
    this.spine.width = width - 17;
    this.spine.height = height - 17;

    this.addChild(this.spine);
  }

  playWinAnimation() {
    this.spine.state.setAnimation(0, "Win", false).listener = {
      complete: () => {
        this.eventEmitter.emit(SymbolStatusEvents.winninAnimationFinished);
      },
    };
  }
}
