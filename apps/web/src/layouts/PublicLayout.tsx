import { useEffect, useRef } from 'react';
import { Outlet, useLocation } from 'react-router';
import { InstitutionalFooter } from '../components/institutional/InstitutionalFooter';
import { InstitutionalHeader } from '../components/institutional/InstitutionalHeader';

export function PublicLayout() {
  const location = useLocation();
  const mainRef = useRef<HTMLElement>(null);
  const previousPath = useRef(location.pathname);

  useEffect(() => {
    if (previousPath.current !== location.pathname) {
      previousPath.current = location.pathname;
      mainRef.current?.focus();
    }
  }, [location.pathname]);

  return (
    <div className="public-shell">
      <a className="skip-link" href="#contenido-principal">
        Saltar al contenido principal
      </a>
      <InstitutionalHeader />
      <main className="public-shell__main" id="contenido-principal" tabIndex={-1} ref={mainRef}>
        <Outlet />
      </main>
      <InstitutionalFooter />
    </div>
  );
}
