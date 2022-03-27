import Head from "next/head";
import { useRouter } from "next/router";
import CountryDetails from "../../components/CountryDetails";
import Header from "../../components/Header";

const CountryPage = () => {
    const router = useRouter();
    const { country } = router.query;

    return (
        <div>
            <Head>
                <title>
                    {country} - REST Countries API with color theme switcher
                </title>
                <meta
                    name="description"
                    content="Made with <3 by Rudy B. This is my solution for REST Countries API FrontendMentor challenge."
                />
            </Head>
            <Header />
            <main id="content">
                {country !== undefined && typeof country === "string" ? (
                    <CountryDetails country={country} />
                ) : null}
            </main>
        </div>
    );
};

export default CountryPage;
