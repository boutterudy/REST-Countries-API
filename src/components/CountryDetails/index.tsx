'use client';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import Country from '../../types/country';
import DataFormatter from '../../utils/DataFormatter';
import Button from '../Button';
import Loader from '../Loader';
import styles from './CountryDetails.module.scss';
import { RiArrowLeftLine } from '@remixicon/react';

type Props = {
  country: Country;
  borderCountries: Array<Country>;
};

const CountryDetails = ({
  country: details,
  borderCountries: borders,
}: Props) => {
  const router = useRouter();

  let content;
  if (details === undefined || borders === undefined) {
    content = <Loader className={styles.loader} />;
  } else {
    content = (
      <div>
        <div className={styles.country}>
          <div className={styles.flagContainer}>
            <Image
              src={details.flags.svg}
              alt={details.name + ' flag'}
              quality={100}
              priority={true}
              fill
              sizes="100vw"
              style={{
                objectFit: 'contain',
                objectPosition: '50% 0',
              }}
            />
          </div>
          <div
            className={
              borders.length > 0
                ? styles.informations
                : styles.informations + ' ' + styles.noBorder
            }
          >
            <h2 className={styles.title}>{details.name}</h2>
            <ul className={styles.details}>
              <div>
                <li>
                  <span className={styles.field}>Native Name:</span>{' '}
                  {details.nativeName}
                </li>
                <li>
                  <span className={styles.field}>Population:</span>{' '}
                  {DataFormatter.formatNumber(details.population)}
                </li>
                <li>
                  <span className={styles.field}>Region:</span> {details.region}
                </li>
                <li>
                  <span className={styles.field}>Sub Region:</span>{' '}
                  {details.subregion}
                </li>
                <li>
                  <span className={styles.field}>Capital:</span>{' '}
                  {details.capital ? details.capital : 'No capital'}
                </li>
              </div>
              <div>
                <li>
                  <span className={styles.field}>Top Level Domain:</span>{' '}
                  {details.topLevelDomain}
                </li>
                <li>
                  <span className={styles.field}>Currencies:</span>{' '}
                  {details.currencies === undefined
                    ? 'No currency'
                    : details.currencies.map((cur) => cur.name).join(', ')}
                </li>
                <li>
                  <span className={styles.field}>Languages:</span>{' '}
                  {details.languages.map((lang) => lang.name).join(', ')}
                </li>
              </div>
            </ul>
            <ul className={styles.borderCountries}>
              <p>
                <span className={styles.field}>Border Countries:</span>
                {borders.length === 0 ? ' No country' : null}
              </p>
              {borders.length > 0 ? (
                <li className={styles.list}>
                  {borders.map((country, index) => (
                    <Link
                      href={'/countries/' + country.name}
                      key={index}
                      passHref
                      legacyBehavior
                    >
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
        <RiArrowLeftLine className={styles.icon} size="1rem" /> Back
      </Button>
      <div>{content}</div>
    </div>
  );
};

export default CountryDetails;
