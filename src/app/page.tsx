"use client";

import styles from "./page.module.css";
import getPreview from "./preview";
import { LAYOUT_LIMBO } from "./tetrisLayout";
import { useTetris } from "./useTetris";
import cx from "classnames";

function getShapeStyle(type: string | null) {
  let style = "";
  if (type) {
    style = styles[type];
  }
  return style;
}

export default function Home() {
  const { layout, shapes, toggleGameAction, playing } = useTetris();

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
                  [getShapeStyle(shape?.type)]: true,
                })}
                key={columnIndex.toString()}
              />
            ))}
          </div>
        ))}
      </div>
      <div className={styles["side-panel"]}>
        <div className={styles.preview}>{getPreview(shapes[1].type)}</div>
        <button onClick={toggleGameAction}>{playing ? "PAUSE" : "PLAY"}</button>
      </div>
    </main>
  );
}
