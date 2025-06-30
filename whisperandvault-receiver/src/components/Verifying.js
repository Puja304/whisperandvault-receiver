
import React, { useEffect } from 'react'
import { useState } from "react"


//function that makes the post request and returns null unless the response is a 200 ok
function fetchData(api_message) {
    console.log("i got started with the fetch function")
    return fetch('https://6wbpvzt5d1.execute-api.ca-central-1.amazonaws.com/dev/get-message', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(api_message)
    })
    .then(response => {
        if (!response.ok) {
            console.log("ERROR: ", response.status);
            return null;
        }
        return response.json();
    })
    .catch(error => {
        console.log('Error', error);
        return null;
    });
}



const Verifying = (props) => {
    const messageId = props.message_id
    let setView = props.setView
    console.log(messageId)

    //step 1: verify the existence of the a message associated with that id


    //step 1.1: message to send to the api
    let api_message = {
    purpose:"verify",
    message_id:messageId
    }; 

    //step 1.2 send post request and decide on a page depending on the response
    useEffect(() => {
        if (messageId){
            fetchData(api_message).then(data => {
                if (data == null){
                    setView('error')
                }
                else if (data.exist){
                    setView('password')
                }
                else{
                    setView('error')
                }
            })
        }
    }, [messageId]);

    //Step 1.3 if it successfully returns, check status

    

  return (
    <div>Loading...</div>
  )
}


export default Verifying