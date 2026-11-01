import { useId } from 'react';
import './LandingFooter.css';

type FooterLink =
  | { label: string; href: string; internal?: boolean }
  | { label: string; pending: true };

type FooterLinkGroup = {
  id: string;
  title: string;
  links: FooterLink[];
};

const footerLinkGroups: FooterLinkGroup[] = [
  {
    id: 'imss',
    title: 'Enlaces IMSS',
    links: [
      { label: 'Página oficial del IMSS', href: 'http://www.imss.gob.mx/' },
      { label: 'Intranet IMSS', href: 'http://intranet/Paginas/index.aspx', internal: true },
      { label: 'Tarjetón digital · Trabajadores', href: 'https://rh.imss.gob.mx/Personal/TarjetonDigital/' },
      { label: 'Tarjetón digital · Jubilados', href: 'https://rh.imss.gob.mx/Personal/tarjetonjubilados/' },
    ],
  },
  {
    id: 'training',
    title: 'Capacitación',
    links: [
      { label: 'SICAVI', href: 'https://sicaviqa.imss.gob.mx/SICAVIMSS/' },
      { label: 'Escuela Buen Gobierno', href: 'https://escuela.buengobierno.gob.mx/' },
    ],
  },
  {
    id: 'sonora',
    title: 'IMSS Sonora',
    links: [
      { label: 'Portal de Información', href: 'http://172.24.98.216/portalinfo/', internal: true },
      { label: 'Jefatura Personal · Sistema consulta nómina', href: 'http://172.24.98.216/personal/', internal: true },
    ],
  },
  {
    id: 'jsdp',
    title: 'JSDP',
    links: [
      { label: 'Inicio de sesión', pending: true },
      { label: 'Documentos', pending: true },
    ],
  },
];

export function LandingFooter() {
  const footerId = useId();
  const titleId = footerId + '-footer-title';

  return (
    <footer className="site-footer landing-footer" id="contacto">
      <div className="footer-pattern" aria-hidden="true" />
      <div className="landing-footer-inner">
        <div className="landing-footer-header">
          <h2 id={titleId}>Enlaces de interés</h2>
          <div className="landing-footer-brands">
            <img
              className="landing-footer-government"
              src="/identity/Gobierno_de_Mexico_2024-2030.svg"
              alt="Gobierno de México 2024–2030"
              width="1219"
              height="369"
              loading="lazy"
              decoding="async"
            />
            <span className="landing-footer-brand-rule" aria-hidden="true" />
            <img
              className="landing-footer-imss"
              src="/identity/Logotipo_del_IMSS.svg"
              alt="Instituto Mexicano del Seguro Social"
              width="1186"
              height="1476"
              loading="lazy"
              decoding="async"
            />
          </div>
        </div>
        <nav className="landing-footer-directory" aria-labelledby={titleId}>
          {footerLinkGroups.map(group => (
            <section className="landing-footer-group" aria-labelledby={footerId + '-' + group.id} key={group.id}>
              <h3 id={footerId + '-' + group.id}>{group.title}</h3>
              <ul>
                {group.links.map(link => (
                  <li key={link.label}>
                    {'href' in link ? (
                      <a className="landing-footer-link" href={link.href} target="_blank" rel="noopener noreferrer">
                        <span>
                          {link.label}
                          {link.internal && <> <small className="landing-footer-network">Red IMSS</small></>}
                        </span>
                        <svg className="landing-footer-arrow" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true" focusable="false">
                          <path d="M6 18 18 6M6 6h12v12" />
                        </svg>
                        <span className="landing-footer-sr-only"> (abre en una pestaña nueva)</span>
                      </a>
                    ) : (
                      <span className="landing-footer-unavailable" aria-disabled="true">
                        <span>{link.label}</span>
                        <small>En construcción</small>
                      </span>
                    )}
                  </li>
                ))}
              </ul>
            </section>
          ))}
        </nav>
        <div className="landing-footer-meta">
          <p>Instituto Mexicano del Seguro Social · OOAD Sonora</p>
          <p className="landing-footer-legal">Privacidad, términos y contacto <span>Próximamente</span></p>
        </div>
      </div>
    </footer>
  );
}
