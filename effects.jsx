import React, {useRef,useEffect} from "react";
import {createRoot} from "react-dom/client";
import {useReducedMotion} from "motion/react";
import ClickSpark from "./components/reactbits/ClickSpark";

function PointerEffects() {
  const sparks=useRef(null);
  const reduced=useReducedMotion();
  useEffect(()=>{
    const query=matchMedia("(pointer: fine)");
    const press=event=>{
      if(reduced || !query.matches || event.button!==0 || event.target.closest(".react-flow, input, textarea"))return;
      sparks.current?.spark(event.clientX,event.clientY);
    };
    document.addEventListener("pointerdown",press);
    return ()=>document.removeEventListener("pointerdown",press);
  },[reduced]);
  return <ClickSpark ref={sparks} disabled={!!reduced} shape="star" sparkCount={5} sparkColor={["#bdcfa8","#cfb7e5","#d4b46f"]} sparkRadius={25} sparkSize={8} duration={450} style={{position:"fixed",inset:0,zIndex:50,pointerEvents:"none"}} />;
}
const host=document.createElement("div");
host.setAttribute("aria-hidden","true");
document.body.append(host);
createRoot(host).render(<PointerEffects />);
