import React from 'react';
import styles from './Loader.module.css';

const Loader = () => {
  return (
    <div className={styles.container}>
      <div className={`${styles.stick} ${styles.jumping}`}>
        <div className={styles.spinning}>
          <div className={styles['upper-circle']}></div>
          <div className={styles['trunk-rect']}></div>
          <div className={styles['lower-circle']}></div>
        </div>
      </div>
      <div className={`${styles.stick} ${styles.jumping} ${styles.middle}`}>
        <div className={styles.spinning}>
          <div className={styles['upper-circle']}></div>
          <div className={styles['trunk-rect']}></div>
          <div className={styles['lower-circle']}></div>
        </div>
      </div>
      <div className={`${styles.stick} ${styles.jumping}`}>
        <div className={styles.spinning}>
          <div className={styles['upper-circle']}></div>
          <div className={styles['trunk-rect']}></div>
          <div className={styles['lower-circle']}></div>
        </div>
      </div>
    </div>
  );
};

export default Loader;
