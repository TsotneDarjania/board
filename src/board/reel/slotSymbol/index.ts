import { Sprite, Texture } from "pixi.js";

export class SlotSymbol extends Sprite {
  constructor(public key: string, posY: number, width: number, height: number) {
    super(Texture.from(key));

    this.y = posY;
    this.width = width;
    this.height = height;

    this.anchor = 0.5;
  }
}
