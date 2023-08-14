"use client";

import styles from "./page.module.css";
import { useTetris } from "./useTetris";
import cx from "classnames";

function getShapeStyle(id: string | null) {
  let style = "";
  if (id) {
    style = styles[id];
  }
  return style;
}

export default function Home() {
  const { layout } = useTetris();

  return (
    <main className={styles.main}>
      <div>
        {layout.map((row, i) => (
          <div className={styles.row} key={i.toString()}>
            {row.map((shape, i) => (
              <div
                className={cx({
                  [styles.cell]: true,
                  [styles.filled]: shape.active,
                  [getShapeStyle(shape?.id)]: true,
                })}
                key={i.toString()}
              />
            ))}
          </div>
        ))}
      </div>
    </main>
  );
}
