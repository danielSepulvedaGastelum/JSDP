import { useEffect, useState } from 'react';
import { useReducedMotion } from '../../../../hooks/useReducedMotion';
import { INSTITUTIONAL_VALUES } from '../model/institutional-content';
import {
  getEffectiveRunning,
  getInitialValuesMotionIntent,
  transitionValuesMotion,
} from '../model/values-motion';
import { ValueIcon } from './ValueIcon';

export function ValuesBanner() {
  const reducedMotion = useReducedMotion();
  const [intent, setIntent] = useState(() => getInitialValuesMotionIntent(reducedMotion));
  const running = getEffectiveRunning(intent, reducedMotion);

  useEffect(() => {
    setIntent((current) => transitionValuesMotion(current, { type: 'reduced-motion-changed', reducedMotion }));
  }, [reducedMotion]);

  const values = INSTITUTIONAL_VALUES.map(({ id, label, iconId }) => (
    <li className="values-banner__item" key={id}><ValueIcon iconId={iconId} /><span>{label}</span></li>
  ));

  return (
    <div className="values-banner">
      <div className="values-banner__controls public-container" aria-label="Controles de movimiento de Valores">
        <button type="button" onClick={() => setIntent((current) => transitionValuesMotion(current, running ? { type: 'pause' } : { type: 'resume', reducedMotion }))} disabled={!running && reducedMotion}>
          {running ? 'Pausar' : 'Reanudar'}
        </button>
        <button type="button" onClick={() => setIntent((current) => transitionValuesMotion(current, { type: 'show-static' }))} disabled={!running}>Ver sin movimiento</button>
      </div>
      <p className="values-banner__status public-container" role="status">{running ? 'Valores en movimiento' : 'Valores sin movimiento'}</p>
      {running ? (
        <div className="values-banner__viewport">
          <div className="values-banner__track">
            <ul className="values-banner__strip">{values}</ul>
            <ul className="values-banner__strip" aria-hidden="true">
              {INSTITUTIONAL_VALUES.map(({ id, label, iconId }) => <li className="values-banner__item" key={id}><ValueIcon iconId={iconId} /><span>{label}</span></li>)}
            </ul>
          </div>
        </div>
      ) : (
        <ul className="values-banner__static public-container">{values}</ul>
      )}
    </div>
  );
}
