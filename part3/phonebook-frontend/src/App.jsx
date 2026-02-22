import { useState, useEffect } from 'react';
import Filter from './components/Filter';
import PersonForm from './components/PersonForm';
import Persons from './components/Persons';
import Notification from './components/Notification';
import personService from './services/persons';

const App = () => {
    const [persons, setPersons] = useState([]);
    const [newName, setNewName] = useState('');
    const [newNumber, setNewNumber] = useState('');
    const [filter, setFilter] = useState('');
    const [message, setMessage] = useState(null);
    const [messageType, setMessageType] = useState(null);

    useEffect(() => {
        personService.getAll().then((initialPersons) => {
            setPersons(initialPersons);
        });
    }, []);

    const showNotification = (message, type) => {
        setMessage(message);
        setMessageType(type);
        setTimeout(() => {
            setMessage(null);
            setMessageType(null);
        }, 5000);
    }

    const resetFields = () => {
        setNewName('');
        setNewNumber('');
    }

    const personsToShow = persons.filter((person) => {
        return person.name.toLowerCase().includes(filter.toLowerCase());
    });

    const handleAddPerson = () => {
        const existingPerson = persons.find((person) => person.name === newName);
        if (existingPerson) {
            if (window.confirm(`${newName} is already added to phonebook, replace the old number with a new one?`)) {
                const changedPerson = { ...existingPerson, number: newNumber };
                personService.update(existingPerson.id, changedPerson)
                    .then((returnedPerson) => {
                        setPersons(persons.map(p => p.id !== existingPerson.id ? p : returnedPerson));
                        resetFields();
                        showNotification(`Updated ${returnedPerson.name}'s number`, 'success');
                    })
                    .catch(error => {
                        showNotification(`Information of ${existingPerson.name} has already been removed from server`, 'error');
                        setPersons(persons.filter(p => p.id !== existingPerson.id));
                    });
            }
            return;
        }
        const personObject = {
            name: newName,
            number: newNumber,
        };
        personService
            .create(personObject)
            .then((returnedPerson) => {
                setPersons(persons.concat(returnedPerson));
                resetFields();
                console.log(returnedPerson.name)
                showNotification(`Added ${returnedPerson.name}`, 'success');
            })
            .catch(error => {
                showNotification(`${error.response.data.error}`, 'error')
            }
            );
    };

    const handleRemovePerson = (id) => {
        console.log('removing', id);
        personService
            .remove(id)
            .then(() => {
                setPersons(persons.filter((person) => person.id !== id));
                showNotification(`Removed ${persons.find(p => p.id === id)?.name}`, 'success');
            })
            .catch(error => {
                showNotification(`Information of ${persons.find(p => p.id === id)?.name} has already been removed from server`, 'error');
                setPersons(persons.filter(p => p.id !== id));
            });
    };

    return (
        <div>
            <h2>Phonebook</h2>
            <Notification message={message} type={messageType} />
            <Filter filter={filter} setFilter={setFilter} />

            <h2>add a new</h2>
            <PersonForm
                newName={newName}
                newNumber={newNumber}
                setNewName={setNewName}
                setNewNumber={setNewNumber}
                onAddPerson={handleAddPerson}
            />

            <h2>Numbers</h2>
            <Persons persons={personsToShow} handleRemovePerson={handleRemovePerson} />
        </div>
    );
};

export default App;
