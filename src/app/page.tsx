"use client";

import styles from "./page.module.css";
import { LAYOUT_LIMBO } from "./tetrisLayout";
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
        {layout.map((row, rowIndex) => (
          <div className={styles.row} key={rowIndex.toString()}>
            {row.map((shape, columnIndex) => (
              <div
                className={cx({
                  [styles.cell]: true,
                  [styles.filled]: shape.active,
                  [styles.hidden]: rowIndex < LAYOUT_LIMBO,
                  [getShapeStyle(shape?.id)]: true,
                })}
                key={columnIndex.toString()}
              />
            ))}
          </div>
        ))}
      </div>
    </main>
  );
}
