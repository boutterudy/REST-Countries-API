'use client';

import { useEffect } from 'react';
import Country from '../../types/country';

type DynamicFaviconProps = {
  countries: Array<Country>;
};

export const DynamicFavicon = ({ countries }: DynamicFaviconProps) => {
  useEffect(() => {
    const changeFavicon = () => {
      const randomCountry =
        countries[Math.floor(Math.random() * countries.length)];
      const faviconUrl = randomCountry.flags.svg;

      let link = document.querySelector(
        "link[rel*='icon']"
      ) as HTMLLinkElement | null;
      if (!link) {
        link = document.createElement('link');
        link.type = 'image/svg+xml';
        link.rel = 'icon';
        document.head.appendChild(link);
      }

      link.href = faviconUrl;
    };

    const intervalId = setInterval(changeFavicon, 1000);

    return () => clearInterval(intervalId);
  }, [countries]);

  return null;
};
