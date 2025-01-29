import { Assets, AssetsClass } from "pixi.js";

export class GameResources extends AssetsClass {
  constructor() {
    super();
  }

  public async startLoadAssets() {
    await Assets.load([
      // Character Animation
      {
        alias: "CharacterSkeleton",
        src: "../assets/animation/character/Personality.json",
        data: {
          scaleMode: "linear",
          autoGenerateMipmaps: true,
        },
      },
      {
        alias: "CharacterAtlas",
        src: "../assets/animation/character/Personality.atlas",
        data: {
          scaleMode: "linear",
          autoGenerateMipmaps: true,
        },
      },
    ]);
  }
}
