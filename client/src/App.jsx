import { useEffect, useState, useRef } from 'react'
import io from 'socket.io-client'
import './App.css'
import Input from './components/Input';

const socket = io("http://localhost:3000");


function App() {

  const [message, setMessage] = useState({})
  const [uid, setUid] = useState("")

  const [messages, setMessages] = useState([])
  const messagesEndRef = useRef(null);







  function connectSocket() {
    socket.on('connect', () => {
      console.log("Connected to socket server as ", socket.id);

      setUid(socket.id);

    });


  }

  function handleInput(e) {
    let { name, value } = e.target;

    let message = {
      uid,
      value,
      time: new Date().toISOString(),
    };

    setMessage((prev) => ({ ...prev, ...message }));




  }

  function sendMessage() {
    console.log(message);


    socket.emit('message', message);

    setMessage({});
    setMessage("");

  }


  
  function clearMessage() {

    setMessages([]);
    socket.emit("clear-message", messages);
    setMessage({});
    setMessage("");

   
  }



  socket.on("message", (messages) => {
    setMessages(messages);
    console.log(messages);
  })








  useEffect(() => {
    connectSocket();
  }, [])


  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);



  // return (
  //   <>
  //     <h1>Socket Chat using Socket.io </h1>
  //     <div className='chat-container'>



  //       <div className='messages'>
  //         <div className="allmessages">
  //           {messages.map((msg, index) => (
  //             <div
  //               key={index}
  //               style={{
  //                 display: 'flex',
  //                 justifyContent: msg.uid === uid ? 'flex-end' : 'flex-start',
  //                 width: '100%',
  //               }}
  //             >
  //               <div
  //                 style={{
  //                   maxWidth: '70%',
  //                   minWidth: '10%',
  //                   height: 'auto',
  //                   margin: '5px',
  //                   padding: '10px',
  //                   fontSize: '16px',
  //                   fontWeight: 'bold',
  //                   backgroundColor: msg.uid === uid ? 'lightgreen' : 'lightblue',
  //                   borderRadius: '10px',
  //                   textAlign: 'left',
  //                   wordBreak: 'break-word',
  //                   color: 'black',
  //                 }}
  //                 className="single-message"
  //               >{msg?.value}
  //                 <div
  //                   style={{

  //                     fontSize: '10px',
  //                     color: 'grey',
  //                   }}
  //                 >

  //                   {new Date(msg.time).toLocaleTimeString()}
  //                 </div>
  //                 </div>


  //             </div>


  //           ))}
  //           <div ref={messagesEndRef} />
  //         </div>
  //       </div>


  //       <div className="send-message">
  //         <Input name="the-message" placeholder="Type your message here" handleInput={handleInput} />

  //         <button onClick={sendMessage}> Send </button>
  //       </div>
  //     </div>




  //   </>
  // )


  return(
    <>
  <h1 className="chat-title">💬 Socket Chat</h1>
  <div className="chat-container">
    <div className="messages">
      <div className="allmessages">
        {messages.map((msg, index) => (
          <div
            key={index}
            className={`message-wrapper ${msg.uid === uid ? 'sent' : 'received'}`}
          >
            <div className="single-message">
              {msg?.value}
              <div className="timestamp">
                
                {new Date(msg.time).toLocaleTimeString()}
              </div>
            </div>
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>
    </div>

    <div className="send-message">
      <Input
        name="the-message"
        placeholder="Type your message here..."
        handleInput={handleInput}
        value={message.value || ''}
      />
      <button onClick={sendMessage}>Send</button>
    </div>
            <button onClick={clearMessage}>Clear</button>

  </div>

</>

  )


}

export default App
