// import { SceneAssetsType } from "@/entities/scene";

import { SceneAssetsType } from "@/entities/scene";

export enum GamePLayObjectNames {
  CrookAndFlail = "crook",
  Eye = "eye",
  Pharaon = "pharaon",
  Pyramid = "pyramid",
}

export const gamePlayAssets: SceneAssetsType = [
  {
    alias: "crookJson",
    url: "../assets/animations/crook/skeleton.json",
    data: {
      scaleMode: "linear",
      autoGenerateMipMaps: true,
    },
  },
  {
    alias: "crookAtlas",
    url: "../assets/animations/crook/skeleton.atlas",
    data: {
      scaleMode: "linear",
      autoGenerateMipMaps: true,
    },
  },
];
