import { Component } from 'react';
import { nanoid } from 'nanoid';
import Notiflix from 'notiflix';

import ContactsList from './ContactsList';
import ContactsFilter from './ContsctsFilter';
import ContactsForm from './ContactsForm';

import contacts from './contacts';

import css from './PhoneBook.module.scss';

class PhoneBook extends Component {
  state = {
    contacts: [...contacts],
    filter: '',
  };

  handleFilter = ({ target }) => {
    this.setState({ filter: target.value });
  };

  isDublicate(name) {
    const normalizedName = name.toLowerCase();
    const { contacts } = this.state;
    const q = contacts.find(({ name }) => {
      return name.toLowerCase() === normalizedName;
    });

    return Boolean(q);
  }

  addContact = ({ name, number }) => {
    if (this.isDublicate(name)) {
      Notiflix.Notify.failure('name already exists');
      return false;
    }

    this.setState(prevState => {
      const { contacts } = prevState;

      const newContact = {
        id: nanoid(),
        name,
        number,
      };
      return { contacts: [...contacts, newContact] };
    });

    return true;
  };

  removeContact = id => {
    this.setState(({ contacts }) => {
      const newContacts = contacts.filter(contact => contact.id !== id);

      return { contacts: newContacts };
    });
  };

  getFilteredContacts() {
    const { filter, contacts } = this.state;
    if (!filter) {
      return contacts;
    }
    const normalizedFilter = filter.toLowerCase();
    const result = contacts.filter(({ name }) => {
      return name.toLowerCase().includes(normalizedFilter);
    });
    return result;
  }

  componentDidMount() {
    const rawContacts = localStorage.getItem('contacts');
    const parsedContacts = JSON.parse(rawContacts);

    if (parsedContacts) {
      this.setState({ contacts: parsedContacts });
    }
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.state.contacts !== prevState.contacts) {
      localStorage.setItem('contacts', JSON.stringify(this.state.contacts));
    }
  }

  render() {
    const { addContact, removeContact, handleFilter } = this;
    const contacts = this.getFilteredContacts();
    const isContacts = Boolean(contacts.length);

    return (
      <div className={css.wrapper}>
        <div className={css.block}>
          <h1 className={css.header}>Phonebook</h1>
          <ContactsForm onSubmit={addContact} />
        </div>

        <div className={css.block}>
          <h2 className={css.header}>Contacts</h2>
          <ContactsFilter handleChange={handleFilter} />

          {isContacts && (
            <ContactsList contacts={contacts} removeContact={removeContact} />
          )}
          {!isContacts && <p className={css.header}>No contacts in list</p>}
        </div>
      </div>
    );
  }
}

export default PhoneBook;
