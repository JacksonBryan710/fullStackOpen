import { useState, useEffect } from 'react';
import countryService from './services/countries';

const Search = ({ search, setSearch, setSelectedCountry }) => {
    const handleSearchChange = (event) => {
        setSelectedCountry(null);
        setSearch(event.target.value);
    };

    return (
        <div>
            find countries
            <input value={search} onChange={handleSearchChange} />
        </div>
    );
};

const Country = ({ country }) => {
    const [capital, setCapital] = useState('');
    const [area, setArea] = useState('');
    const [languages, setLanguages] = useState([]);
    const [flagUrl, setFlagUrl] = useState('');
    const [flagDescription, setFlagDescription] = useState('');

    useEffect(() => {
        countryService.getOne(country.name.common).then((returnedCountry) => {
            setCapital(returnedCountry.capital[0]);
            setArea(returnedCountry.area);
            setLanguages(Object.values(returnedCountry.languages));
            setFlagUrl(returnedCountry.flags.png);
            setFlagDescription(returnedCountry.flags.alt);
        });
    });

    if (!capital || !area || languages.length === 0 || !flagUrl) {
        return null;
    }

    return (
        <div>
            <h1>{country.name.common}</h1>
            <div>
                <p>capital {capital}</p>
                <p>area {area}</p>
            </div>
            <h2>Languages</h2>
            <ul>
                {languages.map((language) => (
                    <li key={language}>{language}</li>
                ))}
            </ul>
            {flagUrl && <img src={flagUrl} alt={flagDescription} />}
        </div>
    );
};

const Countries = ({ countries, selectedCountry, setSelectedCountry }) => {
    if (countries.length > 10) {
        return <p>Too many matches, specify another filter</p>;
    } else if (countries.length > 1) {
        if (selectedCountry) {
            return <Country country={selectedCountry} />;
        }
        return countries.map((country) => (
            <div key={country.name.common}>
                {country.name.common} <button onClick={() => setSelectedCountry(country)}>show</button>
            </div>
        ));
    } else if (countries.length === 1) {
        return <Country country={countries[0]} />;
    } else {
        return <p>No matches found</p>;
    }
};

function App() {
    const [search, setSearch] = useState('');
    const [countries, setCountries] = useState(null);
    const [selectedCountry, setSelectedCountry] = useState(null);

    useEffect(() => {
        countryService.getAll().then((returnedCountries) => {
            setCountries(returnedCountries);
        });
    }, []);

    if (!countries) {
        return null;
    }

    const countriesToShow = countries.filter((country) => {
        return country.name.common.toLowerCase().includes(search.toLowerCase());
    });

    return (
        <div>
            <Search search={search} setSearch={setSearch} setSelectedCountry={setSelectedCountry} />
            <Countries
                countries={countriesToShow}
                selectedCountry={selectedCountry}
                setSelectedCountry={setSelectedCountry}
            />
        </div>
    );
}

export default App;
