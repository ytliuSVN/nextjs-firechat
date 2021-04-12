import React, { useState, useEffect } from 'react';
import Head from 'next/head';
// Firebase deps
import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';

// Initialize Firebase
firebase.initializeApp({
  apiKey: 'AIzaSyDtpGIPW1hpu5k31VOjZ5TnJ5ZFMNsDN_4',
  authDomain: 'nextjs-firechat.firebaseapp.com',
  projectId: 'nextjs-firechat',
  storageBucket: 'nextjs-firechat.appspot.com',
  messagingSenderId: '403202463289',
  appId: '1:403202463289:web:8a4a1be2a6c835dad69fe8',
});

function Home() {
  return (
    <div>
      <Head>
        <title>NextJS FireChat</title>
      </Head>
    </div>
  );
}

export default Home;
