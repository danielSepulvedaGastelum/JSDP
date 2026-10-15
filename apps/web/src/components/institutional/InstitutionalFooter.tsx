import {
  AREA,
  INSTITUTION,
  OOAD,
} from '../../features/public/landing/model/institutional-content';

export function InstitutionalFooter() {
  return (
    <footer className="institutional-footer">
      <div className="public-container institutional-footer__inner">
        <div className="institutional-footer__identity">
          <p>{INSTITUTION}</p>
          <p>
            {OOAD} · {AREA}
          </p>
        </div>
        <p className="institutional-footer__affiliation">Gobierno de México</p>
      </div>
    </footer>
  );
}
