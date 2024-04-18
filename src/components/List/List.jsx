import React from 'react';
import Item from '../Item/Item';
import './List.css';
import PropTypes from 'prop-types'

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

List.propTypes = {
  contacts: PropTypes.array,
  onDelete: PropTypes.func.isRequired,
  onAddContact: PropTypes.func.isRequired,
  onSelectContact: PropTypes.func.isRequired
};

List.defaultProps = {
  contacts: []
};

export default List;