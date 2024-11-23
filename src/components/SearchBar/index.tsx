import styles from './SearchBar.module.scss';
import { useContext, useEffect } from 'react';
import { FiltersContext } from '../../context/FiltersContext';
import { RiSearchLine, RiCloseLine } from '@remixicon/react';

type Props = {
  className?: string;
};

const SearchBar = ({ className }: Props) => {
  const { searchBar, setSearchBar } = useContext(FiltersContext);

  return (
    <div
      className={
        className !== undefined
          ? className + ' ' + styles.searchBar
          : styles.searchBar
      }
    >
      <RiSearchLine size="1rem" className={styles.icon} />
      <input
        className={styles.input}
        type="text"
        placeholder="Search for a country..."
        onChange={(e) =>
          setSearchBar(e.target.value !== '' ? e.target.value : null)
        }
        value={searchBar !== null ? searchBar : ''}
      />
      {searchBar !== null ? (
        <RiCloseLine
          size="1rem"
          className={styles.clearIcon}
          onClick={() => setSearchBar(null)}
        />
      ) : null}
    </div>
  );
};

export default SearchBar;
