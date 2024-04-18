import React from 'react';
import './Item.css';

const Item = ({ contact, onDelete, onEdit }) => {
  return (
    <div className="contact">
      <p onDoubleClick={() => onEdit(contact)}>
        {contact.fName} {contact.lName}
      </p>
      <span onClick={() => onDelete(contact.id)}>X</span>
    </div>
  );
}

export default Item;