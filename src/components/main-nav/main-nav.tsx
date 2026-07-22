import { NavLink } from "react-router-dom";
import styles from "./main-nav.module.css";

// Primary site navigation. Highlights the active page using NavLink's
// built-in active-state styling.
export function MainNav() {
  const getLinkClassName = (isActive: boolean): string => {
    return isActive ? `${styles.link} ${styles.linkActive}` : styles.link;
  };

  return (
    <nav className={styles.nav}>
      <NavLink to="/" end className={({ isActive }) => getLinkClassName(isActive)}>
        Home
      </NavLink>
      <NavLink to="/history" className={({ isActive }) => getLinkClassName(isActive)}>
        Search History
      </NavLink>
      <NavLink to="/about" className={({ isActive }) => getLinkClassName(isActive)}>
        About
      </NavLink>
    </nav>
  );
}
