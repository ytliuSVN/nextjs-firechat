import styles from './Loader.module.css';

const Loader = () => {
  const spinning = () => (
    <div className={styles.spinning}>
      <div className={styles.upper_circle}></div>
      <div className={styles.trunk_rect}></div>
      <div className={styles.lower_circle}></div>
    </div>
  );

  const buildSpinner = [1, 2, 3].map((_, idx) => {
    return (
      <div
        className={
          `${styles.stick} ${styles.jumping}` +
          (idx === 1 ? ` ${styles.middle}` : '')
        }
        key={idx}
      >
        {spinning()}
      </div>
    );
  });

  return <div className={styles.container}>{buildSpinner}</div>;
};

export default Loader;
