import { useState, useEffect } from 'react';
import { nanoid } from 'nanoid';
import Container from './Container/Container';
import ContactForm from './ContactForm/ContactForm';
import Filter from './Filter/Filter';
import ContactList from './ContactList/ContactList';

export default function App() {
  const [contacts, setContacts] = useState(
    JSON.parse(localStorage.getItem('contacts')) ?? []
  );
  const [filter, setFilter] = useState('');

  useEffect(() => {
    localStorage.setItem('contacts', JSON.stringify(contacts));
  }, [contacts]);

  const addContact = (name, number) => {
    const contact = {
      id: nanoid(),
      name,
      number,
    };
    const alreadyInContacts = contacts.find(
      item => item.name === name
    );
    if (alreadyInContacts) {
      alert(`${name} is already in contacts`);
      return;
    }
    setContacts([contact, ...contacts]);
  };

    const deleteContact = contactId => {
      const filteredContacts = contacts.filter(item => item.id !== contactId)
      setContacts(filteredContacts)
      };

    const filterContacts = () => {
      const normalizedName = filter.toLowerCase();
      return contacts.filter(contact =>
        contact.name.toLowerCase().includes(normalizedName)
      );
    };

    const changeFilter = e => {
      setFilter(e.currentTarget.value);
    };

  return (
    <div>
      <Container>
        <h1
          style={{
            fontFamily: 'Montserrat',
            fontSize: '32px',
          }}
        >
          Phonebook
        </h1>
        <ContactForm addContact={addContact} />
        <div>
          <h2 style={{ fontFamily: 'Montserrat', fontSize: '32px' }}>
            Contacts
          </h2>
          <Filter value={filter} onChange={changeFilter} />
          <ContactList
            filterContacts={filterContacts()}
            deleteContact={deleteContact}
          />
        </div>
      </Container>
    </div>
  );
}

