import React,{useState} from 'react'
import{Tab,Nav,Button,Modal} from 'react-bootstrap'
import Conversations from './Conversations'
import Contacts from './Contacts'
import NewContactModal from './NewContactModal'
import NewConversationModal from './NewConversationModal'

const CONVERSATIONS_KEY='conversations'
const CONTACTS_KEY='contacts'

const SideBar = (props) => {
    const [activeKey,setActiveKey]=useState(CONVERSATIONS_KEY)
    const [modalOpen,setModalOpen]=useState(false)
    const conversationOpen= activeKey===CONVERSATIONS_KEY

    function closeModal(){
        setModalOpen(false)
    }
    return (
        <div style={{width:'250px'}} className="d-flex flex-column">
            <Tab.Container activeKey={activeKey} onSelect={setActiveKey} unmountOnExit={true}>
                <Nav variant='tabs' className="justify-content-center">
                    <Nav.Item>
                        <Nav.Link eventKey={CONVERSATIONS_KEY}>Conversations</Nav.Link>
                    </Nav.Item>
                    <Nav.Item>
                        <Nav.Link eventKey={CONTACTS_KEY}>Contacts</Nav.Link>
                    </Nav.Item>
                </Nav>

                <Tab.Content className="border  border-right border-dark flex-grow-1 overflow-auto">
                    <Tab.Pane eventKey={CONVERSATIONS_KEY}>
                        <Conversations/>
                    </Tab.Pane>  
                    <Tab.Pane eventKey={CONTACTS_KEY}>
                        <Contacts/>
                    </Tab.Pane>  
                </Tab.Content>
                <div className="p-2 border border-top border-right small">
                    <span className="text-muted">{props.id}</span>
                </div>
                <Button className="rounded-0" onClick={()=>setModalOpen(true)}>
                    New {conversationOpen? 'Conversation':'Contact'}
                </Button>
            </Tab.Container>

            <Modal show={modalOpen} onHide={closeModal}>
                {conversationOpen?<NewConversationModal closeModal={closeModal}/>
                :<NewContactModal closeModal={closeModal}/>}
            </Modal>
        </div>
    )
}

export default SideBar
