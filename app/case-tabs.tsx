'use client';
import {useState} from 'react';
import type {Project} from './project-data';
export default function CaseTabs({project}:{project:Project}){const[tab,setTab]=useState<'overview'|'build'|'stack'>('overview');return <section className="caseTabs"><nav>{(['overview','build','stack'] as const).map(item=><button key={item} className={tab===item?'active':''} onClick={()=>setTab(item)}>{item.toUpperCase()}</button>)}</nav><div className="tabPanel" key={tab}>{tab==='overview'&&<><span>THE SYSTEM</span><p className="largeText">{project.overview}</p><span>THE PROBLEM</span><p>{project.problem}</p></>}{tab==='build'&&<><span>WHAT I DID</span><ol>{project.work.map(item=><li key={item}>{item}</li>)}</ol></>}{tab==='stack'&&<><span>TOOLS & SYSTEMS</span><div className="stackGrid">{project.stack.map(item=><b key={item}>{item}</b>)}</div><span>SOURCE</span><p>{project.source}</p><a href={`mailto:zongshuotian@outlook.com?subject=${encodeURIComponent(project.title)}`}>ASK ABOUT THE PROJECT →</a></>}</div></section>}


