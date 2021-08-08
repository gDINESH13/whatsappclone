import React from 'react'
import useLocalStorage from '../Hooks/useLocalStorage'
import Login from './Login'
import DashBoard  from './DashBoard'
import { ContactsProvider } from '../contexts/ContactsProvider'
import { ConversationsProvider } from '../contexts/ConversationsProvider'
import { SocketsProvider } from '../contexts/SocketsProvider'


const App = () => {
    const [id,setId]=useLocalStorage('id')
    const dashBoard=(
        <SocketsProvider id={id}>
            <ContactsProvider>
                <ConversationsProvider id={id}>
                    <DashBoard id={id}/>
                </ConversationsProvider>
            </ContactsProvider>
        </SocketsProvider>
    )
    return (
        <>
        {id ? dashBoard:<Login onIdSubmit={setId}/>}
        
        </>
    )
}

export default App
