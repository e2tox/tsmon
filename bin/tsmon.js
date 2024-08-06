#!/usr/bin/env node
"use strict"
;const t=require("path"),e=require("fs"),s=require("semver"),i=require("../lib/124246bb.chunk.js"),r=require("child_process"),n=require("events")
;function o(t){return t&&"object"==typeof t&&"default"in t?t:{default:t}}function c(t){if(t&&t.t)return t
;const e=Object.create(null);if(t)for(const s in t)if("default"!==s){const i=Object.getOwnPropertyDescriptor(t,s)
;Object.defineProperty(e,s,i.get?i:{enumerable:!0,get:function(){return t[s]}})}return e.default=t,Object.freeze(e)}
const u=o(t),a=c(t);function h(t){if(e.existsSync(t)){const s=e.statSync(t);if(s.isFile())return s.path=t,s}}
function l(e,s){if(!t.isAbsolute(e))return;let i=e+t.sep+1102;do{i=t.dirname(i);const e=h(t.join(i,s));if(e)return e
}while(i.length>1)}const p=new Map;class PackageFileReader{static ImportFromFile(r){try{const n=e.readFileSync(r,{
encoding:"utf8"}),o=JSON.parse(n);o.path=r
;for(const e of["main","typings","module"])o[e]&&(t.isAbsolute(o[e])||(o[e]=t.resolve(t.dirname(r),o[e])))
;if(o.engines&&o.engines.node&&!s.satisfies(process.version,o.engines.node)&&(console.log(i.Red(`You are using Node ${process.version}, but ${o.name}@${o.version} requires Node ${o.engines.node}.`)),
process.exit(1)),o.engines&&o.engines.typescript){const t=p.get("typescript")
;if(!t)return console.log(i.Red("ERROR: No typescript found. exiting...")),process.exit(1)
;s.satisfies(t.version,o.engines.typescript)||(console.log(i.Red(`You are using typescript ${t.version}, but ${o.name}@${o.version} requires typescript ${o.engines.typescript}.`)),
process.exit(1))}return p.set(o.name,o),o}catch(t){return}}static Get(t){return p.get(t)}}class PackageFileResolver{
static FromPath(t){const e=l(t,"package.json");if(e)return PackageFileReader.ImportFromFile(e.path)}
static FromName(e,s){const i=l(s,t.join("node_modules",e,"package.json"))
;if(i)return PackageFileReader.ImportFromFile(i.path);const r=require.resolve.paths(e);try{const t=require.resolve(e)
;if(t){const e=PackageFileResolver.FromPath(t);if(e)return e}}catch(t){}if(Array.isArray(r))for(const s of r){
const i=h(t.join(s,e,"package.json"));if(i)return PackageFileReader.ImportFromFile(i.path)}}}var f;!function(t){
t[t.New=0]="New",t[t.Starting=1]="Starting",t[t.Started=2]="Started",t[t.Stopping=3]="Stopping",t[t.Stopped=4]="Stopped"
}(f||(f={}));class Thread extends n.EventEmitter{get pid(){return this.handler.pid}constructor(t,e,s){super(),
this.state=f.New;const i=this.handler=r.fork(t,e,s),n=t=>{t?"requiring"===t.type?(this.state=f.Starting,
this.emit("starting")):"required"===t.type&&(this.state=f.Started,this.emit("started"),
this.handler.removeListener("message",n)):console.log("Invalid user application communication")};i.on("message",n),
i.once("error",(function(){console.log("User application error",arguments)})),i.once("exit",(t=>{
this.state!==f.Stopped&&(this.initialized=!0,this.state=f.Stopped,this.emit("stopped",t))})),i.unref()}send(t){
this.handler.send(t,(function(e){t&&"report"!==t.type&&e&&console.log("Unable to communicate with user application",e,t)
}))}cache(t){this.initialized=!0,this.send({type:"cache",value:t})}require(...t){this.initialized=!0,this.send({
type:"require",value:t})}report(t,e){this.send({type:"report",value:{method:t,options:e}})}kill(t){
return this.initialized=!0,this.state=f.Stopping,this.emit("stopping",t),this.handler.kill(t),!0}stop(t="SIGTERM"){
this.initialized=!0,this.state=f.Stopping,this.emit("stopping",t),this.handler.kill(t)}}class TypeScriptProgram{
constructor(e,s,i,r,n,o,c){this.tsc=e,this.runtimeFile=s,this.reportFile=i,this.entryFile=r,this.configFile=n,
this.execArgv=o,this.entryArgv=c,this.options={ignoreErrors:!1},this.commands=[],this.status=""
;const u=o.indexOf("--ignore-error");if(u>-1&&(this.options.ignoreErrors=!0,o.splice(u,1)),this.configDir=t.dirname(n),
this.cacheFile=this.entryFile+".tsmon",this.reporter=this.createReporter(),this.thread=this.create(),this.files=new Map,
this.jsMaps=[".ts"],
this.report("info","(1/3) Using: "+this.configFile),!this.tsc.findConfigFile(__dirname,this.tsc.sys.fileExists,"package.json"))throw new Error('Could not find "package.json"')
;this.sys=Object.assign({},this.tsc.sys,{writeFile:(t,e)=>{const s=t.slice(0,t.length-3)+".ts";this.files.set(s,e),
this.report("start","(3/3) Building..."+s)}}),this.setupRestartCommand()}setupRestartCommand(){
process.stdin.setEncoding("utf8"),process.stdin.on("readable",(()=>{let t;for(;null!=(t=process.stdin.read());){
const e=(""+t).trim()
;"rs"===e?this.start():"kill"===e?this.thread&&this.thread.initialized?this.kill():console.log(i.Yellow("[ Unregistered ]"),i.White("tsmon: no process to kill")):"debug"===e&&(this.thread&&this.thread.initialized?this.thread.kill("SIGUSR1"):console.log(i.Yellow("[ Unregistered ]"),i.White("tsmon: no process to debug")))
}})),process.stdin.on("end",(()=>{process.stdout.write("Console input stream end")}))}createReporter(){
if(this.reportFile)return new Thread(this.reportFile,this.entryArgv,{execArgv:this.execArgv,cwd:process.cwd(),
env:process.env})}create(){const t=new Thread(this.runtimeFile,this.entryArgv,{execArgv:this.execArgv,cwd:process.cwd(),
env:process.env}),e=t.pid;return t.on("started",(()=>{setTimeout((()=>{
console.log(i.Yellow("[ Unregistered ]"),i.White(`tsmon is happily serving ${this.files.size} files, enter "rs" or "kill ${e}" to restart`))
}),5),this.status="",this.next()})),t.on("stopping",(()=>{})),t.on("stopped",(t=>{
"kill"===this.status?(console.log(i.Yellow("[ Unregistered ]"),i.White(`tsmon: process ${e} killed`)),
this.commands.push("start")):"stop"!==this.status?(null!=t?console.log(i.Yellow("[ Unregistered ]"),i.White(`tsmon: process ${e} exit code ${t}, enter 'rs' to restart`)):console.log(i.Yellow("[ Unregistered ]"),i.White(`tsmon: process ${e} exited, enter 'rs' to restart`)),
15!==t&&null!==t||this.commands.push("start")):console.log(i.Yellow("[ Unregistered ]"),i.White(`tsmon: process ${e} exit code ${t}`)),
this.thread=void 0,this.status="",this.next()})),t}report(t,e){this.reporter&&this.reporter.report(t,e)}start(){
this.thread&&this.commands.push("stop"),this.commands.push("start"),this.status||this.next()}stop(){
this.thread&&this.commands.push("stop"),this.status||this.next()}kill(){this.thread&&this.commands.push("kill"),
this.status||this.next()}next(){if(this.status)throw new Error("InvalidStateForNext");if(this.commands.length){
const t=this.commands.shift();"start"===t?this.starting():"stop"===t?this.stopping():"kill"===t&&this.killing()}}
starting(){if(this.status)return;if(this.thread&&this.thread.initialized)return;this.status="start"
;const t=this.thread=this.thread||this.create();for(const e of this.files.entries())t.cache(e)
;t.require(this.entryFile,[[".js",this.jsMaps]])}stopping(){
this.status||(this.thread&&this.thread.initialized?(this.status="stop",this.thread.stop()):this.next())}killing(){
this.status||(this.thread&&this.thread.initialized?(this.status="kill",this.thread.kill("SIGKILL")):this.next())}}
function d(t){try{return e.statSync(t).isFile()}catch(t){return!1}}function g(t){if(e.existsSync(t))return require(t)}
function m(t){return t.substring(0,t.lastIndexOf("."))||t}function R(t){const e=t.indexOf("*")
;return t.substr(0,e).length}function k(e){
return"index"===e.type?t.dirname(e.path):"file"===e.type?e.path:"extension"===e.type?m(e.path):"package"===e.type?e.path:y(e.type)
}function y(t){throw new Error("Unknown type "+t)}function v(t,e){if(e.length<t.length)return;if("*"===t)return e
;const s=t.indexOf("*");if(-1===s)return;const i=t.substring(0,s),r=t.substring(s+1)
;return e.substr(0,s)===i&&e.substr(e.length-r.length)===r?e.substr(s,e.length-r.length):void 0}
function j(e,s,i=["main"],r=!0){const n=function(e,s,i){const r=Object.keys(s).concat().sort(((t,e)=>R(e)-R(t))),n=[]
;for(const i of r)n.push({pattern:i,paths:s[i].map((s=>t.join(e,s)))});return!s["*"]&&i&&n.push({pattern:"*",
paths:[e.replace(/\/$/,"")+"/*"]}),n}(e,s,r)
;return(t,e,s,r)=>function(t,e,s=g,i=d,r=Object.keys(require.extensions),n=["main"]){const o=function(t,e,s){
if(!e||!s||"."===s[0]||s[0]===u.default.sep)return;const i=[];for(const r of e){const e=r.pattern===s?"":v(r.pattern,s)
;if(void 0!==e)for(const s of r.paths){const r=s.replace("*",e);i.push({type:"file",path:r}),i.push(...t.map((t=>({
type:"extension",path:r+t})))),i.push({type:"package",path:u.default.join(r,"package.json")})
;const n=u.default.join(r,"index");i.push(...t.map((t=>({type:"index",path:n+t}))))}}return 0===i.length?void 0:i
}(r,t,e);if(o)return function(t,e=g,s,i=["main"]){
for(const r of t)if("file"===r.type||"extension"===r.type||"index"===r.type){if(s(r.path))return k(r)
}else if("package"===r.type){const t=e(r.path);if(t){const e=w(t,i,r.path,s);if(e)return m(e)}}else y(r.type)}(o,s,i,n)
}(n,t,e,s,r,i)}function w(t,e,s,i){for(let r=0;r<e.length;r++){const n=t[e[r]];if(n&&"string"==typeof n){
const t=a.join(a.dirname(s),n);if(i(t))return t}}}function $(t,e){return s=>{
const i=s.getCompilerOptions(),r=x(i.baseUrl)?a.join(t.inputDir,i.baseUrl||"."):i.baseUrl||".",n=[".ts",".js",".json",".node"],o=j(r,i.paths||{})
;return t=>function(t,e,s,i,r,n){
const o=t,{isExportDeclaration:c,isImportDeclaration:u,visitEachChild:h,visitNode:l}=n,{factory:p}=e
;return l(o,(t=>f(t))),t;function f(t){return null==t?[]:c(t)||u(t)?function(t){return!t.moduleSpecifier||function(t){
return!(!t.moduleSpecifier||!t.moduleSpecifier.getSourceFile())&&g(d(t.moduleSpecifier))}(t)?t:function(t,e){
if(!t.moduleSpecifier||!t.moduleSpecifier.getSourceFile())return t;const s=d(t.moduleSpecifier),n=i(s,void 0,void 0,r)
;if(!n)return t;const o=a.relative(e,n).replace(/\\/g,"/"),h=g(o)?o:"./"+o
;return u(t)?p.updateImportDeclaration(t,t.modifiers,t.importClause,p.createStringLiteral(h),t.attributes):c(t)?p.updateExportDeclaration(t,t.modifiers,t.isTypeOnly,t.exportClause,p.createStringLiteral(h),t.attributes):t
}(t,a.dirname(o.fileName))}(t):h(t,(t=>f(t)),e)}function d(t){
return t.getText().substr(t.getLeadingTriviaWidth(),t.getWidth()-2*t.getLeadingTriviaWidth())}function g(t){
return t.startsWith("./")||t.startsWith("../")}}(t,s,0,o,n,e)}}const x=t=>{if(!t)return!0
;const e="/"===t[0],s=new RegExp("^[A-Z]:/").test(t);return!(e||s)};class TypeScriptProgramWatcher{constructor(s,r){
this.tsc=s;const n={getCanonicalFileName:t=>t,getCurrentDirectory:s.sys.getCurrentDirectory,getNewLine:()=>s.sys.newLine
},o=s.createEmitAndSemanticDiagnosticsBuilderProgram;let c=0
;const u=this.hostOfConfigFile=s.createWatchCompilerHost(r.configFile,{noEmit:!1,newLine:s.NewLineKind.LineFeed,
sourceMap:!1,inlineSourceMap:!0,incremental:!0,declaration:!1,declarationMap:!1,tsBuildInfoFile:r.cacheFile
},r.sys,o,(t=>{c++,console.error("\r\n"+s.formatDiagnosticsWithColorAndContext([t],n))}),(t=>{
if(6031===t.code&&console.log(),6032===t.code&&r.stop(),6193===t.code||6194===t.code){let t=c;if(c=0,t){
const e=t>1?t+" errors":"1 error";r.options.ignoreErrors?(r.report("info","(3/3) Building...ignored "+e),
setTimeout((()=>{r.start()}),5)):(r.report("info","(3/3) Building...found "+e),setTimeout((()=>{
console.log(i.Yellow("[ Unregistered ]"),i.White("tsmon: modify source code or enter 'rs' to run"))}),5))
}else r.report("info","(3/3) Building...success"),setTimeout((()=>{r.start()}),5)}})),a=u.watchFile
;u.watchFile=(t,e,s)=>a(t,((t,s)=>(console.log(i.Yellow("[ Unregistered ]"),i.Yellow("tsmon: file changed: "+t)),
e(t,s))),s);const h=u.createProgram;u.createProgram=(...t)=>{r.report("start","(2/3) Initializing...")
;const e=Reflect.apply(h,u,t);return r.report("info","(2/3) Initializing...done"),e},u.useCaseSensitiveFileNames=()=>!0
;const l=u.afterProgramCreate;u.afterProgramCreate=t=>{r.report("start","(3/3) Building...")
;const e=t.getCompilerOptions();if(e.baseUrl&&e.paths&&Object.keys(e.paths)){const e={};e.before=[$({
inputDir:r.configDir},s)];const i=t.emit;t.emit=function(s,r,n,o,c){return c?((c.before||[]).concat(e.before||[]),
(c.after||[]).concat(e.after||[]),(c.afterDeclarations||[]).concat(e.afterDeclarations||[]),
Reflect.apply(i,t,[s,r,n,o,c])):Reflect.apply(i,t,[s,r,n,o,e])}}l(t)};const p=require(u.configFileName)
;if(Array.isArray(p.watch)&&this.tsc.sys.watchDirectory){const s=t.dirname(u.configFileName);for(const n of p.watch){
const o=t.join(s,n);e.watch(o,((e,n)=>{if(n){const e=t.join(s,n)
;console.log(i.Yellow("[ Unregistered ]"),i.Yellow("tsmon: watching folder changed: "+e)),r.start()}}))}}}watch(){
this.tsc.createWatchProgram(this.hostOfConfigFile)}}!function(){
const s=PackageFileResolver.FromName("typescript",__dirname)
;if(!s)return void console.log(i.Red("ERROR: No typescript runtime found. exiting..."))
;const r=PackageFileResolver.FromPath(function(){const{stackTraceLimit:t}=Error;Error.stackTraceLimit=2;const e={
stack:""};Error.captureStackTrace(e),Error.stackTraceLimit=t
;const s=e.stack.split("\n"),i=s[s.length-1],r=i.indexOf("("),n=i.lastIndexOf(")");let o
;o=r>0&&n>0?i.slice(r+1,n):i.slice(i.indexOf("at")+3);const c=o.lastIndexOf(":"),u=o.lastIndexOf(":",c-1)
;return o.slice(0,u)}());if(!r)return console.log(i.Red("ERROR: No package.json found. exiting...")),process.exit(1)
;const n=class ModuleLoader{static load(e){const s=e.main;return require(t.resolve(t.dirname(e.path),s))}
}.load(s),o=process.argv.findIndex((t=>t.endsWith(".ts")))
;if(-1===o)return console.log(i.Red("ERROR: No .ts file to run")),process.exit(1)
;const c=process.argv[o],u=o>2?process.argv.slice(2,o):[],a=process.argv.length>o+1?process.argv.slice(o+1):[];let h
;if(h=t.isAbsolute(c)?c:t.resolve(process.cwd(),c),!e.existsSync(h))return console.log(i.Red(`ERROR: ${h} not exists`)),
process.exit(1);if(!e.statSync(h).isFile())return console.log(i.Red(`ERROR: ${h} is not a file`)),process.exit(1)
;const p=class TSConfigResolver{static FromPath(t){const e=l(t,"tsconfig.json");if(e)return e.path}}.FromPath(h)
;if(!p)return console.log(i.Red("ERROR: No tsconfig.json found")),process.exit(1)
;const f=t.resolve(__dirname,"../lib/node.js")
;if(!n.sys.fileExists(f))return console.log(i.Red("ERROR: No typescript runtime found.")),process.exit(1)
;let d=t.resolve(__dirname,"../lib/reporter.js");n.sys.fileExists(d)||(d=void 0),
console.log(i.Yellow("[ Unregistered ]")+i.White(` ${r.name} v${r.version}, typescript v${s.version}, node ${process.version}`))
;const g=new TypeScriptProgram(n,f,d,h,p,u,a);new TypeScriptProgramWatcher(n,g).watch()}();
