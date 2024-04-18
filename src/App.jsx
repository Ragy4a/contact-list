import { Component } from 'react'
import List from './components/List/List'
import Form from './components/Form/Form'
import './App.css'
import { nanoid } from 'nanoid'

export class App extends Component {

  state = {
    contacts: [],
    editingContact: this.createEmptyContact(),
  }

  createEmptyContact () {
    return {
      id: null,
      fName: '',
      lName: '',
      email: '',
      phone: '',
    }
  }

  componentDidMount () {
    const contacts = JSON.parse(localStorage.getItem('contacts'));
    if(!contacts) {
      this.setState({
        contacts: [],
      })
    } else {
      this.setState({
        contacts: [...contacts],
      })
    }
  }

  saveContactsToLocalStorage (contacts) {
    localStorage.setItem('contacts', JSON.stringify(contacts));
  }

  addNewContact = () => {
    this.setState({
      editingContact: this.createEmptyContact()
    })
  }

  selectContact = (contact) => {
    this.setState({
      editingContact: contact,
    })
  }

  createContact = (contact) => {
    contact.id = nanoid();
    const contacts = [...this.state.contacts, contact]
    this.saveContactsToLocalStorage(contacts)
    this.setState({
      contacts: contacts,
      editingContact: this.createEmptyContact(),
    })
  }

  updateContact = (contact) => {
    this.setState((state) => {
      const contacts = state.contacts.map(c => 
        c.id === contact.id ? contact : c
      )
      this.saveContactsToLocalStorage(contacts);
      return {
        contacts,
        editingContact: contact,
      }
    })
  }

  deleteContact = (id) => {
    const contacts = [...this.state.contacts.filter((contacts) => contacts.id !== id)]
    this.setState({
      contacts: contacts,
    })
    this.saveContactsToLocalStorage(contacts)
  }

  saveContact = (contact) => {
    if (!contact.id) {
      this.createContact(contact);
    } else {
      this.updateContact(contact);
    }
  }

  render() {
    return (
      <>
        <div className="project-container">
          <h2>Contact list</h2>
          <div className="wrapper">
            <List
              contacts={this.state.contacts}
              onDelete={this.deleteContact}
              onAddContact={this.addNewContact}
              onSelectContact={this.selectContact}
            />
            <Form
              key={this.state.editingContact.id}
              editingContact={this.state.editingContact}
              onSave={this.saveContact}
              onDelete={this.deleteContact}
              onCreateEmptyContact={this.createEmptyContact}
            />
          </div>
        </div>
      </>
    )
  }
}

export default App