export type OrganizationUnitId = 'J' | 'O' | 'D1' | 'D2' | 'D3' | 'D4';

export interface OrganizationUnit {
  readonly id: OrganizationUnitId;
  readonly label: string;
  readonly parentId: OrganizationUnitId | null;
}

export const ORGANIZATION_UNITS = [
  {
    id: 'J',
    label: 'Jefatura de Servicios de Desarrollo de Personal',
    parentId: null,
  },
  {
    id: 'O',
    label: 'Oficina de Información y Seguimiento de Auditorías',
    parentId: 'J',
  },
  {
    id: 'D1',
    label: 'Departamento de Personal Delegacional',
    parentId: 'J',
  },
  {
    id: 'D2',
    label: 'Departamento de Presupuesto y Control del Gasto',
    parentId: 'J',
  },
  {
    id: 'D3',
    label: 'Jefe del Departamento de Relaciones Laborales',
    parentId: 'J',
  },
  {
    id: 'D4',
    label: 'Departamento de Capacitación',
    parentId: 'J',
  },
] as const satisfies readonly OrganizationUnit[];
