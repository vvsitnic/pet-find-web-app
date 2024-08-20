import styles from './loading-sircle.module.css';

import React from 'react';

const LoadingCircle = () => {
  return (
    <div className={styles.circleContainer}>
      <div className={styles.loadingCircle} />
    </div>
  );
};

export default LoadingCircle;
