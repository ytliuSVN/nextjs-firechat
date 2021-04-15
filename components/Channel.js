import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
// Firebase deps
import firebase from '../shared/configs/firebase';
// Components
import { Message } from '../components';

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
          <li key={message.id}>
            <Message {...message} />
          </li>
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

Channel.propTypes = {
  user: PropTypes.shape({
    uid: PropTypes.string,
    displayName: PropTypes.string,
    photoURL: PropTypes.string,
  }),
};

export default Channel;
