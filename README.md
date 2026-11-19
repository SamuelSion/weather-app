# 🌤️ Israel Weather App

> Current weather for any locality in Israel, with animated icons and a saved search history.  
> Built with **React**, **TypeScript** & **Vite** as a course assignment at John Bryce (Full Stack Development).

![React](https://img.shields.io/badge/React-18-61DAFB?style=flat&logo=react&logoColor=black)
![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?style=flat&logo=typescript&logoColor=white)
![Vite](https://img.shields.io/badge/Vite-5-646CFF?style=flat&logo=vite&logoColor=white)
![React Router](https://img.shields.io/badge/React%20Router-6-CA4245?style=flat&logo=reactrouter&logoColor=white)
![LocalStorage](https://img.shields.io/badge/Storage-localStorage-blue)

---

## ✨ Features

| Feature | Description |
|---------|-------------|
| **Locality search** | Combined select and type-to-filter over the official list of Israeli localities (data.gov.il), including Hebrew names |
| **Current weather** | Live data from WeatherAPI |
| **Animated icons** | SVG icons for sun, clouds, rain, snow, thunderstorm, fog and wind |
| **Smart card** | Region display, and a card color that follows the temperature |
| **Search history** | Previous searches saved in `localStorage` |
| **Pages** | Home, History, About and a dedicated 404 page |

---

## 🏗️ Architecture

```
src/
├── components/   # Header, navigation, footer, location search, weather icon
├── pages/        # Home, history, about, 404
├── services/     # API calls (localities, weather)
├── types/        # TypeScript types
├── utils/        # Search history in localStorage
└── config.ts     # AppConfig class: every URL and the API key in one place
```

**Separation of concerns** — components render, services talk to the APIs, and configuration lives in one `AppConfig` class.

---

## 🔧 Technical Highlights

- **Typed end to end** — TypeScript models for both external APIs
- **Single configuration class** — every URL and the API key are defined in `AppConfig`
- **CSS Modules** — scoped styles per component
- **React Router 6** — multi-page navigation with a 404 fallback
- **Hebrew input support** — Hebrew text is resolved against the local locality list and converted to the English name, because WeatherAPI does not understand Hebrew
- **Stable React keys** — `city_code` is used as the key, because the dataset contains duplicate English names

---

## 🚀 Getting Started

```bash
# Clone
git clone https://github.com/SamuelSion/weather-app.git
cd weather-app

# Install and run
npm install
npm start
```

The app opens automatically at http://localhost:5173

| Script | Description |
|--------|-------------|
| `npm start` | Start the dev server |
| `npm run build` | Type-check and build for production |
| `npm run preview` | Preview the production build |

---

## 🔑 About the API Key

This repository includes a `.env` file with a WeatherAPI key. This is intentional:

- It is a **free demo account** key with no billing attached and no access to sensitive data. The worst case is that the free request quota runs out, and a new key takes a minute to create
- It is committed so the project runs right after `git clone`, with no setup
- In a real project the key would **not** be committed. It would stay in a git-ignored `.env`, and `.env.example` would list the required variable
- Vite embeds every `VITE_*` variable into the browser bundle, so a key used from a pure frontend is always visible to users. Truly hiding a key requires a small backend proxy

To use your own key, replace the value of `VITE_WEATHER_API_KEY` in `.env` (see `.env.example`).

---

## 📝 Notes on the Data Sources

- The locality list comes from the data.gov.il open dataset
- WeatherAPI labels some Golan Heights localities as "Syria". For localities taken from the official Israeli list, the country is displayed as "Israel"
- A few very small localities are not known to WeatherAPI, so weather for them is unavailable

---

## 👤 Author

**Samuel Sion** — [github.com/SamuelSion](https://github.com/SamuelSion)
