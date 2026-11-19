import { Link } from "react-router-dom";
import styles from "./not-found-page.module.css";

export function NotFoundPage() {
  return (
    <main className="page-container">
      <section className={styles.card}>
        <p className={styles.code}>404</p>
        <h2 className={styles.title}>Page not found</h2>
        <p className={styles.text}>The page you're looking for doesn't exist.</p>
        <Link to="/" className={styles.link}>
          Back to Home
        </Link>
      </section>
    </main>
  );
}
