"use client";
import React, { useEffect, useState } from "react";
import styles from "./style.module.css";
import search from "@/api/search";

interface Result {
  title: string;
  filePath: string;
}

const Input = ({
  indexType,
  searchType,
}: {
  indexType: string;
  searchType: string;
}) => {
  const [results, setResults] = useState<Result[]>([]);
  const [text, setText] = useState<string>("");
  useEffect(() => {
    if (text.length)
      search(text, indexType, searchType).then((newResults) => {
    console.log({results, newResults})
    if(newResults?.length>0)
        setResults(newResults);
      });
    else setResults([]);
  }, [text, indexType, searchType]);

  return (
    <div className={styles.inputBox}>
      <input
        type="text"
        value={text}
        onChange={({ target: { value } }) => setText(value)}
      />
      <i className="fa-solid fa-magnifying-glass"></i>
      {results.length > 0 && (
        <div className={styles.results}>
          {results.map(({ title, filePath }, index) => (
            <div className={styles.result} key={index}>
              <div className={styles.title}>{`${title.slice(0, 25)}${
                title.length > 25 ? "..." : ""
              }`}</div>
              <a
                target="_blank"
                href={`${process.env.NEXT_PUBLIC_SERVER_URL}${filePath}`}
                className={styles.filePath}
              >
                <i className="fa-solid fa-arrow-right"></i>
              </a>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Input;
