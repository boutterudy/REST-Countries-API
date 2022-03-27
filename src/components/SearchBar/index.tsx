import styles from "./SearchBar.module.scss";
import Icon from "../Icon";
import { useContext, useEffect } from "react";
import { FiltersContext } from "../../context/FiltersContext";
import { useRouter } from "next/router";

type Props = {
    className?: string;
};

const SearchBar = ({ className }: Props) => {
    const { searchBar, setSearchBar } = useContext(FiltersContext);
    const router = useRouter();

    useEffect(() => {
        if (false) {
            if (searchBar !== null) {
                console.log("searchBar", searchBar);
                router.push("/?search=" + searchBar, undefined, {
                    shallow: true,
                });
            } else {
                router.push("/", undefined, { shallow: true });
            }
        }
    }, [searchBar]);

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
        </div>
    );
};

export default SearchBar;
