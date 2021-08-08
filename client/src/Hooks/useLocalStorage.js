import React,{useEffect,useState} from 'react'

const PREFIX='whatsapp-clone-'

function getSavedValue(prefixedKey,initalValue){
    
    const jsonValue=localStorage.getItem(prefixedKey)
        if (jsonValue!==null) return JSON.parse(jsonValue)
        if( initalValue instanceof Function){
            return initalValue()
        }else{
            return initalValue
        }
}

const useLocalStorage = (key,initialValue) => {
    const prefixedKey=PREFIX+key
    const [value,setValue]=useState(()=>{
        return getSavedValue(prefixedKey,initialValue)
    })
    useEffect(() => {
        localStorage.setItem(prefixedKey,JSON.stringify(value))
    },[prefixedKey,value])

    return [value,setValue]
}

export default useLocalStorage
