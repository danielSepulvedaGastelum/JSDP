import { Outlet } from 'react-router';
import { InstitutionalFooter } from '../components/institutional/InstitutionalFooter';
import { InstitutionalHeader } from '../components/institutional/InstitutionalHeader';

export function PublicLayout() {
  return (
    <div className="public-shell">
      <a className="skip-link" href="#contenido-principal">
        Saltar al contenido principal
      </a>
      <InstitutionalHeader />
      <main className="public-shell__main" id="contenido-principal" tabIndex={-1}>
        <Outlet />
      </main>
      <InstitutionalFooter />
    </div>
  );
}
