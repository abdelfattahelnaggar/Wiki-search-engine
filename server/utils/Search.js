const fs = require("fs");
const path = require("path");
const { promisify } = require("util");
const natural = require("natural");
const unique = require("./unique");
const readFileAsync = promisify(fs.readFile);
const BASD = require("@basd/search");
const { log } = require("console");
const search = new BASD();

class Search {
  #indexPath = "";
  #Allkeys = [];
  #data = [];
  constructor(index) {
    this.#indexPath = path.join(__dirname, `../indices/${index}.json`);
  }
  async setKeys() {
    try {
      const text = await readFileAsync(this.#indexPath, "utf-8");
      this.#data = JSON.parse(text);
      this.#Allkeys = Object.keys(this.#data);
      console.log({x: this.#Allkeys,y:this.#data});
    } catch (error) {
      console.error(error);
      throw new Error(error);
    }
  }
  #getValues(keys) {
    const suggestions = [];
    keys.forEach((key) => {
      const value = this.#data[key];
      if (Array.isArray(value)) suggestions.push(...value);
    });
    return unique(suggestions);
  }
  wildCard(word) {
    const pattern = new RegExp(word.replace("*", ".*").replace("?", "."));
    const answer = [];
    for (const key of this.#Allkeys) if (pattern.test(key)) answer.push(key);
    return this.#getValues(answer);
  }
  phrase(word) {
    return unique(this.#data[word]);
  }
  approximate(word) {
    const jaroWinkler = natural.JaroWinklerDistance;
    const answer = [];
    for (const key of this.#Allkeys)
      if (jaroWinkler(key, word) >= 0.8) answer.push(key);
    return this.#getValues(answer);
  }
  boolean(query) {
    const evaluator = search.evaluator(query);
    const answer = [];
    for (const key of this.#Allkeys) if (evaluator(key)) answer.push(key);
    return this.#getValues(answer);
  }

  get Allkeys() {
    return this.#Allkeys;
  }
}

module.exports = Search;
