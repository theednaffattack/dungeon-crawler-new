import fse from "fs-extra";
import { resolve } from "path";

const oldPath = resolve(__dirname, "../", "src/index.html");
const newPath = resolve(__dirname, "../", "dist/index.html");

fse.copyFile(oldPath, newPath, () =>
  console.log("Moved lazy.js to 'dist/assets' directory", { oldPath, newPath })
);
