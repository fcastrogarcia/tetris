import styles from "../page.module.css";
import cx from "classnames";

const className = {
  [styles.cell]: true,
  [styles.s]: true,
  [styles.filled]: true,
};

export default function S() {
  return (
    <div style={{ display: "flex", alignItems: "flex-end" }}>
      <div>
        <div className={cx(className)}></div>
      </div>
      <div>
        <div className={cx(className)}></div>
        <div className={cx(className)}></div>
      </div>
      <div style={{ alignSelf: "flex-start" }}>
        <div className={cx(className)}></div>
      </div>
    </div>
  );
}
