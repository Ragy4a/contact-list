import { Component } from 'react'
import Item from '../Item/Item'
import './List.css'

export class List extends Component {
  render() {
    return (
      <>
        <div className="list">
            <div className="contacts">
                {this.props.contacts.map((contact) => {
                  return (
                    <Item 
                      key={contact.id}
                      contact={contact}
                      onDelete={this.props.onDelete}
                      onEdit={this.props.onSelectContact}
                    />
                  )
                })}
            </div>
            <button 
            id='create-new'
            onClick={this.props.onAddContact}
            >New</button>
        </div>
      </>
    )
  }
}

export default List