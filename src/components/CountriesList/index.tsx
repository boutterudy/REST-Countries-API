'use client';
import Image from 'next/image';
import Link from 'next/link';
import { useContext, useState, useEffect } from 'react';
import { FiltersContext } from '../../context/FiltersContext';
import Country from '../../types/country';
import DataFormatter from '../../utils/DataFormatter';
import FilterByRegionDropdown from '../FilterByRegionDropdown';
import SearchBar from '../SearchBar';
import styles from './CountriesList.module.scss';
import noResultImage from '../../public/no-result.png';

type CountriesListProps = {
  countries: Country[];
};

const CountriesList = ({ countries }: CountriesListProps) => {
  const { filterCountries, searchBar, region } = useContext(FiltersContext);

  const [visibleCount, setVisibleCount] = useState(20); // Tracks how many countries are displayed
  const [noResult, setNoResult] = useState(false);

  // Filtered countries
  const filteredCountries = filterCountries(countries);

  // Infinite scrolling
  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.innerHeight + document.documentElement.scrollTop;
      const scrollHeight = document.documentElement.offsetHeight;

      if (scrollPosition >= scrollHeight * 0.5) {
        setVisibleCount((prev) => Math.min(prev + 20, filteredCountries.length));
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [filteredCountries]);

  // Generate content
  const content = filteredCountries.slice(0, visibleCount).map((country, index) => (
    <Link
      href={'/countries/' + DataFormatter.countryNameToUri(country.name)}
      key={index}
      legacyBehavior
    >
      <div className={styles.countryCard}>
        <div className={styles.flagContainer}>
          <Image
            src={country.flags.svg}
            alt={country.name + ' flag'}
            quality={100}
            className={styles.flag}
            priority={index < 20} // Prioritize loading for the first 20 countries
            fill
            sizes="100vw"
            style={{
              objectFit: 'cover',
              objectPosition: '50% 50%',
            }}
          />
        </div>
        <div className={styles.informations}>
          <h2 className={styles.name}>{country.name}</h2>
          <ul>
            <li>
              <span className={styles.field}>Population:</span>{' '}
              {DataFormatter.formatNumber(country.population)}
            </li>
            <li>
              <span className={styles.field}>Region:</span> {country.region}
            </li>
            <li>
              <span className={styles.field}>Capital:</span>{' '}
              {country.capital ? country.capital : 'No capital'}
            </li>
          </ul>
        </div>
      </div>
    </Link>
  ));

  // Handle no results case
  useEffect(() => {
    setNoResult(filteredCountries.length === 0);
  }, [filteredCountries]);

  const noResultContent = (
    <div className={styles.noResult}>
      <Image
        alt={
          'A man is watching a map trying to find ' +
          searchBar +
          ' on earth'
        }
        src={noResultImage}
        width="225"
        height="225"
        style={{
          maxWidth: '100%',
          height: 'auto',
        }}
      />
      <h2>
        {region === null
          ? DataFormatter.capitalize(searchBar) +
          '  seems not to be found on our earth!'
          : DataFormatter.capitalize(searchBar) +
          ' seems not to be found in ' +
          region +
          '!'}
      </h2>
    </div>
  );

  return (
    <div>
      <section className={styles.filters}>
        <SearchBar className={styles.input} />
        <FilterByRegionDropdown className={styles.regionFilter} />
      </section>
      <section
        className={noResult
          ? styles.noResult
          : styles.countriesList
        }
      >
        {noResult ? noResultContent : content}
      </section>
    </div>
  );
};

export default CountriesList;
