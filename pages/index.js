import React, { useState, useEffect } from 'react';
import Head from 'next/head';
// Firebase deps
import firebase from '../shared/configs/firebase';
// Components
import { GoogleButton, Channel } from '../components';
// Icons
import Burn from '../public/burn';

const auth = firebase.auth();

function Home() {
  const [initializing, setInitializing] = useState(true);
  const [user, setUser] = useState(() => auth.currentUser);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        setUser(user);
      } else {
        setUser(false);
      }
      if (initializing) {
        setInitializing(false);
      }
    });

    // Cleanup subscription
    return unsubscribe;
  }, [initializing]);

  const signInWithGoogle = async () => {
    // Retrieve Google provider object
    const provider = new firebase.auth.GoogleAuthProvider();
    // Set language to the default browser preference
    auth.useDeviceLanguage();
    // Start sign in process
    try {
      await auth.signInWithPopup(provider);
    } catch (error) {
      console.error(error.message);
    }
  };

  const signOut = async () => {
    try {
      await auth.signOut();
    } catch (error) {
      console.error(error.message);
    }
  };

  const renderContent = () => {
    if (initializing) {
      return (
        <div className='flex items-center justify-center h-full'>
          {/* <Loader size="lg" /> */}
        </div>
      );
    }

    if (user) return <Channel user={user} />;

    return (
      <div className='flex items-center justify-center shadow-md h-full'>
        <div className='flex flex-col items-center justify-center max-w-xl w-full mx-4 p-8 rounded-md shadow-card bg-white dark:bg-coolDark-600 transition-all'>
          <h2 className='mb-2 text-3xl flex items-center'>
            <Burn />
            NextJS FireChat
          </h2>
          <p className='mb-8 text-lg text-center text-gray-500'>
            The easiest way to chat with people all around the world.
          </p>
          <GoogleButton onClick={signInWithGoogle}>
            Sign in with Google
          </GoogleButton>
        </div>
      </div>
    );
  };

  return (
    <div className='flex flex-col h-full bg-white dark:bg-coolDark-500 dark:text-white transition-colors'>
      <Head>
        <title>NextJS FireChat</title>
      </Head>
      <header
        className='flex-shrink-0 flex items-center justify-between px-4 sm:px-8 shadow-md'
        style={{ height: 'var(--topbar-height)' }}
      >
        {/* <a href='https://alterclass.io/courses/react'>
          <img src={brandLogo} alt='AlterClass' width={150} />
        </a> */}
        <div className='flex items-center'></div>
      </header>
      {user ? (
        <>
          <GoogleButton onClick={signOut}>Sign out</GoogleButton>
          <Channel user={user} />
        </>
      ) : (
        renderContent()
      )}
    </div>
  );
}

export default Home;
