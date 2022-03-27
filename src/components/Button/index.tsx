import { NextPage } from "next";
import styles from "./Button.module.scss";

interface Props {
    className?: string;
    children: React.ReactNode;
    onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
}

const Button: NextPage<Props> = (props) => {
    const { className, children, onClick, ...otherProps } = props;
    return (
        <button
            className={
                className !== undefined
                    ? className + " " + styles.button
                    : styles.button
            }
            onClick={onClick !== undefined ? onClick : undefined}
            {...otherProps}
        >
            {children}
        </button>
    );
};

export default Button;
