import { BrowserRouter, Route, Routes } from 'react-router';
import { PublicLayout } from '../../layouts/PublicLayout';
import { LandingPage } from '../../features/public/landing/LandingPage';
import { UnavailablePage } from '../../features/public/pages/UnavailablePage';

export function AppRouter() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<PublicLayout />}>
          <Route index element={<LandingPage />} />
          <Route path="documentos" element={<UnavailablePage title="Documentos" />} />
          <Route path="inicio-sesion" element={<UnavailablePage title="Iniciar sesión" />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
