import type { InstitutionalValueIconId } from '../model/institutional-content';

export function ValueIcon({ iconId }: { iconId: InstitutionalValueIconId }) {
  const shared = { fill: 'none', stroke: 'currentColor', strokeWidth: 1.8, strokeLinecap: 'round' as const, strokeLinejoin: 'round' as const };
  return (
    <svg aria-hidden="true" focusable="false" viewBox="0 0 32 32" width="32" height="32" {...shared}>
      {iconId === 'people-united' && <><circle cx="10" cy="10" r="3" /><circle cx="22" cy="10" r="3" /><path d="M3 25v-3a7 7 0 0 1 14 0v3M15 25v-3a7 7 0 0 1 14 0v3M13 17l3 2 3-2" /></>}
      {iconId === 'linked-chain' && <><path d="M13 11l-2 2a5 5 0 0 0 7 7l3-3a5 5 0 0 0 0-7M19 21l2-2a5 5 0 0 0-7-7l-3 3a5 5 0 0 0 0 7" /></>}
      {iconId === 'generic-shield' && <><path d="M16 3l10 4v7c0 7-4 12-10 15C10 26 6 21 6 14V7l10-4Z" /><path d="m11 16 3 3 7-7" /></>}
      {iconId === 'simple-star' && <path d="m16 3 3.8 8 8.7 1.2-6.3 6.2 1.5 8.7-7.7-4.1-7.7 4.1 1.5-8.7-6.3-6.2 8.7-1.2L16 3Z" />}
      {iconId === 'lightbulb' && <><path d="M10 21c0-3-4-5-4-10a10 10 0 0 1 20 0c0 5-4 7-4 10H10ZM11 25h10M13 29h6" /><path d="M13 21v-6m6 6v-6" /></>}
      {iconId === 'heart' && <path d="M16 28 5 17a7 7 0 0 1 10-10l1 1 1-1a7 7 0 0 1 10 10L16 28Z" />}
      {iconId === 'checklist' && <><path d="M12 6h16M12 16h16M12 26h16M3 6l2 2 4-4M3 16l2 2 4-4M3 26l2 2 4-4" /></>}
    </svg>
  );
}
