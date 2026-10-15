import { BrowserRouter, Route, Routes } from 'react-router';
import { PublicLayout } from '../../layouts/PublicLayout';

export function AppRouter() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<PublicLayout />}>
          <Route index element={<p className="public-placeholder">Hola IMSS</p>} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
