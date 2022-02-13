import fse from "fs-extra";
import { dirname, resolve } from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);

const __dirname = dirname(__filename);
const assetsDir = resolve(__dirname, "../", "dist/assets");
const oldPath = resolve(__dirname, "../", "src/assets/favicon.svg");
const newPath = resolve(__dirname, "../", "dist/assets/favicon.svg");

if (!fse.existsSync(assetsDir)) {
  fse.mkdirSync(assetsDir);
}

fse.copyFile(oldPath, newPath, () =>
  console.log("Moved favicon.svg to 'dist' directory", { oldPath, newPath })
);
