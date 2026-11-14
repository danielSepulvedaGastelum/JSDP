import type {LucideIcon} from 'lucide-react';
import React from 'react';
import {House,CircleDollarSign,Scale,Users,FileText,BarChart3,Upload,TrendingUp,ShieldCheck,Database,CheckSquare,Activity,History,TableProperties,Files,SlidersHorizontal,UserPlus,Contact} from 'lucide-react';
export const NAVIGATION_ICONS:Record<string,LucideIcon>={home:House,money:CircleDollarSign,balance:Scale,users:Users,file:FileText,chart:BarChart3,upload:Upload,trend:TrendingUp,shield:ShieldCheck,database:Database,'list-checks':CheckSquare,activity:Activity,history:History,table:TableProperties,files:Files,sliders:SlidersHorizontal,'user-plus':UserPlus,contact:Contact};
export function NavigationIcon({name,size=16}:{name?:string;size?:number}){const Icon=name?NAVIGATION_ICONS[name]:undefined;return Icon?<Icon size={size} strokeWidth={1.75} aria-hidden="true"/>:null}
