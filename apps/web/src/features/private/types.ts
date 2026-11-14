export type Theme = 'light' | 'dark';
export type PreviewState = 'normal' | 'carga' | 'vacio' | 'error' | 'restringido';
export type Scope = 'budget' | 'balance';
export type PayrollId = 'workers' | 'aps' | 'retirees';
export interface Profile {id:string;label:string;unitName:string;shortName:string;role:string;kind:'medical'|'nonmedical'|'delegation';photo:string|null;stats:'state'|'hgr'|'sub'|null;payrolls:PayrollId[];office?:string}
export interface SourceFile {name:string;size:number;file?:File;loaded:boolean}
export type PeriodFiles = Record<string,Record<string,SourceFile|null>>;
export interface HolidayDraft {ids:string[];none:boolean}
export interface HolidayConfirmation extends HolidayDraft {signature:string}
export type HolidayConfirmations = Record<string,HolidayConfirmation|null>;
export interface DemoUser {id:string;name:string;email:string;profile:string;unit:string;status:string;[key:string]:string}
