Object.defineProperty(exports,"__esModule",{value:!0});const e=require("source-map");class InlineSourceMap{
constructor(e){this.sources=e,this.cache=new Map}getSourceMap(e){const r=this.sources.get(e);if(r){
const s=r.lastIndexOf("\n");if(s>0){const t=r.slice(s+1).slice(50),n=Buffer.from(t,"base64");return{url:e,
map:JSON.parse(n.toString())}}}return null}mapSourcePosition(r){let s=this.cache.get(r.source);if(!s){
const t=this.getSourceMap(r.source);t&&(s={url:t.url,map:new e.SourceMapConsumer(t.map)},this.cache.set(r.source,s))}
if(null!=s){const e=s.map.originalPositionFor(r);if(null!==e.source)return r.line=Number(e.line),
r.column=Number(e.column)+1,r}}patch(e){const r=e.toString();if(e.isNative())return r
;const s=e.getFileName()||e.getScriptNameOrSourceURL();if(s){const t=this.mapSourcePosition({source:s,
line:e.getLineNumber()||1,column:e.getColumnNumber()||1});if(t&&t.source===s){
const e=r.lastIndexOf(":"),s=r.lastIndexOf(":",e-1);if(s>0)return r.slice(0,s)+":"+t.line+":"+t.column+")"
;if(e>0)return r.slice(0,e)+":"+t.line+":"+t.column+")"}}return r}}const r=new Map,install=(...e)=>{
const s=new InlineSourceMap(r),t=Reflect.getPrototypeOf(module),n=t._compile;t._compile=function(e,s){const t=r.get(s)
;return t?n.call(this,t,s):n.call(this,e,s)};const o=require.extensions[".js"];e.map((function(e){
require.extensions[e]=o})),Error.prepareStackTrace=function prepareStackTrace(e,r){
return(e.name||"Error")+": "+(e.message||"")+r.map((e=>"\n    at "+s.patch(e))).join("")}
},handleProcessMessage=function(e){if(e)switch(e.type){case"cache":return void Reflect.apply(r.set,r,e.value)
;case"require":return install(".ts"),process.removeListener("message",handleProcessMessage),process.send&&process.send({
type:"requiring",value:e.value}),void setImmediate((function(){process.argv[1]=e.value,require(e.value),
process.send&&process.send({type:"required",value:e.value})}));default:
return void console.log("WARN: Unsupported message type:",e.type)}};process.addListener("message",handleProcessMessage),
exports.name="tsmon";
