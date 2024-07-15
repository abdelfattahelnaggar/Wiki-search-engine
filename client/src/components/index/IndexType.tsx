"use client";
import { Dispatch, SetStateAction } from "react";
import style from "./style.module.css";
import RadioBox from "./RadioBox";

const IndexType = ({
  indexType,
  setIndexType,
}: {
  indexType: string;
  setIndexType: Dispatch<SetStateAction<string>>;
}) => {
  const indexTypes = ["Term-document index", "Inverted index", "Bi-word index"];
  return (
    <div className={style.index}>
      {indexTypes.map((value) => (
        <RadioBox
          key={value}
          value={value}
          indexType={indexType}
          setIndexType={setIndexType}
        />
      ))}
    </div>
  );
};

export default IndexType;
