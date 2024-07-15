"use client";
import { Dispatch, SetStateAction, useRef } from "react";
import style from "./style.module.css";

const RadioBox = ({
  value,
  setIndexType,
}: {
  value: string;
  indexType: string;
  setIndexType: Dispatch<SetStateAction<string>>;
}) => {
  const ref = useRef<HTMLInputElement | null>(null);
  return (
    <div
      className={style.radioBox}
      onClick={() => {
        setIndexType(value);
        ref.current?.click();
      }}
    >
      <input type="radio" name="index-type" value={value} ref={ref} />
      <div className={style.text}>{value}</div>
    </div>
  );
};
export default RadioBox;
