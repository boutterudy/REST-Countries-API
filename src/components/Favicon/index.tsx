import { useEffect, useState } from "react";
import Country from "../../types/country";
import RestCountries from "../../utils/RestCountries";

const Favicon = () => {
    const [countries, setCountries] = useState<Country[]>([]);
    const [favicon, setFavicon] = useState("");

    useEffect(() => {
        const result = RestCountries.all();
        result.then((value) => setCountries(value));
    }, []);

    if (countries.length > 0) {
        setFavicon(
            countries[Math.floor(Math.random() * countries.length)].flags.svg
        );
    }

    console.log("favicon", favicon);

    return <link rel="icon" href={favicon} />;
};

export default Favicon;
