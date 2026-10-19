import { BrowserRouter, Route, Routes } from 'react-router';
import { LandingPage } from '../../features/public/landing/LandingPage';

export function AppRouter() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingPage />} />
      </Routes>
    </BrowserRouter>
  );
}
