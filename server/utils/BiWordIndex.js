const BuildIndex = require("./BuildIndex");

class BiWordIndex extends BuildIndex {
  constructor(preprocess) {
    super(preprocess);
  }
  addToIndex(text, filePath, title) {
    const splited = text
      .split(" ")
      .filter((text) => text.length > 4 && isNaN(+text));
    for (const i in splited) {
      if (!splited[i + 1]) continue;
      this.pushToIndex(`${splited[i]} ${splited[i + 1]}`, {
        filePath,
        title,
      });
    }
  }
  pushToIndex(word, data) {
    if (!this.index[word]) return (this.index[word] = [{ ...data }]);
    if (
      this.index[word].findIndex(({ filePath }) => filePath == data.filePath) ==
      -1
    )
      this.index[word].push({ ...data });
  }
}
const availablePreprocess = [
  "Tokenization",
  "Stop words",
  "Lemmatization",
  "Stemming",
  "Normalization",
];
const indexBuilder = new BiWordIndex(availablePreprocess);
indexBuilder
  .createIndex()
  .then(async () => await indexBuilder.save("BiWord"))
  .catch((error) => {
    console.error("Error:", error);
  });

module.exports = BiWordIndex;
