import React, {useEffect, useRef, useState} from "react";
import {createRoot} from "react-dom/client";
import {useReducedMotion} from "motion/react";
import {mount} from "ascii.rest";
import * as alpineDawn from "ascii.rest/pieces/alpine-dawn";
import DecryptedText from "./components/reactbits/DecryptedText";
import TiltedCard from "./components/reactbits/TiltedCard";
import {sarvboliDemoUrl} from "./graph-data";

function AlpineDawn() {
  const canvas = useRef(null);
  const [paused, setPaused] = useState(false);
  const reduced = useReducedMotion();

  useEffect(() => {
    if (paused) return;
    return mount(canvas.current, alpineDawn, {fps: reduced ? 0 : 15});
  }, [paused, reduced]);

  return <figure className="alpine-scene">
    <canvas ref={canvas} role="img" aria-label="Animated ASCII landscape of snowy peaks at dawn above a still mountain lake" style={{width:"100%"}} />
    <figcaption>
      <a href="https://ascii.rest/alpine-dawn/">alpine dawn · ascii.rest</a>
      {!reduced && <button type="button" onClick={() => setPaused(value => !value)} aria-pressed={paused}>{paused ? "Play animation" : "Pause animation"}</button>}
    </figcaption>
  </figure>;
}

const projects = [
  {name:"SarvBoli",tag:"AI / language learning",image:"media/sarvboli-logo.png",alt:"SarvBoli language learning app logo",description:"A place to actually practice speaking Hindi, Marathi, and Telugu :) I built the React Native app and FastAPI backend for multilingual chat, voice calls, and roleplays, including recording, transcription, reply playback, and persistent sign-in.",stack:["React Native","Expo","FastAPI","AWS EC2"],demo:sarvboliDemoUrl},
  {name:"FloatChat",tag:"Natural language / ocean data",image:"media/floatchat.webp",alt:"FloatChat architecture, from Argo float data ingestion to natural-language queries and charts",description:"Ask a question about ocean data, get something you can actually explore. A retrieval pipeline over Argo measurements, with charts on the other end.",stack:["RAG","FAISS","Qdrant","React"],repo:"floatchat-sih"},
  {name:"Smart Crop Analyser",tag:"Agriculture / mobile",image:"media/smartcrop.webp",alt:"Smart Crop Analyser architecture diagram with Flutter, FastAPI, and model services",description:"A Flutter app that takes a district, soil details, and photos, then brings crop recommendations, weather, and soil analysis into one place.",stack:["Flutter","FastAPI","scikit-learn"],repo:"smart_crop_backend"},
  {name:"Abhayam",tag:"Computer vision / SIH 2024",image:"media/abhayam.webp",alt:"Abhayam CCTV analytics workflow diagram",description:"Our women’s safety CCTV analytics prototype. This was my introduction to building with computer vision, and the project we took to the SIH 2024 Grand Finale :’)",stack:["YOLOv8","OpenCV","MediaPipe"],repo:"Abhayam-Women-Safety"}
];
function Workbench() {
  const [selected,setSelected] = useState(0);
  const reduced = useReducedMotion();
  const project = projects[selected];
  return <div className="workbench">
    <div className="project-selector" role="tablist" aria-label="Selected projects" aria-orientation="vertical">
      {projects.map((p,i)=><button key={p.name} id={"project-tab-"+i} role="tab" aria-selected={selected===i} aria-controls="project-preview" tabIndex={selected===i?0:-1} onClick={()=>setSelected(i)} onKeyDown={event=>{
        const movement={ArrowDown:1,ArrowRight:1,ArrowUp:-1,ArrowLeft:-1}[event.key];
        let next = event.key==="Home"?0:event.key==="End"?projects.length-1:movement===undefined?null:(selected+movement+projects.length)%projects.length;
        if(next!==null){event.preventDefault();setSelected(next);document.getElementById("project-tab-"+next).focus();}
      }}><span>{p.name}</span><small>{p.tag}</small></button>)}
      <a className="all-projects" href="projects.html">Open the project atlas</a>
    </div>
    <div className={"project-preview" + (project.name === "SarvBoli" ? " sarvboli-preview" : "")} id="project-preview" role="tabpanel" aria-labelledby={"project-tab-"+selected}>
      <div className="preview-label"><DecryptedText text={project.name} speed={30} maxIterations={7} animateOn="view" /><span>{project.name === "SarvBoli" ? "Language learning app" : "Architecture"}</span></div>
      <TiltedCard key={project.name} imageSrc={project.image} altText={project.alt}
        containerHeight="clamp(250px, 34vw, 390px)" containerWidth="100%" imageHeight="100%" imageWidth="100%"
        rotateAmplitude={reduced?0:5} scaleOnHover={1.015} showTooltip={false}
        gyroscope={false} intro={false} glare={.12} shadow={0} radius={0} />
      <div className="preview-notes">
        <p>{project.description}</p>
        <ul aria-label="Technologies">{project.stack.map(s=><li key={s}>{s}</li>)}</ul>
        <div className="project-links">
          {project.demo && <a className="button" href={project.demo} target="_blank" rel="noopener noreferrer">Live demo</a>}
          <a href={project.repo ? "https://github.com/esh22nika/"+project.repo : "projects.html"}>{project.repo ? "Source on GitHub" : "Explore project architecture"}</a>
        </div>
      </div>
    </div>
  </div>;
}
const host=document.querySelector("#workbench");
if(host) createRoot(host).render(<Workbench />);
const heroArt=document.querySelector("#hero-art");
if(heroArt) createRoot(heroArt).render(<AlpineDawn />);
