import React,{useState} from 'react'
import {Modal,Button,Form} from 'react-bootstrap';
import { useContacts } from '../contexts/ContactsProvider';
import{useConversations} from '../contexts/ConversationsProvider'
const NewConversationModal = (props) => {

    const [selectedContactsIds,setSelectedContactsids]=useState([])
    const {createConversation}=useConversations()
    const {contacts} =useContacts()
    
    function handleSubmit(e){
      e.preventDefault()
      createConversation(selectedContactsIds)
      props.closeModal()
    }

    function handleCheckBoxChange(contactId){
      setSelectedContactsids(prevSelectedContactsIds=>{
        if (prevSelectedContactsIds.includes(contactId)){
          return prevSelectedContactsIds.filter(prevId=>{
            return contactId!==prevId
          })
        }
        else{
          return [...prevSelectedContactsIds,contactId]
        }
      })
    }

    return (
      <>
      <Modal.Header closeButton>Create Conversation</Modal.Header>
      <Modal.Body>
          <Form onSubmit={handleSubmit}>
              {contacts.map(contact=>(
                <Form.Group controlId={contact.id} key={contact.id}>
                  <Form.Check
                    type="checkbox"
                    value={selectedContactsIds.includes(contact.id)}
                    label={contact.name}
                    onChange={()=>handleCheckBoxChange(contact.id)}
                  /> 
                </Form.Group>
              ))}
              <Button type="submit">Create</Button>
          </Form>
          
      </Modal.Body>
  </>
    )
}

export default NewConversationModal
