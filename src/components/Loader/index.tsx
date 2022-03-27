import styles from "./Loader.module.scss";

type Props = {
    className?: string;
};
const Loader = ({ className }: Props) => {
    return (
        <span
            className={
                className !== undefined
                    ? className + " " + styles.loader
                    : styles.loader
            }
        ></span>
    );
};
export default Loader;
