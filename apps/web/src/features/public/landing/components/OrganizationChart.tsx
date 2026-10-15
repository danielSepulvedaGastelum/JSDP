import { useEffect, useReducer, useRef, useState } from 'react';
import {
  getActiveConnectionId,
  INITIAL_ORGANIZATION_STATE,
  ORGANIZATION_UNITS,
  transitionOrganization,
  type OrganizationUnitId,
} from '../model/organization';

interface ConnectionPath { id: OrganizationUnitId; d: string }

export function OrganizationChart() {
  const [state, dispatch] = useReducer(transitionOrganization, INITIAL_ORGANIZATION_STATE);
  const [connections, setConnections] = useState<ConnectionPath[]>([]);
  const stageRef = useRef<HTMLDivElement>(null);
  const disclosureRef = useRef<HTMLButtonElement>(null);
  const unitRefs = useRef(new Map<OrganizationUnitId, HTMLButtonElement>());
  const root = ORGANIZATION_UNITS[0];
  const children = ORGANIZATION_UNITS.slice(1);
  const selected = ORGANIZATION_UNITS.find(({ id }) => id === state.selectedUnitId) ?? root;
  const activeConnectionId = getActiveConnectionId(state);

  useEffect(() => {
    const stage = stageRef.current;
    if (!stage || !state.expanded) {
      return;
    }
    const measure = () => {
      const origin = stage.getBoundingClientRect();
      const rootRect = unitRefs.current.get('J')?.getBoundingClientRect();
      if (!rootRect) return;
      const startX = rootRect.left + rootRect.width / 2 - origin.left;
      const startY = rootRect.bottom - origin.top;
      setConnections(children.flatMap(({ id }) => {
        const target = unitRefs.current.get(id)?.getBoundingClientRect();
        if (!target) return [];
        const endX = target.left + target.width / 2 - origin.left;
        const endY = target.top - origin.top;
        const midpoint = startY + (endY - startY) / 2;
        return [{ id, d: `M ${startX} ${startY} V ${midpoint} H ${endX} V ${endY}` }];
      }));
    };
    measure();
    const observer = typeof ResizeObserver === 'undefined' ? null : new ResizeObserver(measure);
    if (observer) {
      observer.observe(stage);
      for (const button of unitRefs.current.values()) observer.observe(button);
    } else {
      window.addEventListener('resize', measure);
    }
    return () => {
      observer?.disconnect();
      window.removeEventListener('resize', measure);
    };
  }, [state.expanded]);

  function unitButton(id: OrganizationUnitId, label: string) {
    return (
      <button
        className={`organization-unit${state.selectedUnitId === id ? ' is-selected' : ''}`}
        type="button"
        aria-pressed={state.selectedUnitId === id}
        onClick={() => dispatch({ type: 'select', id })}
        ref={(element) => {
          if (element) unitRefs.current.set(id, element);
          else unitRefs.current.delete(id);
        }}
      >{label}</button>
    );
  }

  function toggleExpanded() {
    if (state.expanded && document.activeElement && stageRef.current?.querySelector('#organization-dependencies')?.contains(document.activeElement)) {
      disclosureRef.current?.focus();
    }
    dispatch({ type: 'toggle-expanded' });
  }

  return (
    <div className="organization-chart">
      <div className="organization-chart__stage" ref={stageRef}>
        <svg className="organization-chart__connections" aria-hidden="true" focusable="false" width="100%" height="100%">
          {state.expanded && connections.map(({ id, d }) => (
            <path key={id} d={d} className={activeConnectionId === id ? 'is-active' : ''} />
          ))}
        </svg>
        <ul className="organization-chart__tree">
          <li>
            <div className="organization-chart__root">
              {unitButton(root.id, root.label)}
              <button
                ref={disclosureRef}
                className="organization-chart__disclosure"
                type="button"
                aria-expanded={state.expanded}
                aria-controls="organization-dependencies"
                onClick={toggleExpanded}
              >{state.expanded ? 'Contraer dependencias' : 'Expandir dependencias'}</button>
            </div>
            <ul
              className={`organization-chart__children${state.expanded ? '' : ' is-collapsed'}`}
              id="organization-dependencies"
              aria-hidden={!state.expanded}
              inert={!state.expanded}
            >
              {children.map(({ id, label }) => <li key={id}>{unitButton(id, label)}</li>)}
            </ul>
          </li>
        </ul>
      </div>
      <div className="organization-detail" aria-live="polite" aria-atomic="true">
        <div className="organization-detail__content" key={selected.id}>
          <h3>{selected.label}</h3>
          {selected.id === 'J' ? (
            <p>Raíz de la estructura mostrada. Tiene cinco dependencias directas.</p>
          ) : (
            <p>Dependencia directa de la Jefatura de Servicios de Desarrollo de Personal.</p>
          )}
          {!state.expanded && selected.id !== 'J' && <p>Expanda las dependencias para volver a ver esta unidad en el organigrama.</p>}
        </div>
      </div>
    </div>
  );
}
