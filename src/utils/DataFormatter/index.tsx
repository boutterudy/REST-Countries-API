const formatNumber = (n: number) =>
    n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");

const capitalize = (s: string | null) =>
    s === null ? null : s.charAt(0).toUpperCase() + s.slice(1);

const removeAccents = (s: string) =>
    s.normalize("NFD").replace(/\p{Diacritic}/gu, "");

const countryNameToUri = (name: string) => {
    return removeAccents(
        name.split(",")[0].split("(")[0].trim().replace(/ /g, "-").toLowerCase()
    );
};

const uriToCountryName = (uri: string) => {
    return removeAccents(
        uri
            .replace(/-/g, " ")
            .toLowerCase()
            .normalize("NFD")
            .replace(/\p{Diacritic}/gu, "")
    );
};

const DataFormatter = {
    formatNumber: formatNumber,
    countryNameToUri: countryNameToUri,
    uriToCountryName: uriToCountryName,
    capitalize: capitalize,
    removeAccents: removeAccents,
};

export default DataFormatter;
