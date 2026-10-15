export const INSTITUTION = 'Instituto Mexicano del Seguro Social' as const;
export const OOAD = 'OOAD Sonora' as const;
export const AREA = 'Jefatura de Servicios de Desarrollo de Personal' as const;

export const INSTITUTIONAL_INTRO =
  'La Jefatura de Servicios de Desarrollo de Personal forma parte del OOAD Sonora del Instituto Mexicano del Seguro Social.' as const;

export const MISSION =
  'Garantizar resultados en seguridad social con servicios de prevención y atención a la salud con calidad, calidez, y transparencia para las y los trabajadores de Sonora y sus beneficiarios' as const;

export const VISION =
  'Ser el OOAD líder e innovador en atención a la salud y seguridad social en la región en los proximos tres años' as const;

export const INSTITUTIONAL_VALUE_IDS = [
  'solidaridad',
  'compromiso',
  'integridad',
  'lealtad',
  'innovacion',
  'empatia',
  'disciplina',
] as const;

export type InstitutionalValueId = (typeof INSTITUTIONAL_VALUE_IDS)[number];

export type InstitutionalValueLabel =
  | 'Solidaridad'
  | 'Compromiso'
  | 'Integridad'
  | 'Lealtad'
  | 'Innovación'
  | 'Empatía'
  | 'Disciplina';

export type InstitutionalValueIconId =
  | 'people-united'
  | 'linked-chain'
  | 'generic-shield'
  | 'simple-star'
  | 'lightbulb'
  | 'heart'
  | 'checklist';

export interface InstitutionalValue {
  readonly id: InstitutionalValueId;
  readonly label: InstitutionalValueLabel;
  readonly iconId: InstitutionalValueIconId;
}

export const INSTITUTIONAL_VALUES = [
  { id: 'solidaridad', label: 'Solidaridad', iconId: 'people-united' },
  { id: 'compromiso', label: 'Compromiso', iconId: 'linked-chain' },
  { id: 'integridad', label: 'Integridad', iconId: 'generic-shield' },
  { id: 'lealtad', label: 'Lealtad', iconId: 'simple-star' },
  { id: 'innovacion', label: 'Innovación', iconId: 'lightbulb' },
  { id: 'empatia', label: 'Empatía', iconId: 'heart' },
  { id: 'disciplina', label: 'Disciplina', iconId: 'checklist' },
] as const satisfies readonly InstitutionalValue[];

export interface InstitutionalContent {
  readonly institution: typeof INSTITUTION;
  readonly ooad: typeof OOAD;
  readonly area: typeof AREA;
  readonly intro: typeof INSTITUTIONAL_INTRO;
  readonly mission: typeof MISSION;
  readonly vision: typeof VISION;
  readonly values: typeof INSTITUTIONAL_VALUES;
}

export const institutionalContent = {
  institution: INSTITUTION,
  ooad: OOAD,
  area: AREA,
  intro: INSTITUTIONAL_INTRO,
  mission: MISSION,
  vision: VISION,
  values: INSTITUTIONAL_VALUES,
} as const satisfies InstitutionalContent;
