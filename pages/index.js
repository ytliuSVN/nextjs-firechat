import React, { useState, useEffect } from 'react';
import Head from 'next/head';
import styles from '../styles/Home.module.css';
// Firebase deps
import firebase from '../shared/configs/firebase';
// Components
import { GoogleButton, Channel, Loader } from '../components';
// Icons
import { Burn, MoonIcon, SunIcon } from '../components';
// Theme
import { useTheme } from 'next-themes';

const auth = firebase.auth();

function Home() {
  const [initializing, setInitializing] = useState(true);
  const [user, setUser] = useState(() => auth.currentUser);

  const [mounted, setMounted] = useState(false);
  const { theme, setTheme } = useTheme();

  // When mounted on client, now we can show the UI
  useEffect(() => setMounted(true), []);

  const switchTheme = () => {
    if (mounted) {
      setTheme(theme === 'light' ? 'dark' : 'light');
    }
  };

  const brandLogo =
    mounted && theme === 'dark'
      ? '/assets/Gray_logo.svg'
      : '/assets/KaiOS_logo.svg';

  const ThemeIcon = mounted && theme === 'dark' ? SunIcon : MoonIcon;

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
          <Loader />
        </div>
      );
    }

    if (user) return <Channel user={user} />;

    return (
      <div className='flex items-center justify-center shadow-md h-full'>
        <div className='flex flex-col items-center justify-center max-w-xl w-full mx-4 p-8 rounded-md shadow-card bg-white dark:bg-coolDark-600 transition-all'>
          <h2 className='mb-2 text-3xl flex items-center'>
            <Burn />
            KaiOS FireChat
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
        <title>KaiOS FireChat</title>
      </Head>
      <header
        className={`flex-shrink-0 flex items-center justify-between px-4 sm:px-8 shadow-md ${styles.header_space}`}
      >
        <a href='https://www.kaiostech.com/'>
          <img src={brandLogo} alt='KaiOS_logo' width={150} />
        </a>
        <div className='flex items-center'>
          {user ? (
            <button
              onClick={signOut}
              className='uppercase text-sm font-medium text-KaiBrand-500 hover:text-white tracking-wide hover:bg-KaiBrand-500 bg-transparent rounded py-2 px-4 mr-4 focus:outline-none focus:ring focus:ring-KaiBrand-500 focus:ring-opacity-75 transition-all'
            >
              Sign out
            </button>
          ) : null}
          <ThemeIcon className='h-8 w-8 cursor-pointer' onClick={switchTheme} />
        </div>
      </header>
      <main className={`flex-1 ${styles.main_space}`}>{renderContent()}</main>
    </div>
  );
}

export default Home;
