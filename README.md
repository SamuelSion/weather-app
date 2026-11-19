# Israel Weather App

A React + TypeScript (Vite) web app that shows the current weather for any locality in Israel.
Built as a course assignment at John Bryce (Full Stack Development).

## Features

- Combined select + type-to-filter search over the official list of Israeli localities (data.gov.il), including Hebrew names
- Current weather from WeatherAPI with animated SVG icons (sun, clouds, rain, snow, thunderstorm, fog, wind)
- Region display and a card color that follows the temperature
- Search history saved in `localStorage`
- Pages: Home, History, About, and a 404 page

## Tech stack

React 18, TypeScript, Vite, React Router v6, CSS Modules.

## Run locally

```
npm install
npm start
```

The app opens automatically in the browser at http://localhost:5173

## About the API key

This repository includes a `.env` file with a WeatherAPI key. This is intentional:

- It is a **free demo account** key. There is no billing attached and it gives access to no sensitive data. The worst case is that the free request quota runs out, and a new key takes a minute to create.
- It is committed so the project runs immediately after `git clone`, with no setup.
- In a real project the key would **not** be committed. It would stay in a git-ignored `.env`, and `.env.example` would show the required variable.
- Vite embeds every `VITE_*` variable into the browser bundle, so a key used from a pure frontend is always visible to users. Truly hiding a key requires a small backend proxy that holds the key and forwards requests.

To use your own key, replace the value of `VITE_WEATHER_API_KEY` in `.env` (see `.env.example`).

## Project structure

```
src/
  components/   header, navigation, footer, location search, weather icon
  pages/        home, history, about, 404
  services/     API calls (localities, weather)
  types/        TypeScript types
  utils/        search history in localStorage
  config.ts     AppConfig class: every URL and the API key in one place
```

## Notes on the data sources

- The locality list comes from the data.gov.il open dataset. It has duplicate English names, so `city_code` is used as the React key.
- WeatherAPI labels some Golan Heights localities as "Syria". For localities taken from the official Israeli list the country is displayed as "Israel".
- WeatherAPI does not understand Hebrew, so Hebrew input is resolved against the local list and converted to the English name before the request.
- A few very small localities are not known to WeatherAPI, and weather for them is unavailable.

## Author

Samuel Sion, https://github.com/SamuelSion
