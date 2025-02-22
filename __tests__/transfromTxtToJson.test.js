import { expect, test } from "@jest/globals";
import transfromTxtToJson from "../src/utils/transfromTxtToJson.js";
import * as fs from "fs/promises";
import * as path from "path";
import { dirname } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));

const fixturesFolder = path.join(__dirname, "..", "__fixtures__");
const getFixturePath = (filename) => path.join(fixturesFolder, filename);

test("should create json file with correct data", async () => {
  const actualFuncResultFile = getFixturePath("words.json");

  await fs.unlink(actualFuncResultFile);

  await transfromTxtToJson("words.txt", fixturesFolder);

  const outputData = await fs.readFile(actualFuncResultFile, "utf8");
  const actual = JSON.parse(outputData);

  const expectedData = await fs.readFile(
    getFixturePath("expectedWords.json"),
    "utf8",
  );
  const expected = JSON.parse(expectedData);

  expect(actual).toEqual(expected);
});
