import { useContext, useState } from "react";
import { FiltersContext } from "../../context/FiltersContext";
import Button from "../Button";
import Icon from "../Icon";
import styles from "./FilterByRegionDropdown.module.scss";

type Props = {
    className?: string;
};

const FilterByRegionDropdown = ({ className }: Props) => {
    const { region, setRegion } = useContext(FiltersContext);
    const [open, setOpen] = useState(false);

    const regions = ["Africa", "Americas", "Asia", "Europe", "Oceania"];

    return (
        <div
            className={
                className !== undefined
                    ? className + " " + styles.dropdown
                    : styles.dropdown
            }
        >
            <Button
                className={styles.dropdownButton}
                onClick={(e) => {
                    e.preventDefault();
                    setOpen(!open);
                }}
            >
                Filter by Region{" "}
                <Icon
                    className={styles.icon}
                    lib="remix-icon"
                    icon={open ? "arrow-drop-up-line" : "arrow-drop-down-line"}
                />
            </Button>

            <ul
                className={
                    open
                        ? styles.open + " " + styles.dropdownContent
                        : styles.dropdownContent
                }
            >
                {regions.map((reg, index) => (
                    <li
                        key={index}
                        className={reg === region ? styles.applied : ""}
                        onClick={(e) => {
                            setRegion(reg !== region ? reg : null);
                        }}
                    >
                        {reg}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default FilterByRegionDropdown;
