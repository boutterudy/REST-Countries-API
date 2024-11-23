'use client';
import Image from 'next/image';
import Link from 'next/link';
import { useContext, useState, useEffect, useMemo, useCallback } from 'react';
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

  const [visibleCount, setVisibleCount] = useState(5); // Tracks how many countries are displayed
  const [increment, setIncrement] = useState(5); // Increment value for visible countries
  const [noResult, setNoResult] = useState(false);
  const [usePng, setUsePng] = useState(false); // Tracks whether to use PNG

  // Adjust visibleCount and increment based on screen size
  useEffect(() => {
    const adjustCountForScreenSize = () => {
      if (window.innerWidth <= 768) {
        setVisibleCount(5);
        setIncrement(5);
        setUsePng(true); // Use PNG on mobile
      } else if (window.innerWidth <= 1024) {
        setVisibleCount(10);
        setIncrement(10);
        setUsePng(true); // Use PNG on tablets
      } else {
        setVisibleCount(20);
        setIncrement(20);
        setUsePng(false); // Use SVG on larger screens
      }
    };

    adjustCountForScreenSize(); // Set initial values
    window.addEventListener('resize', adjustCountForScreenSize);

    return () => {
      window.removeEventListener('resize', adjustCountForScreenSize);
    };
  }, []);

  // Filtered countries
  const filteredCountries = useMemo(
    () => filterCountries(countries),
    [countries, filterCountries]
  );

  // Infinite scrolling
  const handleScroll = useCallback(() => {
    const scrollPosition =
      window.innerHeight + document.documentElement.scrollTop;
    const scrollHeight = document.documentElement.offsetHeight;

    const isMobile = window.innerWidth <= 768;
    const scrollThreshold = isMobile ? 0.85 : 0.5; // 85% for mobile, 50% for others

    if (scrollPosition >= scrollHeight * scrollThreshold) {
      setVisibleCount((prev) =>
        Math.min(prev + increment, filteredCountries.length)
      );
    }
  }, [filteredCountries.length, increment]);

  // Debounce the scroll listener
  useEffect(() => {
    let timeoutId: NodeJS.Timeout;

    const debouncedScroll = () => {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(handleScroll, 200); // Adjust debounce delay as needed
    };

    window.addEventListener('scroll', debouncedScroll);
    return () => window.removeEventListener('scroll', debouncedScroll);
  }, [handleScroll]);

  // Generate content
  const content = filteredCountries
    .slice(0, visibleCount)
    .map((country, index) => (
      <Link
        href={'/countries/' + DataFormatter.countryNameToUri(country.name)}
        key={index}
        legacyBehavior
      >
        <div className={styles.countryCard}>
          <div className={styles.flagContainer}>
            <Image
              src={usePng ? country.flags.png : country.flags.svg} // Use PNG or SVG based on screen size
              alt={country.name + ' flag'}
              quality={80} // Set quality to 80% for PNG (ignored for SVG)
              className={styles.flag}
              priority={index < increment} // Prioritize loading for the first set of countries
              loading={index >= increment ? 'lazy' : undefined} // Lazy load non-priority images
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
          'A man is watching a map trying to find ' + searchBar + ' on earth'
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
      <section className={noResult ? styles.noResult : styles.countriesList}>
        {noResult ? noResultContent : content}
      </section>
    </div>
  );
};

export default CountriesList;
