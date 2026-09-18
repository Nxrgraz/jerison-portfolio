'use client';

import {useState} from 'react';

export default function ProjectVideo({id, title}:{id:string; title:string}) {
  const [playing, setPlaying] = useState(false);
  return <figure className="projectVideo">
    <div className="videoFrame">
      {playing ? <iframe src={`https://www.youtube-nocookie.com/embed/${id}?autoplay=1`} title={title} allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerPolicy="strict-origin-when-cross-origin" allowFullScreen/> :
        <button className="videoCover" onClick={() => setPlaying(true)} aria-label={`Play ${title}`}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={`https://i.ytimg.com/vi/${id}/hqdefault.jpg`} alt="" loading="lazy"/>
          <span className="videoPlay">▶</span><strong>WATCH THE DEMO</strong>
        </button>}
    </div>
    <figcaption><span>{title}</span><a href={`https://www.youtube.com/watch?v=${id}`} target="_blank" rel="noreferrer">OPEN ON YOUTUBE ↗</a></figcaption>
  </figure>;
}
