import { useState, useEffect } from 'react';
import List from './components/List/List';
import Form from './components/Form/Form';
import './App.css';
import api from './api/contacts-service'

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
    api.get('/')
      .then(({ data }) => {
        if (data.length > 0) {
          setContacts(data);
        } else {
          console.log("No contacts found");
        }
      })
      .catch((error) => console.error('Error loading the contacts: ', error));
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
        .then(({ data }) => {
          setContacts(prev => prev.map(item => item.id === data.id ? data : item));
          setEditingContact(createEmptyContact());
        })
        .catch(error => console.error('Error updating the contact: ', error));
    } else {
      const newContact = { ...contact };
      api.post('/', newContact)
        .then(({ data }) => {
          setContacts(prev => [...prev, data]);
          setEditingContact(createEmptyContact());
        })
        .catch(error => console.error('Error creating a new contact: ', error));
    }
  };

  const deleteContact = (id) => {
    api.delete(`/${id}`)
      .then(() => {
        const newContacts = contacts.filter(item => item.id !== id)
        setContacts(newContacts);
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