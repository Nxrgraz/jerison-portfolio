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
    copy:'Working on real drone-to-drone perception and pursuit under Dr. Martin Barczyk, with an emphasis on measurable performance and careful flight validation.',
    items:['Migrated performance-sensitive ROS 2 processing from Python toward C++.','Improved the vision pipeline from roughly 9 FPS to around 30 FPS.','Connected YOLO keypoints, relative 3D pose estimation and MPC flight control.','Used rosbags, telemetry and Vicon ground truth to diagnose the full system.'],
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
  return <main className="screen"><SiteNav active="experience"/><section className="sectionScreen experienceScreen"><header className="compactHead"><div><span>BACKGROUND</span><h1>Experience</h1></div><p>Research and engineering education.</p></header><div className="experienceDeck"><nav aria-label="Experience entries">{sections.map((section,index)=><button key={section.id} className={index===active?'active':''} onClick={()=>setActive(index)}><span>0{index+1}</span><strong>{section.tab}</strong><small>{section.place}</small><i>→</i></button>)}</nav><article key={item.id}><div className="experienceMeta"><span>{item.place}</span><span>{item.role}</span></div><h2>{item.title}</h2><p>{item.copy}</p><ul>{item.items.map((point,index)=><li key={point}><i>0{index+1}</i><span>{point}</span></li>)}</ul><div className="experienceBottom"><div className="chipRow">{item.tags.map(tag=><span key={tag}>{tag}</span>)}</div>{item.id==='research'&&<a href={sitePath('/projects/drone-pursuit/')}>VIEW THE RESEARCH →</a>}</div><div className="experienceCount"><b>0{active+1}</b><span>/ 0{sections.length}</span></div></article></div></section><footer className="minimalFooter"><a href={sitePath('/')}>← HOME</a><span>SELECT AN ENTRY</span></footer></main>}

