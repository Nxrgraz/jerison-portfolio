'use client';

import {useState} from 'react';
import type {Project, ProjectSection} from './project-data';
import {sitePath} from './site-path';
import ProjectVideo from './project-video';
import CadViewer from './cad-viewer';

type Tab = 'overview' | 'engineering' | 'validation' | 'files' | 'cad' | 'demo';

function DetailList({sections}:{sections:ProjectSection[]}) {
  return <div className="detailList">
    {sections.map((section, index) => <details key={section.title} open={index === 0}>
      <summary>
        <span>
          <strong>{section.title}</strong>
          <small>{section.summary}</small>
        </span>
        <i>+</i>
      </summary>
      <ul>{section.bullets.map(bullet => <li key={bullet}>{bullet}</li>)}</ul>
    </details>)}
  </div>;
}

export default function CaseTabs({project}:{project:Project}) {
  const [tab, setTab] = useState<Tab>('overview');
  const tabs: Tab[] = ['overview', 'engineering', 'validation', 'files'];
  if (project.downloads.length) tabs.splice(3, 0, 'cad');
  if (project.video) tabs.splice(1, 0, 'demo');

  return <section className="caseTabs">
    <nav aria-label="Project details">
      {tabs.map(item => <button key={item} className={tab === item ? 'active' : ''} onClick={() => setTab(item)}>{item.toUpperCase()}</button>)}
    </nav>
    <div className="tabPanel" key={tab}>
      {tab === 'overview' && <div className="overviewPanel">
        <span>THE SYSTEM</span>
        <p className="largeText">{project.overview}</p>
        {project.highlights && <ul className="projectHighlights">{project.highlights.map(point => <li key={point}>{point}</li>)}</ul>}
        {project.video && <button className="demoLink" onClick={() => setTab('demo')}>▶ WATCH THE DEMO</button>}
        <div className="overviewFacts">
          <div><small>ROLE</small><p>{project.role}</p></div>
          <div><small>PERIOD</small><p>{project.period}</p></div>
          <div><small>ENGINEERING PROBLEM</small><p>{project.problem}</p></div>
        </div>
      </div>}
      {tab === 'engineering' && <>
        <div className="panelIntro"><span>ENGINEERING BREAKDOWN</span><p>Open a section to see the detailed work.</p></div>
        <DetailList sections={project.engineering}/>
      </>}
      {tab === 'cad' && <><CadViewer slug={project.slug} title={project.title}/><p className="sourceNote">Complete assembly preview. Original STEP files are in the Files tab.</p></>}
      {tab === 'demo' && project.video && <ProjectVideo id={project.video.id} title={project.video.title}/>}
      {tab === 'validation' && <>
        <div className="panelIntro"><span>TESTING, RESULTS & STATUS</span><p>Measured outcomes and what remains in progress.</p></div>
        <DetailList sections={project.validation}/>
      </>}
      {tab === 'files' && <div className="filePanel">
        <span>TOOLS & SYSTEMS</span>
        <div className="stackGrid">{project.stack.map(item => <b key={item}>{item}</b>)}</div>
        <span>PUBLIC FILES</span>
        {project.downloads.length > 0 ? <div className="downloadGrid">
          {project.downloads.map(file => <a href={sitePath(file.path)} download key={file.path}>
            <small>{file.format} · {file.size}</small>
            <strong>{file.name}</strong>
            <p>{file.description}</p>
            <i>DOWNLOAD ↓</i>
          </a>)}
        </div> : <p className="emptyFiles">No public files are attached to this project.</p>}
        <p className="sourceNote">{project.source}</p>
        {project.repository && <a className="askLink" href={project.repository} target="_blank" rel="noreferrer">VIEW SOURCE ON GITHUB ↗</a>}
        <a className="askLink" href={`mailto:zongshuotian@outlook.com?subject=${encodeURIComponent(project.title)}`}>ASK ABOUT THE PROJECT →</a>
      </div>}
    </div>
  </section>;
}
