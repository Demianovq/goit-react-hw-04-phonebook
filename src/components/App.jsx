import { Component } from 'react';
import { nanoid } from 'nanoid';
import { ContactList } from './Contacts/Contacts';
import { FormContacts } from './form/form';
import { Filter } from './Filter/Filter';

export class App extends Component {
  state = {
    contacts: [],
    filter: '',
  };

  componentDidUpdate(prevProps, prevState) {
    if (prevState.contacts !== this.state.contacts) {
      const serializedState = JSON.stringify(this.state.contacts);
      localStorage.setItem('contacts', serializedState);
    }
  }

  componentDidMount() {
    const savedContacts = localStorage.getItem('contacts');
    if (savedContacts) {
      const parsedContacts = JSON.parse(savedContacts);
      this.setState(prevState => ({
        contacts: parsedContacts,
      }));
    }
  }

  handleSubmit = (values, { resetForm }) => {
    let newContact = values;

    const check = this.state.contacts.filter(
      contact => contact.name.toLowerCase() === newContact.name.toLowerCase()
    );

    if (check.length) {
      alert(`${newContact.name} is already in contacts`);
    } else {
      newContact.id = nanoid();

      this.setState(prevState => ({
        contacts: [...prevState.contacts, newContact],
      }));

      resetForm();
    }
  };

  handleFilter = ({ target: { name, value } }) => {
    this.setState({
      [name]: value,
    });
  };

  OnFilteredContacts = () => {
    if (this.state.filter) {
      return this.state.contacts.filter(({ name }) =>
        name.toLowerCase().includes(this.state.filter.toLowerCase())
      );
    }
    return;
  };

  handleDelete = eId => {
    this.setState({
      contacts: this.state.contacts.filter(({ id }) => id !== eId),
    });
  };

  render() {
    return (
      <div>
        <h1>Phonebook</h1>
        <FormContacts onFormSubmit={this.handleSubmit} />

        <h2>Contacts</h2>
        <Filter onFilter={this.handleFilter} />
        <ContactList
          contacts={this.state.contacts}
          filteredContacts={this.OnFilteredContacts()}
          onDelete={this.handleDelete}
        />
      </div>
    );
  }
}
