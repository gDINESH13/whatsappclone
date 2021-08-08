import React,{useContext,useState,useEffect, useCallback} from 'react'
import useLocalStorage from '../Hooks/useLocalStorage'
import {useContacts} from './ContactsProvider'
import { useSocket } from './SocketsProvider'

const ConversationsContext=React.createContext()

export function useConversations(){
    return useContext(ConversationsContext)
}

export function ConversationsProvider({id,children}) {

    const [conversations,setConversations]=useLocalStorage('conversations',[])
    const [selectedConversationindex,setSelectedConversationindex]=useState(0)
    const {contacts}=useContacts()
    const socket=useSocket()
    

    function createConversation(recipients){
        setConversations(prevConversations=>(
            [...prevConversations,{recipients,messages:[]}]
        ))
    }

    const formattedConversations=conversations.map((conversation,index)=>{
        const recipients=conversation.recipients.map(recipient=>{
            const contact= contacts.find(contact=>{
                return contact.id === recipient
            })
            const name=(contact && contact.name) || recipient
            return {id:recipient,name}
        })

        const messages=conversation.messages.map(message=>{
            const contact=contacts.filter(contact=>{
                return contact.id===message.sender
            })
            const name=(contact && contact.name ) || message.sender
            const fromMe=id===message.sender
            return {...message,senderName:name,fromMe}
        })
        const selected= index===selectedConversationindex
        return {...conversation,messages,recipients,selected}
    })

    const addMessageToConversations=useCallback((recipients,sender,text)=>{
        
        setConversations(prevConversations=>{
            let madeChange=false
            const newMessage={sender,text}

            const newConversation= prevConversations.map(conversation=>{
                
                if(arrayEquality(conversation.recipients,recipients)){
                    madeChange=true
                    return {...conversation,
                        messages:[...conversation.messages,newMessage]}
                }
                return conversation
            })
            if(madeChange){
                return newConversation
            }else{
                return [...prevConversations,
                {recipients,messages:newMessage} ]
            }
        })
    },[setConversations])

    useEffect(() => {
        if (socket==null) return null
        socket.on("connect_error", (err) => {
            console.log(`connect_error due to ${err.message}`);
          });
        socket.on('recieve-message',payload=>{
            console.log('recievedmessage')
            addMessageToConversations(payload.recipients,
                payload.sender,payload.text)
        })
        return () => {
            socket.off('recieve-message')
        }
    }, [socket,addMessageToConversations])

    function sendMessage(recipients,text){
        socket.emit('send-message',{recipients,text})
        //addMessageToConversations(recipients,id,text)
    }

    const value={
        conversations:formattedConversations,
        selectedConversation:formattedConversations[selectedConversationindex],
        createConversation,
        sendMessage,
        selectConversationIndex:setSelectedConversationindex
    }

    return(
        <ConversationsContext.Provider value={value}>
            {children}
        </ConversationsContext.Provider>
    )
}

function arrayEquality(a,b){
    if (a.length !== b.length) return false
    a.sort()
    b.sort()
    return a.every((element,index)=>{
        return element===b[index]
    })
}

