import styles from "../page.module.css";
import cx from "classnames";

const className = {
  [styles.cell]: true,
  [styles.bar]: true,
  [styles.filled]: true,
};

export default function Bar() {
  return (
    <div style={{ display: "flex", alignItems: "flex-end" }}>
      <div className={cx(className)}></div>
      <div className={cx(className)}></div>
      <div className={cx(className)}></div>
      <div className={cx(className)}></div>
    </div>
  );
}
