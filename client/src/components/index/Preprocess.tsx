"use client";
import { Dispatch, SetStateAction } from "react";
import style from "./style.module.css";

const Preprocess = ({
  preprocess,
  setPreprocess,
}: {
  preprocess: string[];
  setPreprocess: Dispatch<SetStateAction<string[]>>;
}) => {
  const availablePreprocess = [
    "Tokenization",
    "Stop words",
    "Lemmatization",
    "Stemming",
    "Normalization",
  ];
  function clickOn(value: string, checked: boolean) {
    if (checked) setPreprocess([...preprocess, value]);
    else
      setPreprocess([...preprocess.filter((preproces) => preproces != value)]);
  }

  return (
    <div className={style.preprocess}>
      {availablePreprocess.map((value) => (
        <div className={style.preprocessBox} key={value}>
          <input
            type="checkbox"
            value={value}
            onChange={(e) => clickOn(value, e.target.checked)}
          />
          <div className={style.text}>{value}</div>
        </div>
      ))}
    </div>
  );
};

export default Preprocess;
