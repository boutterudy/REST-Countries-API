import Head from "next/head";
import { createContext, ReactNode, useContext, useState } from "react";

type faviconType = {
    favicon: string;
    setFavicon: (value: string) => void;
};

const faviconContextDefault: faviconType = {
    favicon: "",
    setFavicon: () => {},
};

export const FaviconContext = createContext<faviconType>(faviconContextDefault);

export function useFilters() {
    return useContext(FaviconContext);
}

type Props = {
    children: ReactNode;
};

export function FaviconProvider({ children }: Props) {
    const [favicon, setFavicon] = useState<string>("");

    const value = {
        favicon,
        setFavicon,
    };

    return (
        <>
            <FaviconContext.Provider value={value}>
                <Head>
                    <link rel="icon" href={favicon} />
                </Head>
                {children}
            </FaviconContext.Provider>
        </>
    );
}
