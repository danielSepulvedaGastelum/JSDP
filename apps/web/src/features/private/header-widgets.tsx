import React from 'react';
import type {NotificationItem} from './registry/notification-center/notification-center';
import {NotificationCenter} from './registry/notification-center/notification-center';
export const EXAMPLE_NOTIFICATIONS:NotificationItem[]=[
{id:'budget-month',title:'Presupuesto de noviembre disponible',description:'Demostración: ya puedes preparar la carga mensual de los conceptos 008, 010, 035 y 037.',time:'Ejemplo · hoy',tone:'success'},
{id:'budget-window',title:'Periodo de carga habilitado',description:'Demostración: la recepción de presupuesto del mes está lista. Consulta el calendario del proceso antes de cargar tu archivo.',time:'Ejemplo · hoy',tone:'info'},
{id:'support-file',title:'Material de apoyo actualizado',description:'Demostración: revisa los archivos de interés para preparar la información presupuestal.',time:'Ejemplo · ayer',tone:'info',read:true}
];
export function DemoNotificationCenter({mode='example',profileId='hgr01'}){return <span className="notification-entry"><NotificationCenter key={mode+'-'+profileId} notifications={mode==='empty'?[]:EXAMPLE_NOTIFICATIONS} label="Notificaciones · demostración"/></span>}
