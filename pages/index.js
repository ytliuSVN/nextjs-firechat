import React, { useState, useEffect } from 'react';
import Head from 'next/head';
// Firebase deps
import firebase from '../shared/configs/firebase';
// Components
import { GoogleButton, Channel } from '../components';

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

  // if (initializing) return 'Loading ...';

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
            <svg
              xmlns='http://www.w3.org/2000/svg'
              viewBox='0 0 20 20'
              fill='url(#burn)'
              // fill='currentColor'
              className='flex-shrink-0 w-12 h-12 mr-1 text-primary-500 text-blue-500'
            >
              <defs>
                <linearGradient
                  x1='50%'
                  y1='92.034%'
                  x2='50%'
                  y2='7.2%'
                  id='burn'
                >
                  <stop offset='0%' stop-color='currentColor' />
                  <stop offset='100%' stop-color='red' />
                </linearGradient>
              </defs>
              <path
                fillRule='evenodd'
                d='M12.395 2.553a1 1 0 00-1.45-.385c-.345.23-.614.558-.822.88-.214.33-.403.713-.57 1.116-.334.804-.614 1.768-.84 2.734a31.365 31.365 0 00-.613 3.58 2.64 2.64 0 01-.945-1.067c-.328-.68-.398-1.534-.398-2.654A1 1 0 005.05 6.05 6.981 6.981 0 003 11a7 7 0 1011.95-4.95c-.592-.591-.98-.985-1.348-1.467-.363-.476-.724-1.063-1.207-2.03zM12.12 15.12A3 3 0 017 13s.879.5 2.5.5c0-1 .5-4 1.25-4.5.5 1 .786 1.293 1.371 1.879A2.99 2.99 0 0113 13a2.99 2.99 0 01-.879 2.121z'
                clipRule='evenodd'
              />
            </svg>
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
