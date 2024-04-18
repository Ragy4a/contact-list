import { Component } from 'react'
import './Form.css'

export class Form extends Component {

  state = {
    ...this.props.editingContact
  }

  onInputChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value,
    })
  }

  onClearInput = (event) => {
    const sibling = event.target.previousSibling;
    this.setState({
      [sibling.name]: '',
    })
  } 

  onContactDelete = () => {
    this.props.onDelete(this.props.editingContact.id);
    this.setState({
      ...this.props.onCreateEmptyContact(),
    })
  }

  onFormSubmit = (event) => {
    event.preventDefault();
    this.props.onSave({
      ...this.state,
    })
    if (!this.state.id) {
      this.setState({
        ...this.props.onCreateEmptyContact(),
      })
    }
  }

  render() {
    const isEditing = this.state.id !== null;
    return (
        <>
            <form onSubmit={this.onFormSubmit}>
                <div className="input-container">
                  <div className="wrapper-input">
                    <input 
                    type="text" 
                    placeholder='First Name'
                    name='fName'
                    value={this.state.fName}
                    onChange={this.onInputChange}
                    />
                    <span
                    onClick={this.onClearInput}
                    >X</span>
                    </div>
                  <div className="wrapper-input">
                    <input 
                    type="text" 
                    placeholder='Last Name'
                    name='lName'
                    value={this.state.lName}
                    onChange={this.onInputChange}/>
                    <span
                    onClick={this.onClearInput}
                    >X</span>
                  </div>
                  <div className="wrapper-input">
                    <input 
                    type="email" 
                    name="email" 
                    id="email" 
                    placeholder='Email Adress'
                    value={this.state.email}
                    onChange={this.onInputChange}/>
                    <span
                    onClick={this.onClearInput}
                    >X</span>
                  </div>
                  <div className="wrapper-input">
                    <input 
                    type="text" 
                    placeholder='Phone Number'
                    name='phone'
                    value={this.state.phone}
                    onChange={this.onInputChange}/>
                    <span
                    onClick={this.onClearInput}
                    >X</span>
                  </div>
                </div>
                <div className="btn-container">
                    <button type='submit'>Save</button>
                    {isEditing && (
                      <button onClick={this.onContactDelete}>Delete</button>
                    )}
                </div>
            </form>
        </>
    )
  }
}

export default Form