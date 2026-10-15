import { BrowserRouter, Route, Routes } from 'react-router';

export function AppRouter() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<p>Hola IMSS</p>} />
      </Routes>
    </BrowserRouter>
  );
}
