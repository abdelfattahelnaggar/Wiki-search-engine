"use client";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import styles from "./style.module.css";

const vaildSearchTypes = [
  { name: "Wild card", value: "wildCard" },
  { name: "Phrase", value: "phrase" },
  { name: "Approximate", value: "approximate" },
  { name: "Boolean", value: "boolean" },
];

const SearchType = ({
  setSearchType,
  searchType,
}: {
  searchType: string;
  setSearchType: Dispatch<SetStateAction<string>>;
}) => {
  return (
    <div className={styles.searchTypeBox}>
      <div className={styles.title}>Select Search Type</div>
      <div className={styles.searchTypes}>
        {vaildSearchTypes.map((type, index) => (
          <div
            className={
              searchType == type.value
                ? styles.activeSearchType
                : styles.searchType
            }
            key={index}
            onClick={() => setSearchType(type.value)}
          >
            {type.name}
          </div>
        ))}
      </div>
    </div>
  );
};

export default SearchType;
