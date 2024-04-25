import { useState, useEffect } from 'react';
import List from './components/List/List';
import Form from './components/Form/Form';
import './App.css';
import { nanoid } from 'nanoid';
import api from './api/contacts-service'


const App = () => {
  const [contacts, setContacts] = useState([]);
  const [editingContact, setEditingContact] = useState(createEmptyContact());

  function createEmptyContact() {
    return { id: null, fName: '', lName: '', email: '', phone: '' };
  }

  useEffect(() => {
    api.get('/')
      .then(response => {
        setContacts(response.data);
      })
      .catch(error => console.error('Error loading the contacts: ', error));
  }, []);

  const addNewContact = () => {
    setEditingContact(createEmptyContact());
  };

  const selectContact = (contact) => {
    setEditingContact(contact);
  };

  const saveContact = (contact) => {
    if (contact.id) {
      api.put(`/${contact.id}`, contact)
        .then(response => {
          const updatedContacts = contacts.map(c => c.id === contact.id ? response.data : c);
          setContacts(updatedContacts);
          setEditingContact(createEmptyContact());
        })
        .catch(error => console.error('Error updating the contact: ', error));
    } else {
      api.post('/', { ...contact, id: nanoid() })
        .then(response => {
          setContacts([...contacts, response.data]);
          setEditingContact(createEmptyContact());
        })
        .catch(error => console.error('Error creating a new contact: ', error));
    }
  };

  const deleteContact = (id) => {
    api.delete(`/${id}`)
      .then(() => {
        const updatedContacts = contacts.filter(c => c.id !== id);
        setContacts(updatedContacts);
      })
      .catch(error => console.error('Error deleting the contact: ', error));
  };

  return (
    <div className="project-container">
      <h2>Contact List</h2>
      <div className="wrapper">
        <List
          contacts={contacts}
          onDelete={deleteContact}
          onAddContact={addNewContact}
          onSelectContact={selectContact}
        />
        <Form
          key={editingContact.id || 'new-contact'}
          editingContact={editingContact}
          onSave={saveContact}
          onDelete={deleteContact}
          onCreateEmptyContact={createEmptyContact}
        />
      </div>
    </div>
  );
};

export default App;