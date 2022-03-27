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

const CountriesList = () => {
    const [countries, setCountries] = useState<Country[]>([]);
    const { filterCountries } = useContext(FiltersContext);
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

    let content;
    let loading = countries.length === 0;
    if (loading) {
        content = <Loader className={styles.loader} />;
    } else {
        content = filterCountries(countries).map((country, index) => {
            return (
                <Link href={"/countries/" + country.name} key={index}>
                    <div className={styles.countryCard}>
                        <div className={styles.flagContainer}>
                            <Image
                                src={country.flags.svg}
                                alt={country.name + " flag"}
                                layout="fill"
                                objectFit="cover"
                                quality={100}
                                className={styles.flag}
                                objectPosition="50% 50%"
                            />
                        </div>
                        <div className={styles.informations}>
                            <p className={styles.name}>{country.name}</p>
                            <p>
                                <span className={styles.field}>
                                    Population:
                                </span>{" "}
                                {DataFormatter.formatNumber(country.population)}
                            </p>
                            <p>
                                <span className={styles.field}>Region:</span>{" "}
                                {country.region}
                            </p>
                            <p>
                                <span className={styles.field}>Capital:</span>{" "}
                                {country.capital}
                            </p>
                        </div>
                    </div>
                </Link>
            );
        });
    }

    return (
        <div>
            <form className={styles.filters}>
                <SearchBar className={styles.input} />
                <FilterByRegionDropdown className={styles.regionFilter} />
            </form>
            <div
                className={
                    loading
                        ? styles.loading + " " + styles.countriesList
                        : styles.countriesList
                }
            >
                {content}
            </div>
        </div>
    );
};

export default CountriesList;
