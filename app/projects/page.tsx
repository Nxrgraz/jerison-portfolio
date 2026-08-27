import {projects} from '../project-data';
import SiteNav from '../nav';
import {sitePath} from '../site-path';
export default function Projects(){return <main className="screen"><SiteNav active="projects"/><section className="sectionScreen"><header className="compactHead"><div><span>SELECTED WORK</span><h1>Projects</h1></div><p>Click a project for the details.</p></header><div className="projectGrid">{projects.map(project=><a href={sitePath(`/projects/${project.slug}/`)} key={project.slug}><small>{project.type}</small><h2>{project.title}</h2><p>{project.summary}</p><div className="cardTags">{project.stack.slice(0,3).map(tool=><span key={tool}>{tool}</span>)}</div><footer><i>{project.status}</i><b>→</b></footer></a>)}</div></section><footer className="minimalFooter"><a href={sitePath('/')}>← HOME</a><span>SELECTED PROJECTS</span></footer></main>}

