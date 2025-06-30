import { useState, useEffect } from 'react';
import Landing from './components/Landing';
import Verifying from './components/Verifying';
import Error from './components/Error';
import Password from './components/Password';
import Display from './components/Display';
import './App.css';

function App() {
    // keeps track of wthe value of the message_id param in the query, if it exists
    let [messageId, setMessgeId] = useState(null)
    let options = ['landing','verifying','password','error','display']
    let [view, setView] = useState(options[1])
    let [message, setMessage] = useState("");


    // ensures the check only happens once, when the page is first rendered
    useEffect(() => {

        //attempt to retrieve the value associated with the messageId, if any
        const queryParams = new URLSearchParams(window.location.search);
        const id = queryParams.get('message_id')

        //if it is not null then there is a paramter of that type and we modify our state accordingly
        if (id){
            setMessgeId(id);
            setView(options[1]);
           console.log("The message id is: ", id);
        }
        else{
          setView(options[0])
        }

        
     }, []);

  return (
    <>
        {view == 'landing' && <Landing/>}
        {view == 'verifying' && <Verifying message_id={messageId} setView={setView}/>}
        {view == 'error' && <Error/>}
        {view == 'password' && <Password message_id={messageId} setView={setView} setMessage={setMessage}/>}
        {view == 'display' && <Display message={message}/>}
    </>
  )
}

export default App;
