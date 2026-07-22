import styles from "./site-header.module.css";

// Site-wide header. Contains the main title and the signature
// "dusk sky" gradient strip that anchors the page's visual identity.
export function SiteHeader() {
  return (
    <header className={styles.header}>
      <div className={styles.skyStrip} aria-hidden="true"></div>
      <div className={styles.headerContent}>
        <h1 className={styles.title}>Israel Weather</h1>
        <p className={styles.subtitle}>Live forecast for every city in Israel, instantly</p>
      </div>
    </header>
  );
}
