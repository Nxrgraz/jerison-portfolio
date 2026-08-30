'use client';

import {useState} from 'react';
import type {Project, ProjectSection} from './project-data';
import {sitePath} from './site-path';

type Tab = 'overview' | 'engineering' | 'validation' | 'files';

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

  return <section className="caseTabs">
    <nav aria-label="Project details">
      {tabs.map(item => <button key={item} className={tab === item ? 'active' : ''} onClick={() => setTab(item)}>{item.toUpperCase()}</button>)}
    </nav>
    <div className="tabPanel" key={tab}>
      {tab === 'overview' && <div className="overviewPanel">
        <span>THE SYSTEM</span>
        <p className="largeText">{project.overview}</p>
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
        <a className="askLink" href={`mailto:zongshuotian@outlook.com?subject=${encodeURIComponent(project.title)}`}>ASK ABOUT THE PROJECT →</a>
      </div>}
    </div>
  </section>;
}

