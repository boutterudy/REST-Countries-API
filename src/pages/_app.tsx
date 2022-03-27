import "../styles/globals.scss";
import "remixicon/fonts/remixicon.css";
import type { AppProps } from "next/app";
import { ThemeProvider } from "../context/ThemeContext";
import { FiltersProvider } from "../context/FiltersContext";
import { FaviconProvider } from "../context/FaviconContext";

function MyApp({ Component, pageProps }: AppProps) {
    return (
        <>
            <ThemeProvider>
                <FaviconProvider>
                    <FiltersProvider>
                        <Component {...pageProps} />
                    </FiltersProvider>
                </FaviconProvider>
            </ThemeProvider>
        </>
    );
}

export default MyApp;
