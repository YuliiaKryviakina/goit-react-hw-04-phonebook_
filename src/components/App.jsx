import React, { useEffect, useState } from "react";
import { nanoid } from "nanoid";
import { ContactForm } from "./ContactForm/ContactForm";
import { Filter } from "./Filter/Filter";
import { ContactList } from "./ContactList/ContactList";
import propTypes from "prop-types";

const localStorageKey = "contactList";

export const App = () => {
  const [contacts, setContacts] = useState(() => {
    return JSON.parse(window.localStorage.getItem(localStorageKey)) ?? [];
  });
  const [filter, setFilter] = useState("");

  const handleChange = (e) => {
    setFilter(e.target.value);
  };

  const handleDelete = (contactId) => {
    setContacts((state) => state.filter((contact) => contact.id !== contactId));
  };

  const handleSubmit = ({ name, number }) => {
    const isExistingContact = contacts.find(
      (contact) => contact.name.toLowerCase() === name.toLowerCase()
    );

    if (isExistingContact) {
      alert(`${name} is already in contacts`);
      return;
    }

    setContacts((state) => [
      ...state,
      { name: name, number: number, id: nanoid() },
    ]);
    return;
  };

  const getFiltered = () => {
    const filterContactsList = contacts.filter(({ name }) => {
      return name.toLowerCase().includes(filter.toLowerCase());
    });
    return filterContactsList;
  };

  useEffect(() => {
    const savedContacts = localStorage.getItem(localStorageKey);
    if (savedContacts) {
      setContacts(JSON.parse(savedContacts));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem(localStorageKey, JSON.stringify(contacts));
  }, [contacts]);

  const filterContactsList = getFiltered();
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
      <ContactForm onSubmit={handleSubmit} />
      <h2> Contacts</h2>
      <Filter value={filter} handleChange={handleChange} />
      <ContactList
        contacts={filterContactsList}
        onHandleDelete={handleDelete}
      />
    </div>
  );
};

App.propTypes = {
  contacts: propTypes.arrayOf(
    propTypes.shape({
      id: propTypes.string.isRequired,
      name: propTypes.string.isRequired,
      number: propTypes.string.isRequired,
    })
  ),
};
