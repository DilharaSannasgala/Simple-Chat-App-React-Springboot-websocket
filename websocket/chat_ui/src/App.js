import React, { useState, useEffect } from 'react';
import Stomp from 'stompjs';
import SockJS from 'sockjs-client';
import { Button, List, ListItem, Avatar, ListItemText, Typography, TextField, Box } from '@mui/material';

const App = () => {
  const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState('');
  const [name, setName] = useState('');
  const [stompClient, setStompClient] = useState(null);
  const [isConnected, setIsConnected] = useState(false);

  useEffect(() => {
    const socket = new SockJS('http://localhost:8080/ws');
    const client = Stomp.over(socket);

    client.connect({}, () => {
      setIsConnected(true);
      const subscription = client.subscribe('/topic/messages', (message) => {
        const receivedMessage = JSON.parse(message.body);
        setMessages(prevMessages => [...prevMessages, receivedMessage]);
      });

      setStompClient(client);

      return () => {
        subscription.unsubscribe();
        if (client.connected) {
          client.disconnect(() => {
            console.log('Disconnected');
            setIsConnected(false);
          });
        }
      };
    });
  }, []);

  const handleNameChange = (e) => {
    setName(e.target.value);
  };

  const handleMessageChange = (e) => {
    setMessage(e.target.value);
  };

  const sendMessage = () => {
    if (message.trim() && isConnected) {
      const chatMessage = {
        name,
        content: message
      };
      stompClient.send('/app/chat', {}, JSON.stringify(chatMessage));
      setMessage('');
    }
  };

  const messageStyle = (msgName) => ({
    maxWidth: '70%',
    borderRadius: 4,
    padding: '10px 10px',
    color: 'white',
    background: msgName === name ? '#0B93F6' : '#E5E5EA',
    alignSelf: msgName === name ? 'flex-end' : 'flex-start',
    marginLeft: msgName === name ? 'auto' : '10px',
    marginRight: msgName === name ? '10px' : 'auto',
  });

  return (
    <div>
      <List sx={{ width: '100%', bgcolor: 'background.paper' }}>
        {messages.map((msg, index) => (
          <ListItem key={index} sx={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', padding: '8px 0' }}>
            <Box sx={messageStyle(msg.name)}>
              <Typography variant="caption" sx={{ color: msg.name === name ? 'white' : 'black' }}>{msg.name}</Typography>
              <Typography variant="body1" sx={{ color: msg.name === name ? 'white' : 'black' }}>{msg.content}</Typography>
            </Box>
          </ListItem>
        ))}
      </List>
      <div style={{ display: 'flex', alignItems: 'center' }}>
        <TextField label="Name" variant="standard" value={name} onChange={handleNameChange} fullWidth margin="normal" />
        <TextField label="Message" variant="standard" value={message} onChange={handleMessageChange} fullWidth margin="normal" />
        <Button variant="contained" onClick={sendMessage} disabled={!message.trim() || !isConnected}>Send</Button>
      </div>
    </div>
  );
};

export default App;
