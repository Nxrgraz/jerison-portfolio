'use client';

import {useState} from 'react';
import SiteNav from '../nav';
import {sitePath} from '../site-path';

const sections=[
  {
    id:'research',
    tab:'NSERC RESEARCH',
    place:'University of Alberta',
    role:'Undergraduate Researcher',
    title:'Autonomous systems that leave the simulation.',
    copy:'May 2026–present · NSERC USRA research under Prof. Martin Barczyk, continuing beyond the summer term. Developing and testing autonomous drone-to-drone tracking.',
    items:['Raised sustained perception throughput from approximately 9 to 30 FPS with ROS 2, C++ and CUDA inference.','Generated 428 training and validation images using Vicon projection and compensation for approximately 110 ms video latency.','Identified flight dynamics and developed MPC with target-motion estimation and predictive braking.','Demonstrated controlled 3D tracking and target recovery; Jetson deployment and quantitative Vicon accuracy analysis remain ongoing.'],
    tags:['ROS 2','C++','Python','YOLO','MPC','Vicon'],
  },
  {
    id:'education',
    tab:'EDUCATION',
    place:'University of Alberta',
    role:'Engineering Co-op Student',
    title:'Mechatronics across mechanics, electronics and code.',
    copy:'A multidisciplinary engineering path focused on robotics, embedded systems, controls and practical mechanical design.',
    items:['Mechatronics and Robotics Engineering Co-op.','Hands-on work across CAD, electronics, perception and controls.','Developing toward embedded, automotive and autonomous-systems roles.','Based in Edmonton, Alberta.'],
    tags:['Co-op','Mechatronics','Robotics','Embedded','CAD','Controls'],
  },
];

export default function Experience(){
  const[active,setActive]=useState(0);
  const item=sections[active];
  return <main className="screen"><SiteNav active="experience"/><section className="sectionScreen experienceScreen"><header className="compactHead"><div><span>BACKGROUND</span><h1>Experience</h1></div><p>Research and engineering education.</p></header><div className="experienceDeck"><nav aria-label="Experience entries">{sections.map((section,index)=><button key={section.id} className={index===active?'active':''} onClick={()=>setActive(index)}><strong>{section.tab}</strong><small>{section.place}</small><i>→</i></button>)}</nav><article key={item.id}><div className="experienceMeta"><span>{item.place}</span><span>{item.role}</span></div><h2>{item.title}</h2><p>{item.copy}</p><ul>{item.items.map(point=><li key={point}>{point}</li>)}</ul><div className="experienceBottom"><div className="chipRow">{item.tags.map(tag=><span key={tag}>{tag}</span>)}</div>{item.id==='research'&&<a href={sitePath('/projects/drone-pursuit/')}>VIEW THE RESEARCH →</a>}</div></article></div></section><footer className="minimalFooter"><a href={sitePath('/')}>← HOME</a><span>SELECT AN ENTRY</span></footer></main>}
