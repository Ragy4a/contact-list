import React from 'react';
import Item from '../Item/Item';
import './List.css';

const List = ({ contacts, onDelete, onAddContact, onSelectContact }) => {
  return (
    <div className="list">
      <div className="contacts">
        {contacts.map((contact) => (
          <Item 
            key={contact.id}
            contact={contact}
            onDelete={onDelete}
            onEdit={onSelectContact}
          />
        ))}
      </div>
      <button id='create-new' onClick={onAddContact}>New</button>
    </div>
  );
}

export default List;