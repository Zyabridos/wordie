import fs from "fs/promises";
import { dirname } from "path";
import { fileURLToPath } from "url";
import * as path from "path";

const __dirname = dirname(fileURLToPath(import.meta.url));
const publicFolder = path.join(__dirname, "..", "..", "public");

const transfromTxtToJson = async (fileName, outputFolder = publicFolder) => {
  try {
    const txtFileFullPath = path.join(outputFolder, fileName);
    const data = await fs.readFile(txtFileFullPath, "utf-8");
    const words = data.split("\n").map((word) => word.trim().toLowerCase());
    const result = words.map((word, index) => {
      return { id: index + 1, word };
    });
    const jsonFileName = fileName.split(".")[0] + ".json";
    const jsonFileFullPath = path.join(outputFolder, jsonFileName);
    await fs.writeFile(jsonFileFullPath, JSON.stringify(result, null, 2));
  } catch (error) {
    console.error("Failed to convert from txt to JSON");
    return;
  }
};

export default transfromTxtToJson;
