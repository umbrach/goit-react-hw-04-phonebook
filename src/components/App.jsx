import React, { Component } from 'react';
import { nanoid } from 'nanoid';
import Container from './Container/Container';
import ContactForm from './ContactForm/ContactForm';
import Filter from './Filter/Filter';
import ContactList from './ContactList/ContactList';

class App extends Component {
  state = {
    contacts: [],
    filter: '',
  };

  componentDidMount() {
    const contacts = localStorage.getItem('contacts');
    const parceContacts = JSON.parse(contacts);
    if(!parceContacts) return

    this.setState({ contacts: [...parceContacts] });

    console.log(parceContacts);
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.state.contacts !== prevState.contacts) {
      console.log('field updated');

      localStorage.setItem('contacts', JSON.stringify(this.state.contacts));
    }
  }

  addContact = (name, number) => {
    const contact = {
      id: nanoid(),
      name,
      number,
    };
    const alreadyInContacts = this.state.contacts.find(
      item => item.name === name
    );
    if (alreadyInContacts) {
      alert(`${name} is already in contacts`);
      return;
    }
    this.setState(({ contacts }) => ({
      contacts: [contact, ...contacts],
    }));
  };

  deleteContact = contactId => {
    this.setState(prevState => ({
      contacts: prevState.contacts.filter(item => item.id !== contactId),
    }));
  };

  filterContacts = () => {
    const { contacts, filter } = this.state;
    const normalizedName = filter.toLowerCase();
    return contacts.filter(contact =>
      contact.name.toLowerCase().includes(normalizedName)
    );
  };

  changeFilter = e => {
    this.setState({
      filter: e.currentTarget.value,
    });
  };

  render() {
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
          <ContactForm addContact={this.addContact} />
          <div>
            <h2 style={{ fontFamily: 'Montserrat', fontSize: '32px' }}>
              Contacts
            </h2>
            <Filter value={this.state.filter} onChange={this.changeFilter} />
            <ContactList
              filterContacts={this.filterContacts()}
              deleteContact={this.deleteContact}
            />
          </div>
        </Container>
      </div>
    );
  }
}

export default App;