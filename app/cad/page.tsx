import SiteNav from '../nav';
import {getProject} from '../project-data';
import {sitePath} from '../site-path';

const models = [
  {
    project: getProject('pan-tilt')!,
    status: 'LATEST EXPORT · REV K',
    visual: 'PAN–TILT / COMPLETE ASSEMBLY',
    copy: 'Two-axis camera mechanism designed around SG90 servo geometry, webcam mounting, printability, fastener access and clean wiring.'
  },
  {
    project: getProject('steady-spoon')!,
    status: 'LATEST EXPORT · V3.9',
    visual: 'STEADYHAND / COMPLETE ASSEMBLY',
    copy: 'Compact assistive-device packaging for the stabilization mechanism, handle, moving clearances and future electronics.'
  }
];

export default function Cad() {
  return <main className="screen">
    <SiteNav active="cad"/>
    <section className="sectionScreen cadScreen">
      <header className="compactHead">
        <div><span>MECHANICAL DESIGN</span><h1>CAD Assemblies</h1></div>
        <p>Latest complete STEP exports only.</p>
      </header>
      <div className="twoPanel cadDownloadPanels">
        {models.map(model => <article key={model.project.slug}>
          <div className="miniCad"><strong>{model.visual}</strong><i/><i/></div>
          <header><small>{model.status}</small><h2>{model.project.title}</h2></header>
          <p>{model.copy}</p>
          <div className="cadDownloads">
            {model.project.downloads.map(file => <a href={sitePath(file.path)} download key={file.path}>
              <span>{file.format} · {file.size}</span>
              <strong>{file.name}</strong>
              <i>↓</i>
            </a>)}
          </div>
          <a className="cadCaseLink" href={sitePath(`/projects/${model.project.slug}/`)}>VIEW PROJECT DETAILS →</a>
        </article>)}
      </div>
    </section>
    <footer className="minimalFooter"><a href={sitePath('/')}>← HOME</a><span>ASSEMBLIES ONLY · INDIVIDUAL PARTS EXCLUDED</span></footer>
  </main>;
}

