import styles from "./site-footer.module.css";

// Site-wide footer. Shows a copyright line on every page.
export function SiteFooter() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className={styles.footer}>
      <p className={styles.text}>© {currentYear} Samuel Sion. All rights reserved.</p>
    </footer>
  );
}
