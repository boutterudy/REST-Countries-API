'use client';
import { useContext } from 'react';
import ThemeContext from '../../context/ThemeContext';
import styles from './Header.module.scss';
import { RiSunFill, RiMoonLine } from '@remixicon/react';

const Header = () => {
  const { dark, toggleDark } = useContext(ThemeContext);

  return (
    <header className={styles.header}>
      <h1 className={styles.title}>Where in the world?</h1>
      <button className={styles.darkModeButton} onClick={() => toggleDark()}>
        {dark ? (
          <>
            <RiSunFill className={styles.icon} size="1rem" /> Light Mode
          </>
        ) : (
          <>
            <RiMoonLine className={styles.icon} size="1rem" /> Dark Mode
          </>
        )}
      </button>
    </header>
  );
};

export default Header;
