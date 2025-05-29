
import { useEffect, useState } from 'react';
import './App.css'

function App() {
 
const [socket, setSocket] = useState<WebSocket | null>(null);
const [message, setMessage] = useState<string>("");
useEffect(() => {
  const ws = new WebSocket("ws://localhost:8080");
 
  ws.onopen = () => {
    console.log("connected");
    setSocket(ws);
  };
  ws.onmessage = (event) => {
    console.log("received: %s", event.data);
    setMessage(event.data);
  };
  ws.onclose = () => {
    console.log("disconnected");
  };
}, []);

  if(!socket){
  return <div>Connecting...</div>
  }
  return (
    <>
    <input></input>
    <button onClick={() => {
      if(socket){
        socket.send("Hello from client");
      }
    }}>Send Message</button>
    {message && <div className="message">Message from server: {message}</div>}
      
    </>
  )
}

export default App
