import React, { Component } from "react";
import { nanoid } from "nanoid";
import { ContactForm } from "./ContactForm/ContactForm";
import { Filter } from "./Filter/Filter";
import { ContactList } from "./ContactList/ContactList";
import propTypes from "prop-types";

export class App extends Component {
  state = {
    contacts: [
      { id: "id-1", name: "Rosie Simpson", number: "459-12-56" },
      { id: "id-2", name: "Hermione Kline", number: "443-89-12" },
      { id: "id-3", name: "Eden Clements", number: "645-17-79" },
      { id: "id-4", name: "Annie Copeland", number: "227-91-26" },
    ],
    filter: "",
  };

  handleChange = (e) => {
    this.setState({ filter: e.target.value });
  };

  handleDelete = (contactId) => {
    this.setState((prevState) => ({
      contacts: prevState.contacts.filter(
        (contact) => contact.id !== contactId
      ),
    }));
  };

  handleSubmit = ({ name, number }) => {
    const { contacts } = this.state;
    const isExistingContact = contacts.some(
      (contact) => contact.name.toLowerCase() === name.toLowerCase()
    );

    if (isExistingContact) {
      alert(`${name} is already in contacts`);
      return;
    }

    return this.setState((prevState) => ({
      contacts: [...prevState.contacts, { name, number, id: nanoid() }],
    }));
  };

  getFiltered = () => {
    const { contacts, filter } = this.state;
    const filterContactsList = contacts.filter((contact) => {
      return contact.name.toLowerCase().includes(filter.toLowerCase());
    });
    return filterContactsList;
  };

  componentDidMount() {
    const savedContacts = localStorage.getItem(this.localStorage);
    if (savedContacts) {
      this.setState({ contacts: JSON.parse(savedContacts) });
    }
  }

  componentDidUpdate(prevState) {
    const { contacts } = this.state;
    if (prevState.contacts !== contacts) {
      localStorage.setItem(this.localStorage, JSON.stringify(contacts));
    }
  }

  render() {
    const filterContactsList = this.getFiltered();
    return (
      <div
        style={{
          height: "100vh",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          fontSize: 20,
          color: "#010101",
        }}
      >
        <h1>Phonebook</h1>
        <ContactForm onSubmit={this.handleSubmit} />
        <h2> Contacts</h2>
        <Filter value={this.state.filter} handleChange={this.handleChange} />
        <ContactList
          contacts={filterContactsList}
          onHandleDelete={this.handleDelete}
        />
      </div>
    );
  }
}

App.propTypes = {
  contacts: propTypes.arrayOf(
    propTypes.shape({
      id: propTypes.string.isRequired,
      name: propTypes.string.isRequired,
      number: propTypes.string.isRequired,
    })
  ),
};
