const Person = ({ person, onRemovePerson }) => {
    return (
        <div>
            {person.name} {person.number}
            <button
                onClick={() => {
                    if (window.confirm(`Delete ${person.name}?`)) {
                        onRemovePerson();
                    }
                }}
            >
                delete
            </button>
        </div>
    );
};

const Persons = ({ persons, handleRemovePerson }) => {
    return (
        <div>
            {persons.map((person) => (
                <Person key={person.id} person={person} onRemovePerson={() => handleRemovePerson(person.id)} />
            ))}
        </div>
    );
};

export default Persons;
