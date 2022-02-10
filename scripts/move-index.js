import fse from "fs-extra";
import { dirname, resolve } from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);

const __dirname = dirname(__filename);
const oldPath = resolve(__dirname, "../", "src/index.html");
const newPath = resolve(__dirname, "../", "dist/index.html");

fse.copyFile(oldPath, newPath, () =>
  console.log("Moved index.html to 'dist' directory", { oldPath, newPath })
);
