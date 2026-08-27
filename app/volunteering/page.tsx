import SiteNav from '../nav';
import {sitePath} from '../site-path';

const activities=[
  {type:'SPORT + COACHING',title:'Badminton',copy:'Competitive playing, coaching and volunteering experience centered on helping less-experienced players improve through clear demonstration and feedback.',items:['Competitive player','Coaching','Athlete development','Communication']},
  {type:'MUSIC',title:'RCM Level 10 Piano',copy:'A long-term musical achievement built through technical practice, performance preparation and consistency.',items:['Royal Conservatory','Level 10','Performance','Technical discipline']},
];

export default function Volunteering(){return <main className="screen"><SiteNav active="volunteering"/><section className="sectionScreen"><header className="compactHead"><div><span>OUTSIDE ENGINEERING</span><h1>Volunteering</h1></div><p>Coaching, competition and music.</p></header><div className="twoPanel activityPanels">{activities.map((activity,index)=><article key={activity.title}><div className="activityMark"><span>{index===0?'B':'P'}</span></div><header><small>{activity.type}</small><h2>{activity.title}</h2></header><p>{activity.copy}</p><div className="chipRow">{activity.items.map(item=><span key={item}>{item}</span>)}</div></article>)}</div></section><footer className="minimalFooter"><a href={sitePath('/')}>← HOME</a><span>VOLUNTEERING + EXTRACURRICULARS</span></footer></main>}

