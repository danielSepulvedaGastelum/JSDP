import { Link } from 'react-router';

interface UnavailablePageProps {
  title: string;
}

export function UnavailablePage({ title }: UnavailablePageProps) {
  return (
    <section className="unavailable-page public-container" aria-labelledby="unavailable-title">
      <h1 id="unavailable-title">{title}</h1>
      <p>Este servicio todavía no está disponible.</p>
      <Link to="/">Volver a Inicio</Link>
    </section>
  );
}
