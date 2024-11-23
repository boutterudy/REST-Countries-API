import CountriesList from '../components/CountriesList';
import { Metadata } from 'next';
import { getAllCountries } from '../utils/RestCountries';
import { DynamicFavicon } from '../components/DynamicFavicon';

export async function generateMetadata(): Promise<Metadata> {
  const countries = await getAllCountries();
  const favicon =
    countries[Math.floor(Math.random() * countries.length)].flags.svg;

  return {
    title: 'REST Countries API with color theme switcher',
    description:
      'Made with <3 by Rudy B. This is my solution for REST Countries API FrontendMentor challenge.',
    icons: {
      icon: favicon,
    },
  };
}

export default async function HomePage() {
  const countries = await getAllCountries();

  return (
    <main id="content">
      <CountriesList countries={countries} />
      <DynamicFavicon countries={countries} />
    </main>
  );
}
