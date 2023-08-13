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
            {row.map((filled, i) => (
              <div
                className={cx({ [styles.cell]: true, [styles.filled]: filled })}
                key={i.toString()}
              />
            ))}
          </div>
        ))}
      </div>
    </main>
  );
}
