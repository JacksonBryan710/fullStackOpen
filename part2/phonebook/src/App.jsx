import { useState } from 'react';

const Filter = ({ filter, setFilter }) => {
    const handleFilterChange = (event) => {
        setFilter(event.target.value);
    };

    return (
        <div>
            filter shown with <input value={filter} onChange={handleFilterChange} />
        </div>
    );
};

const Person = ({ person }) => {
    return (
        <p>
            {person.name} {person.number}
        </p>
    );
};

const PersonForm = ({ persons, newName, newNumber, setNewName, setNewNumber, setPersons }) => {
    const addNewEntry = (event) => {
        event.preventDefault();
        console.log('button clicked', event.target);
        const personObject = {
            name: newName,
            number: newNumber,
            id: String(persons.length + 1),
        };

        if (persons.some((person) => person.name === newName)) {
            alert(`${newName} is already added to phonebook`);
            return;
        }

        console.log('Adding:', personObject);

        setPersons(persons.concat(personObject));
        setNewName('');
        setNewNumber('');
    };

    const handlePersonChange = (event) => {
        setNewName(event.target.value);
    };

    const handleNumberChange = (event) => {
        setNewNumber(event.target.value);
    };

    return (
        <form onSubmit={addNewEntry}>
            <div>
                name: <input value={newName} onChange={handlePersonChange} />
            </div>
            <div>
                number: <input value={newNumber} onChange={handleNumberChange} />
            </div>
            <div>
                <button type="submit">add</button>
            </div>
        </form>
    );
};

const Persons = ({ persons }) => {
    return (
        <div>
            {persons.map((person) => (
                <Person key={person.id} person={person} />
            ))}
        </div>
    );
};

const App = () => {
    const [persons, setPersons] = useState([]);
    const [newName, setNewName] = useState('');
    const [newNumber, setNewNumber] = useState('');
    const [filter, setFilter] = useState('');

    const personsToShow = persons.filter((person) => {
        return person.name.toLowerCase().includes(filter.toLowerCase());
    });

    return (
        <div>
            <h2>Phonebook</h2>
            <Filter filter={filter} setFilter={setFilter} />

            <h2>add a new</h2>
            <PersonForm
                persons={persons}
                newName={newName}
                newNumber={newNumber}
                setNewName={setNewName}
                setNewNumber={setNewNumber}
                setPersons={setPersons}
            />

            <h2>Numbers</h2>
            <Persons persons={personsToShow} />
        </div>
    );
};

export default App;
