import { Text } from "pixi.js";

export class CustomText extends Text {
  constructor(
    public innerText: string,
    public xPos: number,
    public yPos: number,
    public fontFamily?: string
  ) {
    super({ text: innerText });
    this.x = xPos;
    this.y = yPos;
    this.anchor = 0.5;

    this.style.fontFamily = fontFamily ? fontFamily : "";
  }
}
