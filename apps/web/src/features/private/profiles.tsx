import type {Profile,PayrollId} from './types';
import React from 'react';
export const CONTRACTS=[
{code:'00',label:'Estatuto A',state:276,hgr:20,sub:5},
{code:'01',label:'Confianza A o B',state:1025,hgr:35,sub:10},
{code:'02',label:'Base',state:16585,hgr:1845,sub:175},
{code:'03',label:'Temporales',state:85,hgr:3,sub:2},
{code:'05',label:'Becarios',state:456,hgr:35,sub:0},
{code:'07',label:'Becados',state:436,hgr:15,sub:0},
{code:'08',label:'Sustitutos',state:656,hgr:189,sub:15},
{code:'09',label:'Residentes',state:1056,hgr:356,sub:0}];
const offices:[string,string,string,PayrollId[]][]=[
['jsdp','OOAD JSDP','JSDP',['workers','retirees','aps']],
['budget','OOAD Presupuesto','Presupuesto',['workers','aps']],
['control','OOAD Control del Proceso','Control del Proceso',['workers','retirees','aps']],
['personal','OOAD Depto. Personal','Depto. Personal',['workers','retirees','aps']],
['laborales','OOAD Depto. Laborales','Depto. Laborales',['workers','retirees']],
['capacitacion','OOAD Depto. Capacitación','Depto. Capacitación',['workers','retirees']],
['auditorias','OOAD Ofna. Auditorías','Ofna. Auditorías',['workers','retirees']]];
export const PROFILES:Profile[]=[
{id:'hgr01',label:'HGR 01 · Unidad médica',unitName:'Hospital General Regional No. 1',shortName:'HGR 01',role:'Unidades médicas',kind:'medical',photo:'HGR-01.webp',stats:'hgr',payrolls:['workers','aps']},
{id:'subobregon',label:'Subdelegación Obregón · Unidad no médica',unitName:'Subdelegación Obregón',shortName:'Subdelegación Obregón',role:'Unidades no médicas',kind:'nonmedical',photo:'Subdelegacion-Obregon.webp',stats:'sub',payrolls:['workers','aps']},
{id:'medical-default',label:'Unidad médica sin fotografía propia',unitName:'Unidad médica de ejemplo',shortName:'Unidad médica',role:'Unidades médicas',kind:'medical',photo:null,stats:null,payrolls:['workers','aps']},
{id:'nonmedical-default',label:'Unidad no médica sin fotografía propia',unitName:'Unidad no médica de ejemplo',shortName:'Unidad no médica',role:'Unidades no médicas',kind:'nonmedical',photo:null,stats:null,payrolls:['workers','aps']},
...offices.map(([id,label,office,payrolls])=>({id,label,office,unitName:'OOAD Sonora',shortName:'OOAD Sonora',role:label,kind:'delegation' as const,photo:'OOAD.webp',stats:'state' as const,payrolls}))];
export const ViewerContext=React.createContext(PROFILES[0]);
export const PAYROLLS:Record<PayrollId,{id:PayrollId;label:string;period:string;cadence:string;tone:string}>={
workers:{id:'workers',label:'Trabajadores',period:'2026022',cadence:'quincenal',tone:'forest'},
aps:{id:'aps',label:'Incidencias APS',period:'2026021',cadence:'quincenal',tone:'wine'},
retirees:{id:'retirees',label:'Jubilados',period:'2026012',cadence:'mensual',tone:'gold'}};
export const REFERENCE_PERIOD='2026022';
const monthNames=['enero','febrero','marzo','abril','mayo','junio','julio','agosto','septiembre','octubre','noviembre','diciembre'];
export function periodLabel(code:string,cadence='quincenal'){const year=code.slice(0,4),number=Number(code.slice(4));if(cadence==='mensual')return monthNames[number-1]+' de '+year;return (number%2?'1.ª':'2.ª')+' quincena de '+monthNames[Math.ceil(number/2)-1]+' de '+year}
export function getContractData(profile:Profile){return profile.stats?CONTRACTS.map(c=>({id:c.code,code:c.code,name:c.label,value:c[profile.stats!]})):null}
export function fallbackPhoto(profile:Profile){return profile.kind==='medical'?'Unidad_Medica.webp':profile.kind==='nonmedical'?'Unidad_No_Medica.webp':'OOAD.webp'}
