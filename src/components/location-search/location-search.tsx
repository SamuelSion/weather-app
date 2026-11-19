import { useEffect, useMemo, useRef, useState } from "react";
import type { Locality } from "../../types/locality";
import styles from "./location-search.module.css";

interface LocationSearchProps {
  localities: Locality[];
  isLoadingLocalities: boolean;
  // matchedLocality is the full record when the search matched an entry from
  // the official Israeli locality list (clicked, or typed and matched
  // exactly), and null for a free-text query with no match in that list.
  onSearch: (query: string, displayName: string, matchedLocality: Locality | null) => void;
}

const MAX_FILTERED_SUGGESTIONS = 12;

// Strips punctuation marks that commonly vary between spellings of the same
// name (Hebrew geresh/gershayim, plain quotes) and collapses whitespace,
// so "בוקעאתא" typed by hand still matches the list even with small
// punctuation differences.
function normalizeForMatch(value: string): string {
  return value
    .trim()
    .replace(/["'׳״]/g, "")
    .replace(/\s+/g, " ")
    .toLowerCase();
}

export function LocationSearch({ localities, isLoadingLocalities, onSearch }: LocationSearchProps) {
  const [queryText, setQueryText] = useState<string>("");
  const [isDropdownOpen, setIsDropdownOpen] = useState<boolean>(false);
  const [highlightedIndex, setHighlightedIndex] = useState<number>(-1);
  const [validationError, setValidationError] = useState<string>("");

  const wrapperRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const suggestions = useMemo(() => {
    const trimmedQuery = queryText.trim().toLowerCase();

    // Nothing typed yet: show the full list, just like opening a <select>.
    if (!trimmedQuery) {
      return localities;
    }

    return localities
      .filter(
        (locality) =>
          locality.city_name_he.includes(queryText.trim()) ||
          locality.city_name_en.toLowerCase().includes(trimmedQuery)
      )
      .slice(0, MAX_FILTERED_SUGGESTIONS);
  }, [queryText, localities]);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target as Node)) {
        setIsDropdownOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
    // When the browser window loses focus (switching apps, taking a
    // screenshot, alt-tabbing) we proactively blur the input. Otherwise,
    // returning focus to the tab re-fires a focus event on this field and
    // silently reopens the dropdown with the last search still in it.
    function handleWindowBlur() {
      setIsDropdownOpen(false);
      inputRef.current?.blur();
    }

    window.addEventListener("blur", handleWindowBlur);
    return () => window.removeEventListener("blur", handleWindowBlur);
  }, []);

  function selectLocality(locality: Locality) {
    setQueryText(locality.city_name_he);
    setIsDropdownOpen(false);
    setHighlightedIndex(-1);
    setValidationError("");
    onSearch(locality.city_name_en, locality.city_name_he, locality);
  }

  function submitFreeText() {
    const trimmedQuery = queryText.trim();

    if (!trimmedQuery) {
      setValidationError("Please enter a location name.");
      return;
    }

    setValidationError("");
    setIsDropdownOpen(false);
    setHighlightedIndex(-1);

    // Try to resolve the typed text against the official locality list first
    // (matters for Hebrew names: WeatherAPI cannot search in Hebrew, so a
    // name that exists in the list must be translated to its English value
    // rather than sent as-is).
    const normalizedQuery = normalizeForMatch(trimmedQuery);
    const matchedLocality = localities.find(
      (locality) =>
        normalizeForMatch(locality.city_name_he) === normalizedQuery ||
        normalizeForMatch(locality.city_name_en) === normalizedQuery
    );

    if (matchedLocality) {
      onSearch(matchedLocality.city_name_en, matchedLocality.city_name_he, matchedLocality);
      return;
    }

    onSearch(trimmedQuery, trimmedQuery, null);
  }

  function handleInputChange(event: React.ChangeEvent<HTMLInputElement>) {
    setQueryText(event.target.value);
    setIsDropdownOpen(true);
    setHighlightedIndex(-1);
    setValidationError("");
  }

  function handleFormSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (isDropdownOpen && highlightedIndex >= 0 && suggestions[highlightedIndex]) {
      selectLocality(suggestions[highlightedIndex]);
      return;
    }

    submitFreeText();
  }

  function handleKeyDown(event: React.KeyboardEvent<HTMLInputElement>) {
    if (!isDropdownOpen || suggestions.length === 0) {
      return;
    }

    if (event.key === "ArrowDown") {
      event.preventDefault();
      setHighlightedIndex((previousIndex) => (previousIndex + 1) % suggestions.length);
    } else if (event.key === "ArrowUp") {
      event.preventDefault();
      setHighlightedIndex((previousIndex) => (previousIndex <= 0 ? suggestions.length - 1 : previousIndex - 1));
    } else if (event.key === "Escape") {
      setIsDropdownOpen(false);
      setHighlightedIndex(-1);
    }
  }

  return (
    <div className={styles.wrapper} ref={wrapperRef}>
      <form className={styles.form} onSubmit={handleFormSubmit}>
        <label htmlFor="location-search-input" className={styles.label}>
          Location
        </label>
        <div className={styles.inputRow}>
          <input
            id="location-search-input"
            ref={inputRef}
            type="text"
            className={styles.input}
            placeholder={isLoadingLocalities ? "Loading cities..." : "Choose or type a location to search"}
            value={queryText}
            onChange={handleInputChange}
            onFocus={() => setIsDropdownOpen(true)}
            onKeyDown={handleKeyDown}
            disabled={isLoadingLocalities}
            autoComplete="off"
          />
          <button type="submit" className={styles.searchButton} disabled={isLoadingLocalities}>
            Search
          </button>
        </div>

        {isDropdownOpen && suggestions.length > 0 && (
          <ul className={styles.suggestionList}>
            {suggestions.map((locality, index) => (
              <li key={locality.city_code}>
                <button
                  type="button"
                  className={
                    index === highlightedIndex
                      ? `${styles.suggestionButton} ${styles.suggestionButtonActive}`
                      : styles.suggestionButton
                  }
                  onMouseDown={(event) => event.preventDefault()}
                  onClick={() => selectLocality(locality)}
                  onMouseEnter={() => setHighlightedIndex(index)}
                >
                  {locality.city_name_he}
                </button>
              </li>
            ))}
          </ul>
        )}

        {validationError && <p className={styles.errorText}>{validationError}</p>}
      </form>
    </div>
  );
}