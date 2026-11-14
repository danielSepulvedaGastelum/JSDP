"use client";
import {useId,type ReactNode} from 'react';
import {Checkbox} from '../../checkbox/checkbox';
import styles from './release-readiness.module.css';

/** Adapted from Arc Release Readiness Pro: values are derived from uploads, never user-toggled. */
export interface ReadinessTask {id:string;label:string;detail:string;done:boolean}
export interface ReleaseReadinessProps {tasks:ReadinessTask[];period:string;activeId?:string;title?:string;itemLabel?:string;listLabel?:string;progressLabel?:string;footer?:ReactNode}
export function ReleaseReadiness({tasks,period,activeId,title='Avance de la quincena',itemLabel='archivos cargados',listLabel='Fuentes del Balance de Plazas',progressLabel='Archivos cargados de la quincena',footer}:ReleaseReadinessProps){
 const id=useId(),ready=tasks.filter(task=>task.done).length,total=tasks.length,remaining=total-ready;
 return <section className={styles.release+' balance-readiness'} aria-labelledby={id+'-title'} data-balance-readiness="">
  <header className={styles.header}><div className={styles.titleBlock}><h2 id={id+'-title'}>{title}</h2><p>Quincena {period}</p></div></header>
  <div className={styles.progress}>
   <div className={styles.progressMeta}><span role="status" aria-live="polite" aria-atomic="true">{ready} de {total} {itemLabel}</span><span className={styles.count}>{remaining===0?'Completo':remaining+' pendientes'}</span></div>
   <div className={styles.track} role="progressbar" aria-label={progressLabel} aria-valuemin={0} aria-valuemax={total} aria-valuenow={ready} aria-valuetext={ready+' de '+total+' '+itemLabel}>
    <span className={styles.fill} data-complete={ready===total||undefined} style={{transform:'translateX('+((total?ready/total:0)-1)*100+'%)'}}/>
   </div>
  </div>
  <ul className={styles.tasks} aria-label={listLabel}>
   {tasks.map(task=><li key={task.id} className={styles.task} data-done={task.done||undefined} data-current={task.id===activeId||undefined} data-readiness-check={task.id}>
    <Checkbox id={id+'-'+task.id} checked={task.done} disabled aria-label={task.label+'. '+task.detail}/>
    <label htmlFor={id+'-'+task.id} className={styles.taskCopy}>
     <span className={styles.taskLabel}>{task.label}</span>
     <span className={styles.taskDetail}>{task.detail}</span>
    </label>
   </li>)}
  </ul>
  <footer className={styles.footer}>{footer||<p className="balance-readiness-note">Los checks se actualizan al completar la carga. Son de solo lectura.</p>}</footer>
 </section>
}
export default ReleaseReadiness;
