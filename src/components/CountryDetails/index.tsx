import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { useContext, useEffect, useState } from "react";
import { FaviconContext } from "../../context/FaviconContext";
import Country from "../../types/country";
import DataFormatter from "../../utils/DataFormatter";
import RestCountries from "../../utils/RestCountries";
import Button from "../Button";
import Icon from "../Icon";
import Loader from "../Loader";
import styles from "./CountryDetails.module.scss";

type Props = {
    country: string;
};

const CountryDetails = ({ country }: Props) => {
    const [details, setDetails] = useState<Country>();
    const [borders, setBorders] = useState<Country[]>();
    const { setFavicon } = useContext(FaviconContext);
    const router = useRouter();

    useEffect(() => {
        const countryDetails = RestCountries.get(
            DataFormatter.uriToCountryName(country)
        );
        countryDetails.then((value) => {
            if (value.status === 404) {
                router.replace("/");
            } else {
                setDetails(value[0]);
                if (value[0].borders !== undefined) {
                    const borderCountries = RestCountries.getByCodes(
                        value[0].borders
                    );
                    borderCountries.then((value) => {
                        setBorders(value);
                    });
                } else {
                    setBorders([]);
                }
            }
        });
    }, [country, router]);

    useEffect(() => {
        if (details !== undefined) {
            setFavicon(details.flags.svg);
        }
    }, [details, setFavicon]);

    let content;
    if (details === undefined || borders === undefined) {
        content = <Loader className={styles.loader} />;
    } else {
        content = (
            <div>
                <Head>
                    <title>
                        {details.name} - REST Countries API with color theme
                        switcher
                    </title>
                </Head>
                <div className={styles.country}>
                    <div className={styles.flagContainer}>
                        <Image
                            src={details.flags.svg}
                            alt={details.name + " flag"}
                            quality={100}
                            priority={true}
                            fill
                            sizes="100vw"
                            style={{
                                objectFit: "contain",
                                objectPosition: "50% 0"
                            }} />
                    </div>
                    <div
                        className={
                            borders.length > 0
                                ? styles.informations
                                : styles.informations + " " + styles.noBorder
                        }
                    >
                        <h2 className={styles.title}>{details.name}</h2>
                        <ul className={styles.details}>
                            <div>
                                <li>
                                    <span className={styles.field}>
                                        Native Name:
                                    </span>{" "}
                                    {details.nativeName}
                                </li>
                                <li>
                                    <span className={styles.field}>
                                        Population:
                                    </span>{" "}
                                    {DataFormatter.formatNumber(
                                        details.population
                                    )}
                                </li>
                                <li>
                                    <span className={styles.field}>
                                        Region:
                                    </span>{" "}
                                    {details.region}
                                </li>
                                <li>
                                    <span className={styles.field}>
                                        Sub Region:
                                    </span>{" "}
                                    {details.subregion}
                                </li>
                                <li>
                                    <span className={styles.field}>
                                        Capital:
                                    </span>{" "}
                                    {details.capital
                                        ? details.capital
                                        : "No capital"}
                                </li>
                            </div>
                            <div>
                                <li>
                                    <span className={styles.field}>
                                        Top Level Domain:
                                    </span>{" "}
                                    {details.topLevelDomain}
                                </li>
                                <li>
                                    <span className={styles.field}>
                                        Currencies:
                                    </span>{" "}
                                    {details.currencies === undefined
                                        ? "No currency"
                                        : details.currencies
                                              .map((cur) => cur.name)
                                              .join(", ")}
                                </li>
                                <li>
                                    <span className={styles.field}>
                                        Languages:
                                    </span>{" "}
                                    {details.languages
                                        .map((lang) => lang.name)
                                        .join(", ")}
                                </li>
                            </div>
                        </ul>
                        <ul className={styles.borderCountries}>
                            <p>
                                <span className={styles.field}>
                                    Border Countries:
                                </span>
                                {borders.length === 0 ? " No country" : null}
                            </p>
                            {borders.length > 0 ? (
                                <li className={styles.list}>
                                    {borders.map((country, index) => (
                                        <Link href={"/countries/" + country.name} key={index} passHref legacyBehavior>
                                            <button>{country.name}</button>
                                        </Link>
                                    ))}
                                </li>
                            ) : null}
                        </ul>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className={styles.page}>
            <Button onClick={() => router.back()} className={styles.backButton}>
                <Icon
                    lib="remix-icon"
                    icon="arrow-left-line"
                    className={styles.icon}
                />{" "}
                Back
            </Button>
            <div>{content}</div>
        </div>
    );
};

export default CountryDetails;
