"use strict";Object.defineProperty(exports,"t",{value:!0});const e=require("source-map");class InlineSourceMap{
constructor(e){this.sources=e,this.cache=new Map}getSourceMap(e){const r=this.sources.get(e);if(r){
const s=r.lastIndexOf("\n");if(s>0){const t=r.slice(s+1).slice(50),o=Buffer.from(t,"base64");return{url:e,
map:JSON.parse(o.toString())}}}return null}mapSourcePosition(r){let s=this.cache.get(r.source);if(!s){
const t=this.getSourceMap(r.source);t&&(s={url:t.url,map:new e.SourceMapConsumer(t.map)},this.cache.set(r.source,s))}
if(null!=s){const e=s.map.originalPositionFor(r);if(null!==e.source)return r.line=Number(e.line),
r.column=Number(e.column)+1,r}}patch(e){const r=e.toString();if(e.isNative())return r
;const s=e.getFileName()||e.getScriptNameOrSourceURL();if(s){const t=this.mapSourcePosition({source:s,
line:e.getLineNumber()||1,column:e.getColumnNumber()||1});if(t&&t.source===s){
const e=r.lastIndexOf(":"),s=r.lastIndexOf(":",e-1);if(s>0)return r.slice(0,s)+":"+t.line+":"+t.column+")"
;if(e>0)return r.slice(0,e)+":"+t.line+":"+t.column+")"}}return r}}const r=new Map,s=(e,s)=>{
const t=new InlineSourceMap(r),o=Reflect.getPrototypeOf(module)
;if(!o)return console.log("ERROR: not support node version"),void process.exit(2);const n=o._compile
;o._compile=function(e,s){const t=r.get(s);return t?n.call(this,t,s):n.call(this,e,s)};for(const e of s){
const r=require.extensions[e[0]];for(const s of e[1])require.extensions[s]=r}Error.prepareStackTrace=function(e,r){
return(e.name||"Error")+": "+(e.message||"")+r.map((e=>"\n    at "+t.patch(e))).join("")}},t=function(e){
if(e)switch(e.type){case"cache":return void Reflect.apply(r.set,r,e.value);case"require":return s.apply(global,e.value),
process.removeListener("message",t),process.send&&process.send({type:"requiring",value:e.value}),
void setImmediate((function(){process.argv[1]=e.value[0],require.apply(global,e.value),process.send&&process.send({
type:"required",value:e.value})}));default:return void console.log("WARN: Unsupported message type:",e.type)}}
;process.addListener("message",t),exports.name="tsmon";
