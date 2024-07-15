const BuildIndex = require("./BuildIndex");

class TermDocumentIndex extends BuildIndex {
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
    if (!this.index[word]) return (this.index[word] = [{ ...data, count: 1 }]);
    let isExist = false;
    for (const i in this.index[word]) {
      if (this.index[word][i].filePath == data.filePath) {
        this.index[word][i].count++;
        isExist = true;
      }
    }
    if (!isExist) this.index[word].push({ ...data, count: 1 });
  }
}
const availablePreprocess = [
  "Tokenization",
  "Stop words",
  "Lemmatization",
  "Stemming",
  "Normalization",
];
const indexBuilder = new TermDocumentIndex(availablePreprocess);
indexBuilder
  .createIndex()
  .then(async () => await indexBuilder.save("TermDocument"))
  .catch((error) => {
    console.error("Error:", error);
  });

module.exports = TermDocumentIndex;
