const fs = require("fs");
const path = require("path");
const { promisify } = require("util");

const readFileAsync = promisify(fs.readFile);
const readdirAsync = promisify(fs.readdir);
const writeFileAsync = promisify(fs.writeFile);

const applyPreprocess = require("./preprocess");

class BuildIndex {
  folderPath = path.join(__dirname, "../public/dataset");
  constructor(preprocess) {
    this.preprocess = preprocess;
    this.index = {};
  }
  async createIndex() {
    try {
      const files = await readdirAsync(this.folderPath);
      for (const file of files) {
        if (file.endsWith(".txt")) {
          const filePath = path.join(this.folderPath, file);
          const text = await readFileAsync(filePath, "utf-8");
          const processedText = applyPreprocess(
            text.slice(0, 1000),
            this.preprocess
          );
          (async () =>
            this.addToIndex(
              processedText,
              filePath.split("public").at(-1),
              text.split("\n")[0]
            ))().then(() => console.log(`done ${text.split("\n")[0]}`));
        }
      }
      return this.index;
    } catch (error) {
      console.error("Error creating index:", error);
    }
  }
  pushToIndex(word, data) {
    if (!this.index[word]) this.index[word] = [{ ...data, count: 1 }];
    let isExist = false;
    for (const i in this.index[word]) {
      if (this.index[word][i].filePath == data.filePath) {
        this.index[word][i].count++;
        isExist = true;
      }
    }
    if (!isExist) this.index[word].push({ ...data, count: 1 });
  }
  async getTitle(filePath) {
    try {
      const fileContent = await readFileAsync(filePath, "utf-8");
      const firstLine = fileContent.split("\n")[0];
      return firstLine.trim();
    } catch (error) {
      console.error("Error reading file:", error);
      return null;
    }
  }
  async save(type) {
    const filePath = path.join(__dirname, `../indices/${type}.json`);
    try {
      await writeFileAsync(
        filePath,
        JSON.stringify(this.index, null, 2),
        "utf-8"
      );
    } catch (error) {
      console.error("Error writing to file:", error);
    }
  }
}

module.exports = BuildIndex;
