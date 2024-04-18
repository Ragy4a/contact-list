import { useState, useEffect } from 'react';
import './Form.css';
import PropTypes from 'prop-types';

const Form = ({ editingContact, onSave, onDelete, onCreateEmptyContact }) => {
  const [contact, setContact] = useState({ ...editingContact });

  useEffect(() => {
    setContact({ ...editingContact });
  }, [editingContact]);

  const onInputChange = (event) => {
    setContact({ 
      ...contact, 
      [event.target.name]: event.target.value 
    });
  }

  const onClearInput = (event) => {
    const sibling = event.target.previousSibling;
    setContact({ 
      ...contact, 
      [sibling.name]: '',
    });
  }

  const onContactDelete = () => {
    onDelete(contact.id);
    setContact(onCreateEmptyContact());
  }

  const onFormSubmit = (event) => {
    event.preventDefault();
    onSave(contact);
    if (!contact.id) {
      setContact(onCreateEmptyContact());
    }
  }

  const isEditing = contact.id !== null;
  return (
    <>
        <form onSubmit={onFormSubmit}>
            <div className="input-container">
              <div className="wrapper-input">
                <input 
                type="text" 
                placeholder='First Name'
                name='fName'
                value={contact.fName}
                onChange={onInputChange}
                />
                <span
                onClick={onClearInput}
                >X</span>
                </div>
              <div className="wrapper-input">
                <input 
                type="text" 
                placeholder='Last Name'
                name='lName'
                value={contact.lName}
                onChange={onInputChange}/>
                <span
                onClick={onClearInput}
                >X</span>
              </div>
              <div className="wrapper-input">
                <input 
                type="email" 
                name="email" 
                id="email" 
                placeholder='Email Address'
                value={contact.email}
                onChange={onInputChange}/>
                <span
                onClick={onClearInput}
                >X</span>
              </div>
              <div className="wrapper-input">
                <input 
                type="text" 
                placeholder='Phone Number'
                name='phone'
                value={contact.phone}
                onChange={onInputChange}/>
                <span
                onClick={onClearInput}
                >X</span>
              </div>
            </div>
            <div className="btn-container">
                <button type='submit'>Save</button>
                {isEditing && (
                  <button onClick={onContactDelete}>Delete</button>
                )}
            </div>
        </form>
    </>
  );
}

Form.propTypes = {
  editingContact: PropTypes.object.isRequired,
  onSave: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
  onCreateEmptyContact: PropTypes.func.isRequired
};

export default Form;