import React from 'react'
import { useState } from 'react'


//the user enters a passsword and we send a post request with it once the submit button is clicked. if the request returns a 200 response then
// check to see match is true and go to display. false then check for exist and go to password or error accordingly.

const Password = (props) => {
    const messageId = props.message_id
    let setView = props.setView
    let setMessage = props.setMessage
    const [guess, setGuess] = useState("")

    let api_message = {
        purpose:"password-try",
        message_id:messageId,
        password:guess
    }; 

    const handleSubmit = async () => {
        fetch('https://6wbpvzt5d1.execute-api.ca-central-1.amazonaws.com/dev/get-message', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(api_message)
    })
    .then(response => {
        if (!response.ok) {
            console.log("ERROR: ", response.status);
            setView('error');
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
    })
    .then((data => {
        // if it is the right password, show the message
        if (data.password_match){
            setMessage(data.message)
            setView('display')
        }
        // if it is not the right password but it does exist so there are more attempts left, then stay on password
        else if (data.exists)
        {
            setView('password')
        }
        //if it was wrong and the last attempt was used up so it has been deleted, go to the error page
        else{
            setView('error')
        }
    }))
    .catch(error => {
        console.log('Error', error);
        setView('error');
    });
    }

  return (
    <div className='password-page'>
        <form className='pasword-form'>
            <label className='password-label'>Password:
                <input
                type="text"
                value={guess}
                onChange={(e) => setGuess(e.target.value)}>
                </input>
            </label>
        </form>
        <button onClick={handleSubmit}>Enter</button>
    </div>
  )
}


export default Password