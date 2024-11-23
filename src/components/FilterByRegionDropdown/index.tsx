import { useContext, useState } from 'react';
import { FiltersContext } from '../../context/FiltersContext';
import Button from '../Button';
import styles from './FilterByRegionDropdown.module.scss';
import { RiArrowDropDownLine, RiArrowDropUpLine } from '@remixicon/react';

type Props = {
  className?: string;
};

const FilterByRegionDropdown = ({ className }: Props) => {
  const { region, setRegion } = useContext(FiltersContext);
  const [open, setOpen] = useState(false);

  const regions = ['Africa', 'Americas', 'Asia', 'Europe', 'Oceania'];

  return (
    <div
      className={
        className !== undefined
          ? className + ' ' + styles.dropdown
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
        Filter by Region{' '}
        {open ? (
          <RiArrowDropUpLine size="1.5rem" />
        ) : (
          <RiArrowDropDownLine size="1.5rem" />
        )}
      </Button>

      <ul
        className={
          open
            ? styles.open + ' ' + styles.dropdownContent
            : styles.dropdownContent
        }
      >
        {regions.map((reg, index) => (
          <li
            key={index}
            className={reg === region ? styles.applied : ''}
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
