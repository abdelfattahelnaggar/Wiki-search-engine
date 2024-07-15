"use client";
import { useState } from "react";
import style from "./style.module.css";
import IndexType from "./IndexType";
import Preprocess from "./Preprocess";
import Loader from "../loader/Loader";
import createIndex from "../../api/createIndex";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";

const Index = () => {
  const [indexType, setIndexType] = useState<string>("");
  const [preprocess, setPreprocess] = useState<string[]>([]);
  const [isLoad, setIsLoad] = useState<boolean>(false);
  const router = useRouter();

  const handleSubmit = async () => {
    try {
      setIsLoad(true);
      toast.info("The index is being created");
      await createIndex(indexType, preprocess);
      setIsLoad(false);
      toast.success("The index created successfully");
      router.push(`/search/${encodeURI(indexType)}`);
    } catch (error) {
      console.error(error);
      toast.error(`${error}`);
      setIsLoad(false);
    }
  };
  return (
    <>
      <div className={style.page}>
        <div className={style.title}>Wiki Search Engine </div>
        <div className={style.row}>
          <IndexType indexType={indexType} setIndexType={setIndexType} />
          <Preprocess preprocess={preprocess} setPreprocess={setPreprocess} />
        </div>
        <div className={style.btn} onClick={() => handleSubmit()}>
          Create New Index
        </div>
      </div>
      {isLoad && <Loader />}
    </>
  );
};

export default Index;
