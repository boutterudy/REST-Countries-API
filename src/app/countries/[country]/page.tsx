import { Metadata } from 'next';
import CountriesList from '../../../components/CountriesList';
import CountryDetails from '../../../components/CountryDetails';
import { getCountryByName, getCountriesByCodes, getAllCountries } from '../../../utils/RestCountries';
import DataFormatter from '../../../utils/DataFormatter';
import { redirect } from 'next/navigation';
import Country from '../../../types/country';

type CountryPageProps = { params: { country: string } }

export async function generateMetadata({ params }: CountryPageProps): Promise<Metadata> {
  const { country: countryName } = params;
  const countryDetails = await getCountryByName(
    DataFormatter.uriToCountryName(countryName),
  );

  const favicon = countryDetails[0].flags.svg;

  return {
    title: "REST Countries API with color theme switcher",
    description: "Made with <3 by Rudy B. This is my solution for REST Countries API FrontendMentor challenge.",
    icons: {
      icon: favicon,
    }
  }
}

export default async function CountryPage({ params }: CountryPageProps) {
  const { country: countryName } = params;
  const countryDetails = await getCountryByName(
    DataFormatter.uriToCountryName(countryName),
  );

  if(countryDetails.status === 404) {
    return redirect("/")
  }

  const country: Country = countryDetails[0];
  let borderCountries: Array<Country> = [];
  if(country.borders !== undefined) {
    borderCountries = await getCountriesByCodes(country.borders);
  }

  return (
    <main id="content">
      {country !== undefined ? (
        <CountryDetails country={country} borderCountries={borderCountries} />
      ) : null}
    </main>
  )
}