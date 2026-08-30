import SiteNav from './nav';
import {sitePath} from './site-path';
const sections=[
  {href:'/projects',label:'PROJECTS',copy:'Robotics, autonomy and embedded systems'},
  {href:'/cad',label:'CAD ASSEMBLIES',copy:'Downloadable complete STEP exports'},
  {href:'/pcb',label:'PCB DESIGNS',copy:'Boards in development'},
  {href:'/experience',label:'WORK EXPERIENCE',copy:'Research and engineering background'},
  {href:'/volunteering',label:'VOLUNTEERING',copy:'Badminton, coaching and piano'},
];

export default function Home(){return <main className="screen"><SiteNav/><section className="hubHome"><div className="hubIntro"><span>MECHATRONICS & ROBOTICS ENGINEERING</span><h1>Jerison<br/>Tian</h1><p>University of Alberta Co-op student building systems where computer vision, controls, embedded electronics, sensors and mechanical design must work together on real hardware.</p></div><nav className="sectionMenu" aria-label="Portfolio sections">{sections.map(section=><a href={sitePath(`${section.href}/`)} key={section.href}><span>{section.label}</span><small>{section.copy}</small><i>→</i></a>)}</nav></section><footer className="minimalFooter"><span>EDMONTON, AB</span><span>ZONGSHUOTIAN@OUTLOOK.COM</span></footer></main>}

