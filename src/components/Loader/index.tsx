import styles from "./Loader.module.scss";
import { CSSProperties } from 'react';

type Props = {
  className?: string;
  style?: CSSProperties;
};
const Loader = ({ className, style}: Props) => {
  return (
    <span
      className={
        className !== undefined
          ? className + " " + styles.loader
          : styles.loader
      }
      style={style}
    ></span>
  );
};
export default Loader;
