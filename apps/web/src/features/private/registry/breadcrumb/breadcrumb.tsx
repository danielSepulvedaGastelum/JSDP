"use client";
import type { MouseEvent, ReactNode } from "react";
import { ChevronRight as NavArrowRight } from "lucide-react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { ArcLink } from "../lib/arc-provider";
import { motionTokens } from "../lib/motion-tokens";
import styles from "./breadcrumb.module.css";
export interface BreadcrumbItem {
  label: string;
  icon?: ReactNode;
  href?: string;
  /** Runs when the crumb is chosen. Without an href the crumb renders as a button, for paths that live in local state. */
  onClick?: (event: MouseEvent<HTMLElement>) => void;
}
export interface BreadcrumbProps { items: BreadcrumbItem[]; ariaLabel?: string }
/** Crumbs present on first render stay still; crumbs added later slide in from the path before them. */
export function Breadcrumb({ items, ariaLabel = "Breadcrumb" }: BreadcrumbProps) {
  const reduced = useReducedMotion() ?? false;
  const still = { duration: 0 };
  const path = items.map(item => item.label).join("/");
  return <nav aria-label={ariaLabel}><ol className={styles.list}><AnimatePresence mode="popLayout" initial={false}>{items.map((item, index) => {
    const current = index === items.length - 1;
    const content=<span className={styles.content}>{item.icon&&<span className={styles.itemIcon} aria-hidden="true">{item.icon}</span>}<span className={styles.text}>{item.label}</span></span>;
    return <motion.li key={`${item.label}-${index}`}
      layout={reduced ? false : "position"} layoutDependency={path}
      initial={reduced ? false : { opacity: 0, x: -8, filter: `blur(${motionTokens.blur.subtle}px)` }} animate={{ opacity: 1, x: 0, filter: "blur(0px)" }}
      exit={reduced ? { opacity: 0, transition: still } : { opacity: 0, x: -4, filter: `blur(${motionTokens.blur.subtle}px)`, transition: { duration: motionTokens.duration.instant, ease: [...motionTokens.ease.standard] } }}
      transition={reduced ? still : { duration: motionTokens.duration.standard, ease: [...motionTokens.ease.enter], layout: motionTokens.spring.smooth }}>
      {index > 0 && <NavArrowRight width={14} height={14} aria-hidden="true"/>}
      {!current && item.href ? <ArcLink href={item.href} data-label={item.label} data-has-icon={item.icon?"":undefined} onClick={item.onClick}>{content}</ArcLink>
        : !current && item.onClick ? <button type="button" data-label={item.label} data-has-icon={item.icon?"":undefined} onClick={item.onClick}>{content}</button>
        : <span aria-current={current ? "page" : undefined} data-label={item.label} data-has-icon={item.icon?"":undefined}>{content}</span>}
    </motion.li>;
  })}</AnimatePresence></ol></nav>;
}
