
import React, { useState, useEffect } from 'react';
import io from 'socket.io-client';
const socket = io('http://localhost:3001');

function App() {
  const [message, setMessage] = useState('');
  const [chat, setChat] = useState([]);

  useEffect(() => {
    socket.on('chat message', (msg) => {
      setChat([...chat, msg]);
    });
  }, [chat]);

  const sendMessage = (e) => {
    e.preventDefault();
    socket.emit('chat message', message);
    setMessage('');
  };

  return (
    <div className="p-4">
      <ul>
        {chat.map((msg, index) => <li key={index}>{msg}</li>)}
      </ul>
      <form onSubmit={sendMessage}>
        <input value={message} onChange={(e) => setMessage(e.target.value)} />
        <button type="submit">Send</button>
      </form>
    </div>
  );
}

export default App;
