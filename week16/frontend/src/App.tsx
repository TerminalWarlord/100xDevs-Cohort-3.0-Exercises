import { useState, useEffect, useRef } from 'react'
import './App.css'

function App() {
  const [socket, setSocket] = useState()
  const inputRef = useRef();

  function handleMessage() {
    if (!socket) {
      return;
    }

    const message = inputRef.current.value;

    // @ts-ignore
    socket.send(message);
  }


  useEffect(() => {
    const ws = new WebSocket("ws://localhost:8080");
    setSocket(ws);

    // @ts-ignore
    ws.onmessage = ev => {
      alert(ev.data);
    }
  }, []);
  return (
    <>
      <div>
        <input type="text" placeholder='Send a message' ref={inputRef} />
        <button onClick={handleMessage}>Send</button>

      </div>
    </>
  )
}

export default App
