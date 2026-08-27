import type {Metadata} from 'next';
import {getProject,projects} from '../../project-data';
import SiteNav from '../../nav';
import CaseTabs from '../../case-tabs';
import {sitePath} from '../../site-path';
export function generateStaticParams(){return projects.map(project=>({slug:project.slug}))}
export async function generateMetadata({params}:{params:Promise<{slug:string}>}):Promise<Metadata>{const {slug}=await params;const project=getProject(slug);if(!project)return{title:'Project not found',openGraph:{images:[]},twitter:{images:[]}};return{title:`${project.title} — Jerison Tian`,description:project.summary,openGraph:{title:project.title,description:project.summary,images:[]},twitter:{title:project.title,description:project.summary,images:[]}}}
export default async function ProjectPage({params}:{params:Promise<{slug:string}>}){const {slug}=await params;const project=getProject(slug);if(!project)return <main className="missing"><h1>Project not found.</h1><a href={sitePath('/projects/')}>← All projects</a></main>;return <main className="screen"><SiteNav active="projects"/><section className="projectScreen"><aside><a href={sitePath('/projects/')}>← ALL PROJECTS</a><span>{project.type}</span><h1>{project.title}</h1><p>{project.summary}</p><div className="miniMetrics">{project.metrics.map(metric=><span key={metric.label}><b>{metric.value}</b>{metric.label}</span>)}</div></aside><CaseTabs project={project}/></section><footer className="minimalFooter"><span>{project.status}</span><span>SELECT A TAB FOR DETAILS</span></footer></main>}

