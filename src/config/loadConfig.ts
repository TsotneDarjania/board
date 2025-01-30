import { SceneAssetsType } from "../entities/scene";

export enum GamePLayObjectNames {
  CrookAndFlail = "crookjson",
  Eye = "eye",
  Pharaon = "pharaon",
  Pyramid = "pyramid",
}

export const gamePlayAssets: SceneAssetsType = [
  {
    alias: GamePLayObjectNames.CrookAndFlail,
    url: "../assets/animations/crook/skeleton.json",
    data: {
      scaleMode: "linear",
      autoGenerateMipMaps: true,
    },
  },
  {
    alias: GamePLayObjectNames.CrookAndFlail + "_atlas",
    url: "../assets/animations/crook/skeleton.atlas",
    data: {
      scaleMode: "linear",
      autoGenerateMipMaps: true,
    },
  },
  {
    alias: GamePLayObjectNames.Eye,
    url: "../assets/animations/eye/skeleton.json",
    data: {
      scaleMode: "linear",
      autoGenerateMipMaps: true,
    },
  },
  {
    alias: GamePLayObjectNames.Eye + "_atlas",
    url: "../assets/animations/eye/skeleton.atlas",
    data: {
      scaleMode: "linear",
      autoGenerateMipMaps: true,
    },
  },
  {
    alias: GamePLayObjectNames.Pharaon,
    url: "../assets/animations/pharaon/skeleton.json",
    data: {
      scaleMode: "linear",
      autoGenerateMipMaps: true,
    },
  },
  {
    alias: GamePLayObjectNames.Pharaon + "_atlas",
    url: "../assets/animations/pharaon/skeleton.atlas",
    data: {
      scaleMode: "linear",
      autoGenerateMipMaps: true,
    },
  },
  {
    alias: GamePLayObjectNames.Pyramid,
    url: "../assets/animations/pyramid/skeleton.json",
    data: {
      scaleMode: "linear",
      autoGenerateMipMaps: true,
    },
  },
  {
    alias: GamePLayObjectNames.Pyramid + "_atlas",
    url: "../assets/animations/pyramid/skeleton.atlas",
    data: {
      scaleMode: "linear",
      autoGenerateMipMaps: true,
    },
  },
];
