import { Assets, Container, ContainerChild } from "pixi.js";
import { Game } from "./game";

export type SceneAssetsType = Array<{
  alias: string;
  url: string;
  data?: {
    scaleMode?: "linear" | "nearest";
    autoGenerateMipMaps?: boolean;
  };
}>;

export abstract class Scene {
  width: number = 0;
  height: number = 0;

  mainContainer!: Container;

  constructor(public game: Game, public assets: SceneAssetsType) {
    this.init();
  }

  async init() {
    this.mainContainer = this.game.stage;
    this.width = Number(this.game.canvas.style.width.replace("px", ""));
    this.height = Number(this.game.canvas.style.height.replace("px", ""));

    await this.load(this.assets, (progress) => {
      let loadedPercentage = Math.floor(progress * 100);
      console.log(loadedPercentage);
    });

    this.start();
  }

  async load(
    assets: Array<{
      alias: string;
      url: string;
      data?: {
        scaleMode?: "linear" | "nearest";
        autoGenerateMipmaps?: boolean;
      };
    }>,
    onProgress: (progress: number) => void
  ) {
    let loadedCount = 0;

    // Function to handle asset loading with progress tracking
    const loadAsset = async (asset: {
      alias: string;
      url: string;
      data?: {
        scaleMode?: "linear" | "nearest";
        autoGenerateMipmaps?: boolean;
      };
    }) => {
      console.log(asset);
      // await Assets.load({
      //   alias: asset.alias,
      //   src: asset.url,
      //   data: asset.data || {},
      // });

      // Increment the count of loaded assets and update progress
      loadedCount++;
      const progress = loadedCount / assets.length;
      onProgress(progress);
    };

    // Load all assets with progress tracking
    await Promise.all(assets.map((asset) => loadAsset(asset)));
  }

  add(obj: ContainerChild) {
    this.mainContainer.addChild(obj);
  }

  remove(obj: ContainerChild) {
    this.mainContainer.removeChild(obj);
  }

  abstract start(): void;
}
