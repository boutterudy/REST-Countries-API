import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { useContext, useEffect, useState } from "react";
import { FaviconContext } from "../../context/FaviconContext";
import { FiltersContext } from "../../context/FiltersContext";
import Country from "../../types/country";
import DataFormatter from "../../utils/DataFormatter";
import RestCountries from "../../utils/RestCountries";
import FilterByRegionDropdown from "../FilterByRegionDropdown";
import Loader from "../Loader";
import SearchBar from "../SearchBar";
import styles from "./CountriesList.module.scss";
import noResultImage from "../../public/no-result.png";

const CountriesList = () => {
    const [countries, setCountries] = useState<Country[]>([]);
    const { filterCountries, searchBar, region } = useContext(FiltersContext);
    const { setFavicon } = useContext(FaviconContext);
    const router = useRouter();

    useEffect(() => {
        const result = RestCountries.all();
        result.then((value) => setCountries(value));
    }, []);

    useEffect(() => {
        const intervalId = setInterval(() => {
            if (countries.length > 0) {
                let newIcon =
                    countries[Math.floor(Math.random() * countries.length)]
                        .flags.svg;
                setFavicon(newIcon);
            }
        }, 1000);

        return () => window.clearInterval(intervalId);
    }, [countries, setFavicon]);

    let content: React.ReactElement[] | React.ReactElement;
    let noResult = false;
    let loading = countries.length === 0;
    if (loading) {
        content = <Loader className={styles.loader} />;
    } else {
        // Filter countries
        content = filterCountries(countries).map((country, index) => {
            return (
                (<Link
                    href={
                        "/countries/" +
                        DataFormatter.countryNameToUri(country.name)
                    }
                    key={index}
                >
                    <div className={styles.countryCard}>
                        <div className={styles.flagContainer}>
                            <Image
                                src={country.flags.svg}
                                alt={country.name + " flag"}
                                quality={100}
                                className={styles.flag}
                                priority={true}
                                fill
                                sizes="100vw"
                                style={{
                                    objectFit: "cover",
                                    objectPosition: "50% 50%"
                                }} />
                        </div>
                        <div className={styles.informations}>
                            <h2 className={styles.name}>{country.name}</h2>
                            <ul>
                                <li>
                                    <span className={styles.field}>
                                        Population:
                                    </span>{" "}
                                    {DataFormatter.formatNumber(
                                        country.population
                                    )}
                                </li>
                                <li>
                                    <span className={styles.field}>
                                        Region:
                                    </span>{" "}
                                    {country.region}
                                </li>
                                <li>
                                    <span className={styles.field}>
                                        Capital:
                                    </span>{" "}
                                    {country.capital
                                        ? country.capital
                                        : "No capital"}
                                </li>
                            </ul>
                        </div>
                    </div>
                </Link>)
            );
        });

        // If no countries available after filters
        if (content.length === 0) {
            noResult = true;
            content = (
                <div className={styles.noResult}>
                    <Image
                        alt={
                            "A man is watching a map trying to find " +
                            searchBar +
                            " on earth"
                        }
                        src={noResultImage}
                        width="225"
                        height="225"
                        style={{
                            maxWidth: "100%",
                            height: "auto"
                        }} />
                    <h2>
                        {region === null
                            ? DataFormatter.capitalize(searchBar) +
                              "  seems not to be found on our earth!"
                            : DataFormatter.capitalize(searchBar) +
                              " seems not to be found in " +
                              region +
                              "!"}
                    </h2>
                </div>
            );
        }
    }

    return (
        <div>
            <section className={styles.filters}>
                <SearchBar className={styles.input} />
                <FilterByRegionDropdown className={styles.regionFilter} />
            </section>
            <section
                className={
                    loading
                        ? styles.loading + " " + styles.countriesList
                        : noResult
                        ? styles.noResult
                        : styles.countriesList
                }
            >
                {content}
            </section>
        </div>
    );
};

export default CountriesList;
