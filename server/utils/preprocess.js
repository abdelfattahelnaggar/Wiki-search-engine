const natural = require("natural");

function tokenize(text) {
  const tokenizer = new natural.WordTokenizer();
  return tokenizer.tokenize(text).join(" ");
}

function removeStopwords(text) {
  const stopwords = new Set(natural.stopwords);
  return text
    .split(" ")
    .filter((word) => !stopwords.has(word))
    .join(" ");
}

function lemmatize(text) {
  const tokenizer = new natural.WordTokenizer();
  const words = tokenizer.tokenize(text);
  const lemmatizedWords = words.map((word) =>
    natural.LancasterStemmer.stem(word)
  );
  return lemmatizedWords.join(" ");
}

function stem(text) {
  const stemmer = natural.PorterStemmer;
  return text
    .split(" ")
    .map((word) => stemmer.stem(word))
    .join(" ");
}

function normalize(text) {
  return text.replace(/[.,\/#!$%\^&\*;:{}=\-_`~()]/g, "");
}

module.exports = (text, preprocessors) => {
  let processedText = text.toLowerCase();
  for (const step of preprocessors) {
    switch (step) {
      case "Tokenization":
        processedText = tokenize(processedText);
        break;
      case "Stop words":
        processedText = removeStopwords(processedText);
        break;
      case "Lemmatization":
        processedText = lemmatize(processedText);
        break;
      case "Stemming":
        processedText = stem(processedText);
        break;
      case "Normalization":
        processedText = normalize(processedText);
        break;
      default:
        break;
    }
  }
  return processedText;
};
