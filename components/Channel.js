import React, { useState, useEffect } from 'react';
// Firebase deps
import firebase from '../shared/configs/firebase';

function Channel({ user = null }) {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const { uid, displayName, photoURL } = user;

  const db = firebase.firestore();
  const query = db.collection('messages').orderBy('createdAt').limit(100);

  useEffect(() => {
    // Subscribe to query with onSnapshot
    const unsubscribe = query.onSnapshot((querySnapshot) => {
      // Get all documents from collection - with IDs
      const data = querySnapshot.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      }));
      // Update state
      // setDocs(data);
      setMessages(data);
    });

    // Detach listener
    return unsubscribe;
  }, []);

  const handleOnChange = (e) => {
    setNewMessage(e.target.value);
  };

  const handleOnSubmit = (e) => {
    e.preventDefault();

    const trimmedMessage = newMessage.trim();
    if (db) {
      // Add new message in Firestore
      db.collection('messages').add({
        text: trimmedMessage,
        createdAt: firebase.firestore.FieldValue.serverTimestamp(),
        uid,
        displayName,
        photoURL,
      });
      // Clear input field
      setNewMessage('');
    }
  };

  return (
    <>
      <ul>
        {messages.map((message) => (
          <li key={message.id}>{message.text}</li>
        ))}
      </ul>
      <form onSubmit={handleOnSubmit}>
        <input
          type='text'
          value={newMessage}
          onChange={handleOnChange}
          placeholder='Type your message here...'
        />
        <button type='submit' disabled={!newMessage}>
          Send
        </button>
      </form>
    </>
  );
}

export default Channel;
