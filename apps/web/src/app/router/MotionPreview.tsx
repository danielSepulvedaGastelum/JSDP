
import { useEffect, useState } from 'react';
import { motionProfiles, type MotionProfile } from './motion';
import './MotionPreview.css';

type Props = {
  profile: MotionProfile;
  busy: boolean;
  login: boolean;
  onProfile: (profile: MotionProfile) => void;
  onReplay: () => void;
  onNavigate: (path: string) => void;
  onChoose: () => Promise<void>;
  onClose: () => void;
};
export function MotionPreview({ profile, busy, login, onProfile, onReplay, onNavigate, onChoose, onClose }: Props) {
  const [expanded, setExpanded] = useState(true);
  useEffect(() => { if (busy) setExpanded(false); }, [busy]);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');
  const [reduced, setReduced] = useState(false);
  useEffect(() => {
    const query = matchMedia('(prefers-reduced-motion: reduce)');
    const sync = () => setReduced(query.matches);
    sync(); query.addEventListener('change', sync);
    return () => query.removeEventListener('change', sync);
  }, []);
  const choose = async () => {
    setError(''); setSaving(true);
    try { await onChoose(); }
    catch { setError('No se pudo guardar la elección. Intenta de nuevo.'); }
    finally { setSaving(false); }
  };
  return <aside className={'motion-preview' + (!expanded ? ' motion-preview-collapsed' : '')} aria-label="Propuestas de animación" aria-busy={busy || saving}>
    <div className="motion-preview-heading">
      <strong>{expanded ? 'Prueba las animaciones' : motionProfiles.find(item => item.id === profile)!.name}</strong>
      <button type="button" onClick={() => setExpanded(value => !value)} aria-expanded={expanded} aria-controls="motion-preview-body">{expanded ? 'Ocultar' : 'Mostrar'}</button>
    </div>
    {expanded && <div id="motion-preview-body">
      <p className="motion-preview-intro">Cinco movimientos sobre tu diseño actual. Prueba también el regreso a la landing.</p>
      <fieldset disabled={busy || saving}>
        <legend>Elige una propuesta para probar</legend>
        {motionProfiles.map((option, index) => <label className="motion-option" key={option.id}>
          <input type="radio" name="motion-profile" value={option.id} checked={profile === option.id} onChange={() => onProfile(option.id)} />
          <span><strong>{index + 1}. {option.name}</strong><small>{option.description}</small></span>
          <span className="motion-duration">{option.duration} ms</span>
        </label>)}
      </fieldset>
      {reduced && <p className="motion-reduced">Tu preferencia de movimiento reducido está activa: verás transiciones suaves sin desplazamientos.</p>}
      <div className="motion-preview-actions">
        <button type="button" disabled={busy || saving} onClick={login ? onReplay : () => onNavigate('/inicio-sesion')}>{busy ? 'Reproduciendo…' : login ? 'Repetir entrada' : 'Probar entrada al login'}</button>
        <button type="button" disabled={busy || saving || !login} onClick={() => onNavigate('/')}>Probar regreso</button>
      </div>
      <button type="button" className="motion-choose" disabled={busy || saving} onClick={choose}>{saving ? 'Guardando…' : 'Elegir esta animación'}</button>
      <p className="motion-preview-error" role="alert">{error}</p>
      <button type="button" className="motion-close" disabled={busy || saving} onClick={onClose}>Cerrar sin elegir</button>
    </div>}
  </aside>;
}
