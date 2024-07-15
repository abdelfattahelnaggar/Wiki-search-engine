const BuildIndex = require("./BuildIndex");

class InvertedIndex extends BuildIndex {
  constructor(preprocess) {
    super(preprocess);
  }
  addToIndex(text, filePath, title) {
    for (const word of text.split(" ")) {
      if (word.length < 4) continue;
      this.pushToIndex(word, {
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
const indexBuilder = new InvertedIndex(availablePreprocess);
indexBuilder
  .createIndex()
  .then(async () => await indexBuilder.save("Inverted"))
  .catch((error) => {
    console.error("Error:", error);
  });

module.exports = InvertedIndex;
