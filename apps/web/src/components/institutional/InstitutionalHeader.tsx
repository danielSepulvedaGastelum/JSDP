import { Link } from 'react-router';
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
  return (
    <header className="institutional-header">
      <div className="public-container institutional-header__inner">
        <Link className="institutional-identity" to="/">
          <span className="institutional-identity__primary">{INSTITUTION}</span>
          <span className="institutional-identity__context">
            {OOAD} · {AREA}
          </span>
        </Link>

        <nav aria-label="Navegación principal">
          <ul className="institutional-navigation">
            {PUBLIC_DESTINATIONS.map((destination) => (
              <li key={destination.to}>
                <Link className="institutional-navigation__link" to={destination.to}>
                  {destination.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </header>
  );
}
