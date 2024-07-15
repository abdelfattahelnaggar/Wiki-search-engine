const express = require("express");
const router = express.Router();
const TermDocumentIndex = require("../utils/TermDocumentIndex");
const BiWordIndex = require("../utils/BiWordIndex");
const InvertedIndex = require("../utils/InvertedIndex");
const Search = require("../utils/Search");

const indexTypes = ["Term-document index", "Inverted index", "Bi-word index"];
const availablePreprocess = [
  "Tokenization",
  "Stop words",
  "Lemmatization",
  "Stemming",
  "Normalization",
];
const searchTypes = ["wildCard", "phrase", "approximate", "boolean"];

router.post("/createIndex/:type", async function (req, res) {
  try {
    let { type } = req.params;
    type = decodeURI(type);
    const { preprocess } = req.body;
    preprocess.map((preproces) => {
      if (!availablePreprocess.includes(preproces))
        throw new Error(`preprocess ${preproces} is not supported`);
    });
    switch (type) {
      case "Term-document index":
        const termDocumentIndex = new TermDocumentIndex(availablePreprocess);
        await termDocumentIndex.createIndex();
        await termDocumentIndex.save("TermDocument");
        break;
      case "Inverted index":
        const invertedIndex = new InvertedIndex(availablePreprocess);
        await invertedIndex.createIndex();
        await invertedIndex.save("Inverted");
        break;
      case "Bi-word index":
        const biWordIndex = new BiWordIndex(availablePreprocess);
        await biWordIndex.createIndex();
        await biWordIndex.save("BiWord");
        break;
      default:
        throw new Error(`${type} is not supported`);
    }
    return res.json({ message: `The ${type} was created successfully` });
  } catch (error) {
    console.error(error);
    return res.status(400).send(error.message);
  }
});
router.get("/search/:searchType/:type/:text", async function (req, res) {
  try {
    let { text, type, searchType } = req.params;
    console.log(  { text, type, searchType });
    text = decodeURI(text);
    if (text.length == 0) return res.json({ suggestions: [] });
    type = decodeURI(type);
    if (!indexTypes.includes(type)) throw new Error(`${type} is not supported`);
    let search;
    switch (type) {
      case "Term-document index":
        search = new Search("TermDocument");
        await search.setKeys();
        return res.json({ suggestions: await search[searchType](text) });
      case "Inverted index":
        search = new Search("Inverted");
        await search.setKeys();
        return res.json({ suggestions: await search[searchType](text) });
      case "Bi-word index":
        search = new Search("BiWord");
        await search.setKeys();
        return res.json({ suggestions: await search[searchType](text) });
    }
  } catch (error) {
    console.error(error);
    return res.status(400).send(error.message);
  }
});
module.exports = router;
