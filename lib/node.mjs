import{SourceMapConsumer as e}from"source-map";class InlineSourceMap{constructor(e){this.sources=e,this.cache=new Map}
getSourceMap(e){const r=this.sources.get(e);if(r){const o=r.lastIndexOf("\n");if(o>0){
const s=r.slice(o+1).slice(50),t=Buffer.from(s,"base64");return{url:e,map:JSON.parse(t.toString())}}}return null}
mapSourcePosition(r){let o=this.cache.get(r.source);if(!o){const s=this.getSourceMap(r.source);s&&(o={url:s.url,
map:new e(s.map)},this.cache.set(r.source,o))}if(null!=o){const e=o.map.originalPositionFor(r)
;if(null!==e.source)return r.line=Number(e.line),r.column=Number(e.column)+1,r}}patch(e){const r=e.toString()
;if(e.isNative())return r;const o=e.getFileName()||e.getScriptNameOrSourceURL();if(o){const s=this.mapSourcePosition({
source:o,line:e.getLineNumber()||1,column:e.getColumnNumber()||1});if(s&&s.source===o){
const e=r.lastIndexOf(":"),o=r.lastIndexOf(":",e-1);if(o>0)return r.slice(0,o)+":"+s.line+":"+s.column+")"
;if(e>0)return r.slice(0,e)+":"+s.line+":"+s.column+")"}}return r}}const r=new Map,o=(e,o)=>{
const s=new InlineSourceMap(r),t=Reflect.getPrototypeOf(module)
;if(!t)return console.log("ERROR: not support node version"),void process.exit(2);const n=t._compile
;t._compile=function(e,o){const s=r.get(o);return s?n.call(this,s,o):n.call(this,e,o)};for(const e of o){
const r=require.extensions[e[0]];for(const o of e[1])require.extensions[o]=r}Error.prepareStackTrace=function(e,r){
return(e.name||"Error")+": "+(e.message||"")+r.map((e=>"\n    at "+s.patch(e))).join("")}},s=function(e){
if(e)switch(e.type){case"cache":return void Reflect.apply(r.set,r,e.value);case"require":return o.apply(global,e.value),
process.removeListener("message",s),process.send&&process.send({type:"requiring",value:e.value}),
void setImmediate((function(){process.argv[1]=e.value[0],require.apply(global,e.value),process.send&&process.send({
type:"required",value:e.value})}));default:return void console.log("WARN: Unsupported message type:",e.type)}}
;process.addListener("message",s);const t="tsmon";export{t as name};
