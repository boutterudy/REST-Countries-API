import React, { createContext, useEffect, useState } from "react";

type Props = {
    children: React.ReactNode;
};

const defaultState = {
    dark: false,
    toggleDark: () => {},
};

const ThemeContext = createContext(defaultState);

const ThemeProvider = ({ children }: Props) => {
    const [dark, setDark] = useState(false);

    useEffect(() => {
        const lsDark = localStorage.getItem("dark");
        if (lsDark !== null) {
            setDark(JSON.parse(lsDark));
        }
    }, []);

    const toggleDark = () => {
        const d = document.documentElement;
        const themes = ["theme--default", "theme--dark"];
        console.log("document", d);
        if (dark) {
            d.classList.remove(...themes);
            d.classList.add("theme");
            d.classList.add("theme--default");
            // "theme " + (darkMode ? "theme--dark" : "theme--default")
        } else {
            d.classList.remove(...themes);
            d.classList.add("theme");
            d.classList.add("theme--dark");
        }
        localStorage.setItem("dark", JSON.stringify(!dark));
        setDark(!dark);
    };

    return (
        <ThemeContext.Provider
            value={{
                dark,
                toggleDark,
            }}
        >
            {children}
        </ThemeContext.Provider>
    );
};
export default ThemeContext;
export { ThemeProvider };
