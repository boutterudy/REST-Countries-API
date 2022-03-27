const all = async () => {
    const url = "https://restcountries.com/v2/all";
    return fetch(url).then((data) => {
        return data.json();
    });
};

const get = async (name: string) => {
    const url = "https://restcountries.com/v2/name/" + name;
    return fetch(url).then((data) => {
        return data.json();
    });
};

const getByCodes = async (codes: string[]) => {
    const url = "https://restcountries.com/v2/alpha?codes=" + codes.join(",");
    return fetch(url).then((data) => {
        return data.json();
    });
};

const RestCountries = {
    all: all,
    get: get,
    getByCodes: getByCodes,
};

export default RestCountries;
