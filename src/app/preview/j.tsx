import styles from "../page.module.css";
import cx from "classnames";

const className = {
  [styles.cell]: true,
  [styles.j]: true,
  [styles.filled]: true,
};

export default function J() {
  return (
    <div style={{ display: "flex", alignItems: "flex-end" }}>
      <div>
        <div className={cx(className)}></div>
      </div>
      <div>
        <div className={cx(className)}></div>
        <div className={cx(className)}></div>
        <div className={cx(className)}></div>
      </div>
    </div>
  );
}
