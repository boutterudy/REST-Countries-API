import type { NextPage } from "next";
import Head from "next/head";
import { useRouter } from "next/router";
import { useContext, useEffect, useState } from "react";
import CountriesList from "../components/CountriesList";
import Header from "../components/Header";
import { FaviconContext } from "../context/FaviconContext";
import Country from "../types/country";
import RestCountries from "../utils/RestCountries";

const Home: NextPage = () => {
    return (
        <div>
            <Head>
                <title>REST Countries API with color theme switcher</title>
                <meta
                    name="description"
                    content="Made with <3 by Rudy B. This is my solution for REST Countries API FrontendMentor challenge."
                />
            </Head>
            <Header />
            <main id="content">
                <CountriesList />
            </main>
        </div>
    );
};

export default Home;
