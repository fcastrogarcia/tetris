"use client";

import styles from "./page.module.css";
import { useTetris } from "./useTetris";
import cx from "classnames";

export default function Home() {
  const { layout } = useTetris();

  return (
    <main className={styles.main}>
      <div>
        {layout.map((row, i) => (
          <div className={styles.row} key={i.toString()}>
            {row.map(({ active }, i) => (
              <div
                className={cx({ [styles.cell]: true, [styles.filled]: active })}
                key={i.toString()}
              />
            ))}
          </div>
        ))}
      </div>
    </main>
  );
}
