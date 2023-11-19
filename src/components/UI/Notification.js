import styles from './Notification.module.css';

const Notification = ({ title, message, status }) => {
  let specialClasses = '';

  if (status === 'error') {
    specialClasses = styles.error;
  }
  if (status === 'success') {
    specialClasses = styles.success;
  }

  const cssClasses = `${styles.notification} ${specialClasses}`;

  return (
    <section className={cssClasses}>
      <h2>{title}</h2>
      <p>{message}</p>
    </section>
  );
};

export default Notification;
