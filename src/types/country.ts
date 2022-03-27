type Country = {
    name: string;
    topLevelDomain: [];
    alpha2Code: string;
    alpha3Code: string;
    callingCodes: [];
    capital: string;
    altSpellings: [];
    subregion: string;
    region: string;
    continent: string;
    population: number;
    latlng: Array<number>;
    demonym: string;
    area: number;
    gini: number;
    timezones: Array<string>;
    borders?: Array<String>;
    nativeName: string;
    numericCode: number;
    currencies: Array<{ code: string; name: string; symbol: string }>;
    languages: Array<{
        iso639_1: string;
        iso639_2: string;
        name: string;
        nativeName: string;
    }>;
    translations: {
        br: string;
        pt: string;
        nl: string;
        hr: string;
        fa: string;
        de: string;
        es: string;
        fr: string;
        ja: string;
        it: string;
        hu: string;
    };
    flags: {
        svg: string;
        png: string;
    };
    regionalBlocs: Array<{
        acronym: string;
        name: string;
        otherNames: Array<string>;
    }>[];
    cioc: string;
    independent: boolean;
};

export default Country;
