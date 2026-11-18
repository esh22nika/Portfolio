import React, {useState, useMemo, useEffect} from "react";
import {createRoot} from "react-dom/client";
import {ReactFlow, ReactFlowProvider, Background, Controls, MiniMap, Handle, Position, useReactFlow} from "@xyflow/react";
import "@xyflow/react/dist/style.css";
import {topics} from "./graph-data.js";
import {architecture} from "./graph-details.js";

function AtlasNode({data}) {
  return <div className={"atlas-node " + data.kind} style={{"--node": data.color}}>
    <Handle type="target" position={data.vertical ? Position.Top : Position.Left} />
    {data.kind === "domain" && <span aria-hidden="true">{data.icon}</span>}
    {data.label}
    <Handle type="source" position={data.vertical ? Position.Bottom : Position.Right} />
  </div>;
}
const nodeTypes = {atlas: AtlasNode};
const symbols = ["☾","✶","♆","⚙","✿","☉"];
const spokes = [[0,-155],[180,-80],[180,85],[0,155],[-180,85],[-180,-80]];

function makeGraph(domain, project, narrow) {
  const nodes = [], edges = [];
  const color = domain?.color || "#d7b77f";
  function node(id, label, x, y, kind, data = {}) {
    const vertical = narrow && Boolean(domain);
    const position = vertical ? {x:y,y:x*.57} : {x,y};
    nodes.push({id, type:"atlas", position, ariaLabel:label, draggable:false, data:{label,kind,color,vertical,...data}});
  }
  function edge(source, target, accent=color, relation=false) {
    edges.push({id:source+"-"+target, source,target, type:"smoothstep", style:{stroke:accent,strokeWidth:relation?1:1.5,strokeDasharray:relation?"3 5":undefined,opacity:relation?.44:.82}});
  }
  node("home","Project atlas",0,0,"origin");
  if (!domain) {
    topics.forEach((topic,i)=>{
      const id = "d"+i;
      const [x,y]=spokes[i];
      node(id,topic.name,narrow?x*.68:x,y,"domain",{topic,color:topic.color,icon:symbols[i]});
      edge("home",id,topic.color);
    });
    edge("d0","d2","#b7c9f7",true);
    edge("d1","d4","#9de0c2",true);
    edge("d3","d5","#efd49e",true);
    return {nodes,edges};
  }
  node("domain",domain.name,180,0,"domain",{topic:domain,icon:symbols[topics.indexOf(domain)]});
  edge("home","domain");
  const projects = project ? [project] : domain.projects;
  projects.forEach((item,i)=>{
    const id="p"+i;
    node(id,item[0],370,(i-(projects.length-1)/2)*110,"project",{project:item});
    edge("domain",id);
  });
  if (project) {
    (architecture[project[0]] || []).forEach(([label,body],i)=>{
      node("c"+i,label,530+i*145,narrow?(i%2)*100-50:(i%2)*64,"component",{component:[label,body]});
      edge(i===0?"p0":"c"+(i-1),"c"+i);
    });
  }
  return {nodes,edges};
}

function Atlas() {
  const [domain,setDomain] = useState(null);
  const [project,setProject] = useState(null);
  const [component,setComponent] = useState(null);
  const [narrow,setNarrow] = useState(()=>matchMedia("(max-width: 640px)").matches);
  const chart = useMemo(()=>makeGraph(domain,project,narrow),[domain,project,narrow]);
  const {fitView} = useReactFlow();
  useEffect(()=>{
    const query=matchMedia("(max-width: 640px)");
    const resize=event=>setNarrow(event.matches);
    query.addEventListener("change",resize);
    return ()=>query.removeEventListener("change",resize);
  },[]);
  useEffect(()=>{
    const frame=requestAnimationFrame(()=>{
      fitView({padding:.14,maxZoom:1.34,duration:matchMedia("(prefers-reduced-motion: reduce)").matches?0:320});
    });
    return ()=>cancelAnimationFrame(frame);
  },[chart,fitView]);
  function openDomain(topic) {
    setDomain(topic);
    setProject(null);
    setComponent(null);
  }
  function openProject(item) {
    setProject(item);
    setComponent(null);
  }
  function activate(_event,node) {
    if(node.data.component) setComponent(node.data.component);
    else if(node.data.project) openProject(node.data.project);
    else if(node.data.topic) openDomain(node.data.topic);
    else openDomain(null);
  }
  return <>
    <nav className="trail" aria-label="Graph level">
      <button onClick={()=>openDomain(null)} aria-current={!domain?"step":undefined}>All domains</button>
      {domain && <><span aria-hidden="true">/</span><button onClick={()=>openDomain(domain)} aria-current={!project?"step":undefined}>{domain.name}</button></>}
      {project && <><span aria-hidden="true">/</span><span aria-current="step">{project[0]}</span></>}
    </nav>
    <div className="atlas-layout">
      <div className="atlas-canvas" aria-label="Interactive project graph">
        <ReactFlow {...chart} nodeTypes={nodeTypes} nodeOrigin={[.5,.5]} onNodeClick={activate}
          onKeyDown={event=>{
            if (!["Enter"," "].includes(event.key)) return;
            const id=event.target.closest("[data-id]")?.dataset.id;
            const node=chart.nodes.find(item=>item.id===id);
            if(node){event.preventDefault();activate(event,node);}
          }}
          nodesConnectable={false} elementsSelectable={false} zoomOnScroll={false}
          minZoom={.25} maxZoom={2.5} fitView proOptions={{hideAttribution:false}}>
          <Background gap={24} color="#8a9cb861" />
          <Controls showInteractive={false} />
          <MiniMap nodeColor={n=>n.data.color} pannable zoomable />
        </ReactFlow>
      </div>
      <aside className="atlas-inspector" aria-label="Project details" style={{"--topic":domain?.color||"#dbc28a"}}>
        <div aria-live="polite">
          <h2>{component?.[0] || project?.[0] || domain?.name || "Pick a domain"}</h2>
          <p>{component?.[1] || project?.[1] || (domain ? "Pick a project to open its architecture." : "Drag to look around, use + or − to zoom, and follow a node to see what I built :)")}</p>
          {project && <>
            <p className="mono atlas-tech">{project[2]}</p>
            <div className="project-links">
              {project[5] && <a className="button" href={project[5]} target="_blank" rel="noopener noreferrer">Live demo</a>}
              {project[3] && <a className="underlink" href={"https://github.com/esh22nika/"+project[3]}>{project[4] || "Source on GitHub ↗"}</a>}
            </div>
          </>}
        </div>
        <div className="atlas-options" role="group" aria-label={project?"Architecture components":domain?"Projects":"Domains"}>
          {(project ? architecture[project[0]] || [] : domain?.projects || topics).map(item=><button key={item.name||item[0]} aria-pressed={project?component===item:undefined} onClick={()=>project?setComponent(item):domain?openProject(item):openDomain(item)}>{item.name||item[0]}</button>)}
        </div>
        {!domain && <p className="atlas-legend">Dotted connections show shared techniques across domains.</p>}
      </aside>
    </div>
  </>;
}
createRoot(document.querySelector("#atlas")).render(<ReactFlowProvider><Atlas /></ReactFlowProvider>);
