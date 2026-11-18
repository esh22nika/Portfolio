import {build} from "esbuild";
const common={bundle:true,minify:true,legalComments:"linked",jsx:"automatic"};
await build({...common,entryPoints:["graph.jsx"],outfile:"dist/atlas.js"});
await build({...common,entryPoints:["homepage.jsx"],outfile:"dist/homepage.js"});
await build({...common,entryPoints:["effects.jsx"],outfile:"dist/effects.js"});

