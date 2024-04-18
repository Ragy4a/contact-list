import { Component } from 'react'
import './Item.css'

export class Item extends Component {

  onContactDelete = () => {
    this.props.onDelete(this.props.contact.id)
  }

  onContactEdit = () => {
    this.props.onEdit(this.props.contact)
  }

  render() {
    return (
      <>
        <div className="contact">
          <p
            onDoubleClick={this.onContactEdit}
          >
            {this.props.contact.fName} {this.props.contact.lName}
          </p>
          <span
            onClick={this.onContactDelete}
          >X</span>
        </div>
      </>
    )
  }
}

export default Item