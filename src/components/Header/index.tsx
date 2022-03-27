import { useContext } from "react";
import ThemeContext from "../../context/ThemeContext";
import Icon from "../Icon";
import styles from "./Header.module.scss";

const Header = () => {
    const { dark, toggleDark } = useContext(ThemeContext);

    return (
        <header className={styles.header}>
            <h1 className={styles.title}>Where in the world?</h1>
            <button
                className={styles.darkModeButton}
                onClick={() => toggleDark()}
            >
                <Icon
                    lib="remix-icon"
                    icon={dark ? "sun-fill" : "moon-line"}
                    className={styles.icon}
                />{" "}
                {dark ? "Light Mode" : "Dark Mode"}
            </button>
        </header>
    );
};

export default Header;
