import styles from "../page.module.css";
import cx from "classnames";

const className = {
  [styles.cell]: true,
  [styles.z]: true,
  [styles.filled]: true,
};

export default function Z() {
  return (
    <div style={{ display: "flex", alignItems: "flex-end" }}>
      <div style={{ alignSelf: "flex-start" }}>
        <div className={cx(className)}></div>
      </div>
      <div>
        <div className={cx(className)}></div>
        <div className={cx(className)}></div>
      </div>
      <div>
        <div className={cx(className)}></div>
      </div>
    </div>
  );
}
