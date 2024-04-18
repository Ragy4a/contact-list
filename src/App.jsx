import { useState, useEffect } from 'react';
import List from './components/List/List';
import Form from './components/Form/Form';
import './App.css';
import { nanoid } from 'nanoid';

const App = () => {
  const [contacts, setContacts] = useState([]);
  const [editingContact, setEditingContact] = useState(createEmptyContact());

  function createEmptyContact() {
    return { 
      id: null, 
      fName: '', 
      lName: '', 
      email: '', 
      phone: '' 
    };
  }

  useEffect(() => {
    const contacts = JSON.parse(localStorage.getItem('contacts')) || [];
    setContacts(contacts);
  }, []);

  function saveContactsToLocalStorage(contacts) {
    localStorage.setItem('contacts', JSON.stringify(contacts));
  }

  const addNewContact = () => {
    setEditingContact(createEmptyContact());
  }

  const selectContact = (contact) => {
    setEditingContact(contact);
  }

  const createContact = (newContact) => {
    newContact.id = nanoid();
    const updatedContacts = [...contacts, newContact];
    saveContactsToLocalStorage(updatedContacts);
    setContacts(updatedContacts);
    setEditingContact(createEmptyContact());
  }

  const updateContact = (updatedContact) => {
    const updatedContacts = contacts.map(c => c.id === updatedContact.id ? updatedContact : c);
    saveContactsToLocalStorage(updatedContacts);
    setContacts(updatedContacts);
    setEditingContact(updatedContact);
  }

  const deleteContact = (id) => {
    const updatedContacts = contacts.filter(c => c.id !== id);
    setContacts(updatedContacts);
    saveContactsToLocalStorage(updatedContacts);
  }

  const saveContact = (contact) => {
    if (!contact.id) {
      createContact(contact);
    } else {
      updateContact(contact);
    }
  }

  return (
    <div className="project-container">
      <h2>Contact list</h2>
      <div className="wrapper">
        <List
          contacts={contacts}
          onDelete={deleteContact}
          onAddContact={addNewContact}
          onSelectContact={selectContact}
        />
        <Form
          key={editingContact.id}
          editingContact={editingContact}
          onSave={saveContact}
          onDelete={deleteContact}
          onCreateEmptyContact={createEmptyContact}
        />
      </div>
    </div>
  );
}

export default App;