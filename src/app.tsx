import { Routes, Route } from "react-router-dom";
import { SiteHeader } from "./components/site-header/site-header";
import { MainNav } from "./components/main-nav/main-nav";
import { SiteFooter } from "./components/site-footer/site-footer";
import { HomePage } from "./pages/home-page/home-page";
import { HistoryPage } from "./pages/history-page/history-page";
import { AboutPage } from "./pages/about-page/about-page";
import { NotFoundPage } from "./pages/not-found-page/not-found-page";

export function App() {
  return (
    <>
      <SiteHeader />
      <MainNav />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/history" element={<HistoryPage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
      <SiteFooter />
    </>
  );
}