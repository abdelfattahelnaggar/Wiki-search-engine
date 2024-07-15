"use client";
import styles from "./style.module.css";

const Loader = () => {
  return (
    <div className={styles.container}>
      <svg className={styles.loader}>
        <circle cx={145} cy={145} r={140} />
      </svg>
    </div>
  );
};

export default Loader;
