import SiteNav from './nav';
import {sitePath} from './site-path';
const sections=[
  {href:'/projects',label:'PROJECTS',copy:'Robotics, autonomy and embedded systems'},
  {href:'/cad',label:'CAD ASSEMBLIES',copy:'Downloadable complete STEP exports'},
  {href:'/experience',label:'WORK EXPERIENCE',copy:'Research and engineering background'},
  {href:'/volunteering',label:'VOLUNTEERING',copy:'Badminton, coaching and piano'},
];

export default function Home(){return <main className="screen"><SiteNav/><section className="hubHome"><div className="hubIntro"><span>MECHATRONICS & ROBOTICS ENGINEERING</span><h1>Jerison<br/>Tian</h1><p>I’m a mechatronics and robotics engineering co-op student at the University of Alberta. I work with Prof. Martin Barczyk on autonomous drone tracking, a research project I started through an NSERC Undergraduate Student Research Award.</p><p>Outside the lab, I work on my own robotics projects, including a face-tracking camera and a stabilizing spoon. I’m interested in mechanical design, embedded programming and control systems. I also play competitive badminton, coach, and have completed RCM Level 10 piano.</p></div><nav className="sectionMenu" aria-label="Portfolio sections">{sections.map(section=><a href={sitePath(`${section.href}/`)} key={section.href}><span>{section.label}</span><small>{section.copy}</small><i>→</i></a>)}<a href={sitePath('/Jerison-Tian-Resume.pdf')} target="_blank" rel="noopener noreferrer" aria-label="Open Jerison Tian’s resume PDF in a new tab"><span>RESUME</span><small>View resume · PDF</small><i>↗</i></a></nav></section><footer className="minimalFooter"><span>EDMONTON, AB</span><span>ZONGSHUOTIAN@OUTLOOK.COM</span></footer></main>}
