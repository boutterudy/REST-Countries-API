'use client';
import { createContext, ReactNode, useContext, useState } from 'react';
import Country from '../types/country';
import DataFormatter from '../utils/DataFormatter';

type filtersType = {
  searchBar: string | null;
  setSearchBar: (value: string | null) => void;
  region: string | null;
  setRegion: (value: string | null) => void;
  filterCountries: (countries: Country[]) => Country[];
};

const filtersContextDefault: filtersType = {
  searchBar: null,
  setSearchBar: () => {},
  region: null,
  setRegion: () => {},
  filterCountries: () => [],
};

export const FiltersContext = createContext<filtersType>(filtersContextDefault);

export function useFilters() {
  return useContext(FiltersContext);
}

type Props = {
  children: ReactNode;
};

export function FiltersProvider({ children }: Props) {
  const [searchBar, setSearchBar] = useState<string | null>(null);
  const [region, setRegion] = useState<string | null>(null);

  // Filter by Region function
  const filterByRegion = (countries: Country[]) => {
    return region !== null
      ? countries.filter((country) => country.region.includes(region))
      : countries;
  };

  // Filter by Name function
  const filterByName = (countries: Country[]) => {
    return searchBar !== null
      ? countries.filter((country) =>
          DataFormatter.removeAccents(country.name)
            .toLowerCase()
            .includes(searchBar.toLowerCase())
        )
      : countries;
  };

  // Filter countries function
  const filterCountries = (countries: Country[]) => {
    let filtered = filterByRegion(filterByName(countries));
    return filtered.length === 0 ? [] : filtered;
  };

  const value = {
    searchBar,
    setSearchBar,
    region,
    setRegion,
    filterCountries,
  };

  return (
    <>
      <FiltersContext.Provider value={value}>
        {children}
      </FiltersContext.Provider>
    </>
  );
}
