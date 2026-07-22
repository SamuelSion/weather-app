import styles from "./about-page.module.css";

export function AboutPage() {
  return (
    <div className="page-container">
      <h2 className={styles.title}>About This Site</h2>

      <section className={styles.card}>
        <h3 className={styles.cardTitle}>What the site does</h3>
        <p className={styles.text}>
          Choose any city in Israel from the full list, or type a location manually, and see its
          current weather instantly. Every search is saved on the History page, so you can look
          back at which locations were checked and when.
        </p>
      </section>

      <section className={styles.card}>
        <h3 className={styles.cardTitle}>Data sources</h3>
        <p className={styles.text}>
          The list of localities comes from Israel's open government data portal (data.gov.il),
          and current weather data comes from the WeatherAPI service.
        </p>
      </section>

      <section className={styles.card}>
        <h3 className={styles.cardTitle}>Animated weather icons</h3>
        <p className={styles.text}>
          Instead of a static picture, each result is drawn as a small animation built for this
          site: a spinning sun, a drifting cloud, falling rain or snow, and a flashing bolt for
          storms — chosen by matching keywords in the condition text returned by the API. The
          wind lines in the corner of the icon are tied to the real measured wind speed: the
          calmer the wind, the slower and fainter they move, and the stronger the wind, the
          faster and bolder they animate.
        </p>
      </section>

      <section className={styles.card}>
        <h3 className={styles.cardTitle}>Developer</h3>
        <p className={styles.text}>
          Samuel Sion — Full Stack Development student at John Bryce.
          <br />
          GitHub:{" "}
          <a
            href="https://github.com/samuel-sion"
            target="_blank"
            rel="noopener noreferrer"
            className={styles.link}
          >
            samuel-sion
          </a>
        </p>
      </section>
    </div>
  );
}
