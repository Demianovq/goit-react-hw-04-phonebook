import { useState, useEffect } from 'react';
import { nanoid } from 'nanoid';
import { ContactList } from './Contacts/Contacts';
import { FormContacts } from './form/form';
import { Filter } from './Filter/Filter';

export const App = () => {
  const [contacts, setContacts] = useState([]);
  const [filter, setFilter] = useState('');

  useEffect(() => {
    const serializedState = JSON.stringify(contacts);
    localStorage.setItem('contacts', serializedState);
  }, [contacts]);

  useEffect(() => {
    const savedContacts = localStorage.getItem('contacts');
    if (savedContacts) {
      const parsedContacts = JSON.parse(savedContacts);
      setContacts(parsedContacts);
    }
  }, []);

  const handleSubmit = (values, { resetForm }) => {
    let newContact = values;

    const check = contacts.filter(
      contact => contact.name.toLowerCase() === newContact.name.toLowerCase()
    );

    if (check.length) {
      alert(`${newContact.name} is already in contacts`);
    } else {
      newContact.id = nanoid();
      setContacts(prevState => [...prevState, newContact]);
      resetForm();
    }
  };

  const handleFilter = ({ target: { value } }) => {
    setFilter(value);
  };

  const OnFilteredContacts = () => {
    if (filter) {
      return contacts.filter(({ name }) =>
        name.toLowerCase().includes(filter.toLowerCase())
      );
    }
    return;
  };

  const handleDelete = eId => {
    setContacts(contacts.filter(({ id }) => id !== eId));
  };

  return (
    <div>
      <h1>Phonebook</h1>
      <FormContacts onFormSubmit={handleSubmit} />

      <h2>Contacts</h2>
      <Filter onFilter={handleFilter} />
      <ContactList
        contacts={contacts}
        filteredContacts={OnFilteredContacts()}
        onDelete={handleDelete}
      />
    </div>
  );
};
