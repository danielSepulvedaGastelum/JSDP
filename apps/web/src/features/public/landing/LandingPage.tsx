import { Link } from 'react-router';
import {
  AREA,
  INSTITUTIONAL_INTRO,
  MISSION,
  OOAD,
  VISION,
} from './model/institutional-content';
import { OrganizationChart } from './components/OrganizationChart';
import { ValuesBanner } from './components/ValuesBanner';
import { useScrollReveal } from '../../../hooks/useScrollReveal';

export function LandingPage() {
  const presentationRef = useScrollReveal<HTMLElement>();
  const purposeRef = useScrollReveal<HTMLElement>();
  return (
    <>
      <section className="landing-hero" aria-labelledby="landing-title">
        <div className="landing-hero__band"><div className="public-container">{OOAD}</div></div>
        <div className="public-container landing-hero__body">
          <p className="landing-hero__welcome">Bienvenida</p>
          <h1 id="landing-title">{AREA}</h1>
          <p className="landing-hero__support">Plataforma institucional de Recursos Humanos del OOAD Sonora.</p>
          <a className="landing-hero__anchor" href="#presentacion">Conocer la JSDP <svg aria-hidden="true" viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M4 12h16m-7-7 7 7-7 7" /></svg></a>
        </div>
      </section>

      <section className="landing-introduction" id="presentacion" aria-labelledby="presentation-title" ref={presentationRef}>
        <div className="public-container landing-introduction__inner">
          <h2 id="presentation-title">Presentación</h2>
          <p>{INSTITUTIONAL_INTRO}</p>
          <p>Plataforma institucional de Recursos Humanos del OOAD Sonora.</p>
        </div>
      </section>

      <section className="landing-access public-container" aria-labelledby="access-title">
        <h2 id="access-title">Accesos destacados</h2>
        <div className="landing-access__grid">
          <Link className="landing-access__item" to="/documentos"><svg aria-hidden="true" viewBox="0 0 32 32" width="32" height="32" fill="none" stroke="currentColor" strokeWidth="1.8"><path d="M8 3h12l5 5v21H8zM20 3v6h5M12 15h9m-9 5h9" /></svg><span>Documentos</span><svg aria-hidden="true" viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2"><path d="M5 19 19 5M9 5h10v10" /></svg></Link>
          <Link className="landing-access__item" to="/inicio-sesion"><svg aria-hidden="true" viewBox="0 0 32 32" width="32" height="32" fill="none" stroke="currentColor" strokeWidth="1.8"><path d="M7 29V3h18v26H7Zm7-13h14m-4-4 4 4-4 4" /></svg><span>Iniciar sesión</span><svg aria-hidden="true" viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2"><path d="M5 19 19 5M9 5h10v10" /></svg></Link>
        </div>
      </section>

      <section className="landing-purpose" aria-label="Misión y Visión" ref={purposeRef}>
        <div className="public-container landing-purpose__grid">
          <div><h2>Misión</h2><p>{MISSION}</p></div>
          <div><h2>Visión</h2><p>{VISION}</p></div>
        </div>
      </section>

      <section className="landing-values" aria-labelledby="values-title">
        <div className="public-container"><h2 id="values-title">Valores</h2></div>
        <ValuesBanner />
      </section>

      <section className="landing-organization public-container" aria-labelledby="organization-title">
        <h2 id="organization-title">Organigrama</h2>
        <OrganizationChart />
      </section>
    </>
  );
}
