import { useEffect, useRef, useState } from 'react';
import { Link, NavLink, useLocation } from 'react-router';
import {
  AREA,
  INSTITUTION,
  OOAD,
} from '../../features/public/landing/model/institutional-content';

const PUBLIC_DESTINATIONS = [
  { label: 'Inicio', to: '/' },
  { label: 'Documentos', to: '/documentos' },
  { label: 'Iniciar sesión', to: '/inicio-sesion' },
] as const;

export function InstitutionalHeader() {
  const [menuOpen, setMenuOpen] = useState(false);
  const menuButtonRef = useRef<HTMLButtonElement>(null);
  const location = useLocation();

  useEffect(() => setMenuOpen(false), [location.pathname]);

  function closeMenu(destination?: string) {
    const normalizePath = (value: string) => value.replace(/\/+$/, '') || '/';
    if (menuOpen && destination && normalizePath(location.pathname) === normalizePath(destination)) {
      menuButtonRef.current?.focus();
    }
    setMenuOpen(false);
  }

  return (
    <header className="institutional-header">
      <div className="public-container institutional-header__inner">
        <Link className="institutional-identity" to="/" onClick={() => closeMenu('/')}>
          <span className="institutional-identity__primary">{INSTITUTION}</span>
          <span className="institutional-identity__government">Gobierno de México</span>
          <span className="institutional-identity__context">
            {OOAD} · {AREA}
          </span>
        </Link>

        <button
          ref={menuButtonRef}
          className="institutional-menu-toggle"
          type="button"
          aria-expanded={menuOpen}
          aria-controls="institutional-navigation"
          onClick={() => setMenuOpen((open) => !open)}
        >
          Menú <span aria-hidden="true">{menuOpen ? '−' : '+'}</span>
        </button>
        <nav aria-label="Navegación principal" id="institutional-navigation" className={menuOpen ? 'institutional-nav is-open' : 'institutional-nav'} onKeyDown={(event) => {
          if (event.key === 'Escape' && menuOpen) {
            closeMenu();
            menuButtonRef.current?.focus();
          }
        }}>
          <ul className="institutional-navigation">
            {PUBLIC_DESTINATIONS.map((destination) => (
              <li key={destination.to}>
                <NavLink
                  className={({ isActive }) => `institutional-navigation__link${isActive ? ' is-current' : ''}`}
                  to={destination.to}
                  end
                  aria-current={location.pathname === destination.to ? 'page' : undefined}
                  onClick={() => closeMenu(destination.to)}
                >{destination.label}</NavLink>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </header>
  );
}
