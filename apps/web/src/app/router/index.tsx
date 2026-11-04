
import { useEffect, useLayoutEffect, useRef, useState } from 'react';
import { flushSync } from 'react-dom';
import { BrowserRouter, Route, Routes, useLocation, useNavigate, useNavigationType } from 'react-router';
import { LandingPage } from '../../features/public/landing/LandingPage';
import { LoginPage } from '../../features/public/auth/LoginPage';
import { MotionPreview } from './MotionPreview';
import { chosenMotion } from './motion-choice';
import { animateEntrance, cancelEntrance, isMotionProfile, motionProfiles, prepareRoute, waitForRoute, type MotionProfile } from './motion';
import './transitions.css';

function AnimatedRoutes() {
  const location = useLocation();
  const navigate = useNavigate();
  const navigationType = useNavigationType();
  const [rendered, setRendered] = useState(location);
  const [preview, setPreview] = useState(() => import.meta.env.DEV && new URLSearchParams(window.location.search).has('animaciones'));
  const [profile, setProfile] = useState<MotionProfile>(isMotionProfile(chosenMotion) ? chosenMotion : 'soft');
  const [animating, setAnimating] = useState(false);
  const profileRef = useRef(profile);
  const current = useRef(location);
  const scrollPositions = useRef(new Map<string, number>());
  const active = useRef<ViewTransition | null>(null);
  const run = useRef(0);
  profileRef.current = profile;

  useLayoutEffect(() => {
    document.documentElement.dataset.motionProfile = profile;
  }, [profile]);

  useEffect(() => {
    if (!preview && isMotionProfile(chosenMotion)) setProfile(chosenMotion);
  }, [preview, chosenMotion]);

  useLayoutEffect(() => {
    const previous = current.current;
    if (previous.key === location.key) {
      document.documentElement.dataset.routeAnimating = 'false';
      setAnimating(false);
      return;
    }
    if (previous.pathname === location.pathname) {
      current.current = location;
      setRendered(location);
      setAnimating(false);
      document.documentElement.dataset.routeAnimating = 'false';
      return;
    }
    const serial = ++run.current;
    let cancelled = false;
    active.current?.skipTransition();
    cancelEntrance();
    scrollPositions.current.set(previous.key, window.scrollY);
    const savedScroll = navigationType === 'POP' ? scrollPositions.current.get(location.key) ?? 0 : 0;
    const selected = profileRef.current;
    const root = document.documentElement;
    const reduced = matchMedia('(prefers-reduced-motion: reduce)').matches;
    const finish = () => {
      if (cancelled || serial !== run.current) return;
      root.dataset.routeAnimating = 'false';
      setAnimating(false);
    };
    setAnimating(true);

    const changePage = async () => {
      // Decode critical images before taking the new snapshot, while the old page remains usable.
      await waitForRoute(location.pathname);
      if (cancelled) return;
      root.dataset.motionProfile = selected;
      root.dataset.routeDirection = location.pathname === '/inicio-sesion' ? 'login' : 'home';
      root.dataset.routeAnimating = 'true';
      root.style.setProperty('--route-duration', motionProfiles.find(item => item.id === selected)!.duration + 'ms');
      const commit = () => {
        if (cancelled) return;
        current.current = location;
        flushSync(() => setRendered(location));
        window.scrollTo({ top: savedScroll, behavior: 'instant' });
        const main = document.querySelector<HTMLElement>('main');
        main?.setAttribute('tabindex', '-1');
        main?.focus({ preventScroll: true });
      };
      if (typeof document.startViewTransition === 'function') {
        const transition = document.startViewTransition(commit);
        active.current = transition;
        // Interruption is expected when history changes or the visitor navigates again.
        void transition.ready.catch(() => undefined);
        void transition.finished.catch(() => undefined).then(finish);
      } else {
        commit();
        await animateEntrance(selected, location.pathname === '/inicio-sesion', reduced);
        finish();
      }
    };
    void changePage().catch(() => {
      // A failed asset preparation must never block the requested route.
      if (cancelled) return;
      current.current = location;
      setRendered(location);
      finish();
    });
    return () => {
      cancelled = true;
      active.current?.skipTransition();
      cancelEntrance();
    };
  }, [location, navigationType]);

  useLayoutEffect(() => {
    const restoration = window.history.scrollRestoration;
    window.history.scrollRestoration = 'manual';
    void prepareRoute('/inicio-sesion');
    void prepareRoute('/');
    return () => {
      window.history.scrollRestoration = restoration;
      active.current?.skipTransition();
      cancelEntrance();
    };
  }, []);

  const closePreview = () => {
    setPreview(false);
    if (isMotionProfile(chosenMotion)) setProfile(chosenMotion);
    const search = new URLSearchParams(location.search);
    search.delete('animaciones');
    navigate({ pathname: location.pathname, search: search.toString(), hash: location.hash }, { replace: true });
  };
  const choose = async () => {
    const response = await fetch('/__jsdp-motion/choice', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ profile }),
    });
    if (!response.ok) throw new Error('No se pudo guardar la animación.');
    setPreview(false);
    const search = new URLSearchParams(location.search);
    search.delete('animaciones');
    navigate({ pathname: location.pathname, search: search.toString(), hash: location.hash }, { replace: true });
  };
  const replay = () => {
    const serial = ++run.current;
    setAnimating(true);
    void animateEntrance(profile, true, matchMedia('(prefers-reduced-motion: reduce)').matches)?.then(() => {
      if (serial === run.current) setAnimating(false);
    });
  };

  return <>
    <div key={rendered.pathname} className="route-scene">
      <Routes location={rendered}>
        <Route path="/" element={<LandingPage />} />
        <Route path="/inicio-sesion" element={<LoginPage />} />
      </Routes>
    </div>
    {import.meta.env.DEV && preview && <MotionPreview
      profile={profile} busy={animating} login={rendered.pathname === '/inicio-sesion'}
      onProfile={setProfile} onReplay={replay}
      onNavigate={pathname => navigate({ pathname, search: '?animaciones=1' })}
      onChoose={choose} onClose={closePreview}
    />}
  </>;
}
export function AppRouter() {
  return <BrowserRouter><AnimatedRoutes /></BrowserRouter>;
}
