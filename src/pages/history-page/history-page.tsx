import { useEffect, useState } from "react";
import type { SearchHistoryEntry } from "../../types/weather";
import { loadSearchHistory } from "../../utils/history-storage";
import styles from "./history-page.module.css";

export function HistoryPage() {
  const [historyEntries, setHistoryEntries] = useState<SearchHistoryEntry[]>([]);

  useEffect(() => {
    const savedHistory = loadSearchHistory();
    setHistoryEntries(savedHistory);
  }, []);

  return (
    <main className="page-container">
      <h2 className={styles.title}>Search History</h2>

      {historyEntries.length === 0 ? (
        <p className={styles.emptyText}>No searches yet. Look up a location on the Home page to get started.</p>
      ) : (
        <table className={styles.table}>
          <thead>
            <tr>
              <th>Date &amp; Time</th>
              <th>Location</th>
              <th>Country</th>
            </tr>
          </thead>
          <tbody>
            {historyEntries.map((entry, index) => (
              <tr key={index}>
                <td>{entry.searchedAt}</td>
                <td>{entry.localityName}</td>
                <td>{entry.country}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </main>
  );
}