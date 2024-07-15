"use client";
import styles from "./style.module.css";
import Image from "next/image";
import Input from "./Input";
import { useRouter } from "next/navigation";
import { useState } from "react";
import SearchType from "./SearchType";

const Search = ({ indexType }: { indexType: string }) => {
  const router = useRouter();
  const [searchType, setSearchType] = useState<string>("approximate");
  return (
    <div className={styles.page}>
      <Image
        src="/wiki.png"
        width={200}
        height={200}
        alt="Wikipedia"
        className={styles.image}
        priority={true}
      />
      <SearchType searchType={searchType} setSearchType={setSearchType} />
      <Input
        searchType={decodeURI(searchType)}
        indexType={decodeURI(indexType)}
      />
      <div className={styles.backBtn} onClick={() => router.push(`/new_index`)}>
        <i className="fa-solid fa-chevron-left"></i>
        <p>Create New Index</p>
      </div>
    </div>
  );
};

export default Search;
