import styles from "./SearchBar.module.scss";
import Icon from "../Icon";
import { useContext, useEffect } from "react";
import { FiltersContext } from "../../context/FiltersContext";
import { useRouter } from "next/navigation";

type Props = {
  className?: string;
};

const SearchBar = ({ className }: Props) => {
  const { searchBar, setSearchBar } = useContext(FiltersContext);

  return (
    <div
      className={
        className !== undefined
          ? className + " " + styles.searchBar
          : styles.searchBar
      }
    >
      <Icon lib="remix-icon" icon="search-line" className={styles.icon} />
      <input
        className={styles.input}
        type="text"
        placeholder="Search for a country..."
        onChange={(e) =>
          setSearchBar(e.target.value !== "" ? e.target.value : null)
        }
        value={searchBar !== null ? searchBar : ""}
      />
      {searchBar !== null ? (
        <Icon
          lib="remix-icon"
          icon="close-line"
          className={styles.clearIcon}
          onClick={() => setSearchBar(null)}
        />
      ) : null}
    </div>
  );
};

export default SearchBar;
