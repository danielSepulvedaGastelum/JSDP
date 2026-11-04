
import { useEffect, useState, type FormEvent } from 'react';
import { Link } from 'react-router';
import './LoginPage.css';

function Arrow({ back = false }: { back?: boolean }) {
  return <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d={back ? 'M19 12H5m5-5-5 5 5 5' : 'M5 12h14m-5-5 5 5-5 5'} /></svg>;
}

function FieldIcon({ kind }: { kind: 'user' | 'lock' }) {
  return <svg className="login-field-icon" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    {kind === 'user' ? <><circle cx="12" cy="8" r="4" /><path d="M4 21a8 8 0 0 1 16 0" /></> : <><rect x="5" y="10" width="14" height="11" rx="2" /><path d="M8 10V7a4 4 0 0 1 8 0v3M12 14v3" /></>}
  </svg>;
}

export function LoginPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [notice, setNotice] = useState('');
  useEffect(() => { document.title = 'Inicio de sesión | JSDP Sonora'; }, []);

  const submit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setNotice('El inicio de sesión estará disponible próximamente.');
  };

  return (
    <main className="login-page" id="contenido-login" tabIndex={-1}>
      <div className="login-frame">
        <Link to="/" className="login-back"><Arrow back /> Volver al inicio</Link>
        <div className="login-card">
          <aside className="login-visual" aria-label="Identidad institucional">
            <p className="login-visual-signature">IMSS <span aria-hidden="true">/</span> SONORA</p>
            <div className="login-photo">
              <img src="/identity/Escultura_IMSS.webp" alt="Escultura del IMSS frente a su edificio" width="1906" height="942" fetchPriority="high" />
            </div>
            <div className="login-visual-copy">
              <h2>Cerca de<br />nuestra gente.</h2>
              <p>Instituto Mexicano del Seguro Social</p>
            </div>
          </aside>
          <section className="login-access" aria-labelledby="login-title">
            <img className="login-brand" src="/identity/JSDP-Sonora-11.svg" alt="JSDP Sonora" width="620" height="187" />
            <div className="login-form-content">
              <h1 id="login-title">Bienvenido a JSDP</h1>
              <p className="login-intro">Ingresa con tu matrícula y contraseña.</p>
              <form onSubmit={submit} aria-describedby="login-notice">
                <div className="login-field">
                  <label htmlFor="login-matricula">Matrícula</label>
                  <div className="login-input-wrap"><FieldIcon kind="user" /><input id="login-matricula" name="matricula" type="text" inputMode="numeric" autoComplete="off" placeholder="Ingresa tu matrícula" /></div>
                </div>
                <div className="login-field">
                  <label htmlFor="login-password">Contraseña</label>
                  <div className="login-input-wrap login-password-wrap">
                    <FieldIcon kind="lock" />
                    <input id="login-password" name="password" type={showPassword ? 'text' : 'password'} autoComplete="off" placeholder="Ingresa tu contraseña" />
                    <button className="login-reveal" type="button" onClick={() => setShowPassword(value => !value)} aria-label={showPassword ? 'Ocultar contraseña' : 'Mostrar contraseña'} aria-pressed={showPassword}>
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7S2 12 2 12Z" /><circle cx="12" cy="12" r="3" />{showPassword && <path d="m3 3 18 18" />}</svg>
                    </button>
                  </div>
                </div>
                <div className="login-options">
                  <label className="login-remember" title="Disponible cuando se habilite el acceso"><input type="checkbox" disabled /> Recordar matrícula</label>
                  <button className="login-text-button" type="button" onClick={() => setNotice('La recuperación de contraseña estará disponible próximamente.')}>¿Olvidaste tu contraseña?</button>
                </div>
                <button type="submit" className="login-submit">Iniciar sesión <Arrow /></button>
                <p className="login-notice" id="login-notice" data-active={Boolean(notice)} role="status" aria-live="polite" aria-atomic="true">{notice || 'El acceso al sistema se habilitará próximamente.'}</p>
              </form>
              <p className="login-request">¿Aún no tienes acceso? <button type="button" className="login-text-button" onClick={() => setNotice('La solicitud de usuario estará disponible próximamente.')}>Solicitar usuario</button></p>
            </div>
            <footer className="login-footer">
              <div className="login-institutions">
                <img className="login-government" src="/identity/Gobierno_de_Mexico_2024-2030.svg" alt="Gobierno de México" width="1219" height="369" />
                <span className="login-institution-rule" aria-hidden="true" />
                <img className="login-imss" src="/identity/Logotipo_del_IMSS.svg" alt="Instituto Mexicano del Seguro Social" width="1186" height="1476" />
              </div>
              <p>OOAD Sonora · Desarrollo de Personal</p>
            </footer>
          </section>
        </div>
      </div>
    </main>
  );
}
