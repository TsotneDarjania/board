import { Game } from "./entities/game";
import { fontEnums } from "./enums/fontEnums";

// Here, we will load assets before initializing the Pixi application.
async function preload() {
  // Fonts
  const customFontfontFace_1 = new FontFace(
    fontEnums.customFont_1,
    "url('../assets/fonts/custom-font.otf')"
  );
  await customFontfontFace_1.load().then((loadedFont) => {
    document.fonts.add(loadedFont);
  });
}

async function main() {
  await preload();
  new Game();
}

document.addEventListener("DOMContentLoaded", () => {
  main().catch((err) => {
    console.error("Error during initialization:", err);
  });
});
