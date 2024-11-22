"use server"

import Country from '../../types/country';

export const getAllCountries = async (): Promise<Country[]> => {
  const url = "https://restcountries.com/v2/all";
  return fetch(url).then((data) => {
    return data.json();
  });
};

export const getCountryByName = async (name: string) => {
  const url = "https://restcountries.com/v2/name/" + name;
  return fetch(url).then((data) => {
    return data.json();
  });
};

export const getCountriesByCodes = async (codes: string[]) => {
  const url = "https://restcountries.com/v2/alpha?codes=" + codes.join(",");
  return fetch(url).then((data) => {
    return data.json();
  });
};