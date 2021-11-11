#!/usr/bin/env node
"use strict"
;const t=require("path"),e=require("fs"),s=require("semver"),i=require("chalk"),r=require("child_process"),n=require("events")
;function o(t){return t&&"object"==typeof t&&"default"in t?t:{default:t}}function c(t){if(t&&t.t)return t
;const e=Object.create(null);if(t)for(const s in t)if("default"!==s){const i=Object.getOwnPropertyDescriptor(t,s)
;Object.defineProperty(e,s,i.get?i:{enumerable:!0,get:function(){return t[s]}})}return e.default=t,Object.freeze(e)}
const u=o(t),a=c(t),h=o(i);function l(t){if(e.existsSync(t)){const s=e.statSync(t);if(s.isFile())return s.path=t,s}}
function f(e,s){if(!t.isAbsolute(e))return;let i=e+t.sep+1102;do{i=t.dirname(i);const e=l(t.join(i,s));if(e)return e
}while(i.length>1)}const p=new Map;class PackageFileReader{static ImportFromFile(i){try{const r=e.readFileSync(i,{
encoding:"utf8"}),n=JSON.parse(r);n.path=i
;for(const e of["main","typings","module"])n[e]&&(t.isAbsolute(n[e])||(n[e]=t.resolve(t.dirname(i),n[e])))
;if(n.engines&&n.engines.node&&!s.satisfies(process.version,n.engines.node)&&(console.log(h.default.red(`You are using Node ${process.version}, but ${n.name}@${n.version} requires Node ${n.engines.node}.`)),
process.exit(1)),n.engines&&n.engines.typescript){const t=p.get("typescript")
;if(!t)return console.log(h.default.red("ERROR: No typescript found. exiting...")),process.exit(1)
;s.satisfies(t.version,n.engines.typescript)||(console.log(h.default.red(`You are using typescript ${t.version}, but ${n.name}@${n.version} requires typescript ${n.engines.typescript}.`)),
process.exit(1))}return p.set(n.name,n),n}catch(t){return}}static Get(t){return p.get(t)}}class PackageFileResolver{
static FromPath(t){const e=f(t,"package.json");if(e)return PackageFileReader.ImportFromFile(e.path)}
static FromName(e,s){const i=f(s,t.join("node_modules",e,"package.json"))
;if(i)return PackageFileReader.ImportFromFile(i.path);const r=require.resolve.paths(e);try{const t=require.resolve(e)
;if(t){const e=PackageFileResolver.FromPath(t);if(e)return e}}catch(t){}if(Array.isArray(r))for(const s of r){
const i=l(t.join(s,e,"package.json"));if(i)return PackageFileReader.ImportFromFile(i.path)}}}var d;!function(t){
t[t.New=0]="New",t[t.Starting=1]="Starting",t[t.Started=2]="Started",t[t.Stopping=3]="Stopping",t[t.Stopped=4]="Stopped"
}(d||(d={}));class Thread extends n.EventEmitter{constructor(t,e,s){super(),this.state=d.New
;const i=this.handler=r.fork(t,e,s),n=t=>{t?"requiring"===t.type?(this.state=d.Starting,
this.emit("starting")):"required"===t.type&&(this.state=d.Started,this.emit("started"),
this.handler.removeListener("message",n)):console.log("Invalid user application communication")};i.on("message",n),
i.once("error",(function(){console.log("User application error",arguments)})),i.once("exit",(t=>{
this.state!==d.Stopped&&(this.initialized=!0,this.state=d.Stopped,this.emit("stopped",t))})),i.unref()}get pid(){
return this.handler.pid}send(t){this.handler.send(t,(function(e){
t&&"report"!==t.type&&e&&console.log("Unable to communicate with user application",e,t)}))}cache(t){this.initialized=!0,
this.send({type:"cache",value:t})}require(...t){this.initialized=!0,this.send({type:"require",value:t})}report(t,e){
this.send({type:"report",value:{method:t,options:e}})}kill(t){return this.initialized=!0,this.state=d.Stopping,
this.emit("stopping",t),this.handler.kill(t),!0}stop(t="SIGTERM"){this.initialized=!0,this.state=d.Stopping,
this.emit("stopping",t),this.handler.kill(t)}}class TypeScriptProgram{constructor(e,s,i,r,n,o,c){this.tsc=e,
this.runtimeFile=s,this.reportFile=i,this.entryFile=r,this.configFile=n,this.execArgv=o,this.entryArgv=c,this.options={
ignoreErrors:!1},this.commands=[],this.status="";const u=o.indexOf("--ignore-error")
;if(u>-1&&(this.options.ignoreErrors=!0,o.splice(u,1)),this.configDir=t.dirname(n),
this.cacheFile=this.entryFile+".tsmon",this.reporter=this.createReporter(),this.thread=this.create(),this.files=new Map,
this.jsMaps=[".ts"],
this.report("info","(1/3) Using: "+this.configFile),!this.tsc.findConfigFile(__dirname,this.tsc.sys.fileExists,"package.json"))throw new Error('Could not find "package.json"')
;this.sys=Object.assign({},this.tsc.sys,{writeFile:(t,e)=>{const s=t.slice(0,t.length-3)+".ts";this.files.set(s,e),
this.report("start","(3/3) Building..."+s)}}),this.setupRestartCommand()}setupRestartCommand(){
process.stdin.setEncoding("utf8"),process.stdin.on("readable",(()=>{let t;for(;null!=(t=process.stdin.read());){
const e=`${t}`.trim()
;"rs"===e?this.start():"kill"===e?this.thread&&this.thread.initialized?this.kill():console.log(h.default.yellow("[ Unregistered ]"),h.default.white("tsmon: no process to kill")):"debug"===e&&(this.thread&&this.thread.initialized?this.thread.kill("SIGUSR1"):console.log(h.default.yellow("[ Unregistered ]"),h.default.white("tsmon: no process to debug")))
}})),process.stdin.on("end",(()=>{process.stdout.write("Console input stream end")}))}createReporter(){
if(this.reportFile)return new Thread(this.reportFile,this.entryArgv,{execArgv:this.execArgv,cwd:process.cwd(),
env:process.env})}create(){const t=new Thread(this.runtimeFile,this.entryArgv,{execArgv:this.execArgv,cwd:process.cwd(),
env:process.env}),e=t.pid;return t.on("started",(()=>{setTimeout((()=>{
console.log(h.default.yellow("[ Unregistered ]"),h.default.white(`tsmon is happily serving ${this.files.size} files, enter "rs" or "kill ${e}" to restart`))
}),5),this.status="",this.next()})),t.on("stopping",(()=>{})),t.on("stopped",(t=>{
"kill"===this.status?(console.log(h.default.yellow("[ Unregistered ]"),h.default.white(`tsmon: process ${e} killed`)),
this.commands.push("start")):"stop"!==this.status?(null!=t?console.log(h.default.yellow("[ Unregistered ]"),h.default.white(`tsmon: process ${e} exit code ${t}, enter 'rs' to restart`)):console.log(h.default.yellow("[ Unregistered ]"),h.default.white(`tsmon: process ${e} exited, enter 'rs' to restart`)),
15!==t&&null!==t||this.commands.push("start")):console.log(h.default.yellow("[ Unregistered ]"),h.default.white(`tsmon: process ${e} exit code ${t}`)),
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
function g(t){try{return e.statSync(t).isFile()}catch(t){return!1}}function m(t){if(e.existsSync(t))return require(t)}
function R(t){return t.substring(0,t.lastIndexOf("."))||t}function k(t){const e=t.indexOf("*")
;return t.substr(0,e).length}function y(e){
return"index"===e.type?t.dirname(e.path):"file"===e.type?e.path:"extension"===e.type?R(e.path):"package"===e.type?e.path:v(e.type)
}function v(t){throw new Error(`Unknown type ${t}`)}function $(t,e){if(e.length<t.length)return;if("*"===t)return e
;const s=t.indexOf("*");if(-1===s)return;const i=t.substring(0,s),r=t.substring(s+1)
;return e.substr(0,s)===i&&e.substr(e.length-r.length)===r?e.substr(s,e.length-r.length):void 0}
function w(e,s,i=["main"],r=!0){const n=function(e,s,i){const r=Object.keys(s).concat().sort(((t,e)=>k(e)-k(t))),n=[]
;for(const i of r)n.push({pattern:i,paths:s[i].map((s=>t.join(e,s)))});return!s["*"]&&i&&n.push({pattern:"*",
paths:[`${e.replace(/\/$/,"")}/*`]}),n}(e,s,r)
;return(t,e,s,r)=>function(t,e,s=m,i=g,r=Object.keys(require.extensions),n=["main"]){const o=function(t,e,s){
if(!e||!s||"."===s[0]||s[0]===u.default.sep)return;const i=[];for(const r of e){const e=r.pattern===s?"":$(r.pattern,s)
;if(void 0!==e)for(const s of r.paths){const r=s.replace("*",e);i.push({type:"file",path:r}),i.push(...t.map((t=>({
type:"extension",path:r+t})))),i.push({type:"package",path:u.default.join(r,"package.json")})
;const n=u.default.join(r,"index");i.push(...t.map((t=>({type:"index",path:n+t}))))}}return 0===i.length?void 0:i
}(r,t,e);if(o)return function(t,e=m,s,i=["main"]){
for(const r of t)if("file"===r.type||"extension"===r.type||"index"===r.type){if(s(r.path))return y(r)
}else if("package"===r.type){const t=e(r.path);if(t){const e=j(t,i,r.path,s);if(e)return R(e)}}else v(r.type)}(o,s,i,n)
}(n,t,e,s,r,i)}function j(t,e,s,i){for(let r=0;r<e.length;r++){const n=t[e[r]];if(n&&"string"==typeof n){
const t=a.join(a.dirname(s),n);if(i(t))return t}}}function x(t,e){return s=>{
const i=s.getCompilerOptions(),r=E(i.baseUrl)?a.join(t.inputDir,i.baseUrl||"."):i.baseUrl||".",n=[".ts",".js",".json",".node"],o=w(r,i.paths||{})
;return t=>function(t,e,s,i,r,n){
const o=t,{isExportDeclaration:c,isImportDeclaration:u,visitEachChild:h,visitNode:l}=n,{factory:f}=e
;return l(o,(t=>p(t)));function p(t){if(null!=t)return c(t)||u(t)?function(t){return!t.moduleSpecifier||function(t){
return!(!t.moduleSpecifier||!t.moduleSpecifier.getSourceFile())&&g(d(t.moduleSpecifier))}(t)?t:function(t,e){
if(!t.moduleSpecifier||!t.moduleSpecifier.getSourceFile())return t;const s=d(t.moduleSpecifier),n=i(s,void 0,void 0,r)
;if(!n)return t;const o=a.relative(e,n).replace(/\\/g,"/"),h=g(o)?o:`./${o}`
;return u(t)?f.updateImportDeclaration(t,t.decorators,t.modifiers,t.importClause,f.createStringLiteral(h)):c(t)?f.updateExportDeclaration(t,t.decorators,t.modifiers,t.isTypeOnly,t.exportClause,f.createStringLiteral(h)):t
}(t,a.dirname(o.fileName))}(t):h(t,(t=>p(t)),e)}function d(t){
return t.getText().substr(t.getLeadingTriviaWidth(),t.getWidth()-2*t.getLeadingTriviaWidth())}function g(t){
return t.startsWith("./")||t.startsWith("../")}}(t,s,0,o,n,e)}}const E=t=>{if(!t)return!0
;const e="/"===t[0],s=new RegExp("^[A-Z]:/").test(t);return!(e||s)};class TypeScriptProgramWatcher{constructor(s,i){
this.tsc=s;const r={getCanonicalFileName:t=>t,getCurrentDirectory:s.sys.getCurrentDirectory,getNewLine:()=>s.sys.newLine
},n=s.createEmitAndSemanticDiagnosticsBuilderProgram;let o=0
;const c=this.hostOfConfigFile=s.createWatchCompilerHost(i.configFile,{noEmit:!1,newLine:s.NewLineKind.LineFeed,
sourceMap:!1,inlineSourceMap:!0,incremental:!0,declaration:!1,declarationMap:!1,tsBuildInfoFile:i.cacheFile
},i.sys,n,(t=>{o++,console.error("\r\n"+s.formatDiagnosticsWithColorAndContext([t],r))}),(t=>{
if(6031===t.code&&console.log(),6032===t.code&&i.stop(),6193===t.code||6194===t.code){let t=o;if(o=0,t){
const e=t>1?`${t} errors`:"1 error";i.options.ignoreErrors?(i.report("info","(3/3) Building...ignored "+e),
setTimeout((()=>{i.start()}),5)):(i.report("info","(3/3) Building...found "+e),setTimeout((()=>{
console.log(h.default.yellow("[ Unregistered ]"),h.default.white("tsmon: modify source code or enter 'rs' to run"))
}),5))}else i.report("info","(3/3) Building...success"),setTimeout((()=>{i.start()}),5)}})),u=c.watchFile
;c.watchFile=(t,e,s)=>u(t,((t,s)=>(console.log(h.default.yellow("[ Unregistered ]"),h.default.yellow(`tsmon: file changed: ${t}`)),
e(t,s))),s);const a=c.createProgram;c.createProgram=(...t)=>{i.report("start","(2/3) Initializing...")
;const e=Reflect.apply(a,c,t);return i.report("info","(2/3) Initializing...done"),e},c.useCaseSensitiveFileNames=()=>!0
;const l=c.afterProgramCreate;c.afterProgramCreate=t=>{i.report("start","(3/3) Building...")
;const e=t.getCompilerOptions();if(e.baseUrl&&e.paths&&Object.keys(e.paths)){const e={};e.before=[x({
inputDir:i.configDir},s)];const r=t.emit;t.emit=function(s,i,n,o,c){return c?((c.before||[]).concat(e.before||[]),
(c.after||[]).concat(e.after||[]),(c.afterDeclarations||[]).concat(e.afterDeclarations||[]),
Reflect.apply(r,t,[s,i,n,o,c])):Reflect.apply(r,t,[s,i,n,o,e])}}l(t)};const f=require(c.configFileName)
;if(Array.isArray(f.watch)&&this.tsc.sys.watchDirectory){const s=t.dirname(c.configFileName);for(const r of f.watch){
const n=t.join(s,r);e.watch(n,((e,r)=>{if(r){const e=t.join(s,r)
;console.log(h.default.yellow("[ Unregistered ]"),h.default.yellow(`tsmon: watching folder changed: ${e}`)),i.start()}
}))}}}watch(){this.tsc.createWatchProgram(this.hostOfConfigFile)}}!function(){
const s=PackageFileResolver.FromName("typescript",__dirname)
;if(!s)return void console.log(h.default.red("ERROR: No typescript runtime found. exiting..."))
;const i=PackageFileResolver.FromPath(function(){const{stackTraceLimit:t}=Error;Error.stackTraceLimit=2;const e={
stack:""};Error.captureStackTrace(e),Error.stackTraceLimit=t
;const s=e.stack.split("\n"),i=s[s.length-1],r=i.indexOf("("),n=i.lastIndexOf(")");let o
;o=r>0&&n>0?i.slice(r+1,n):i.slice(i.indexOf("at")+3);const c=o.lastIndexOf(":"),u=o.lastIndexOf(":",c-1)
;return o.slice(0,u)}());if(!i)return console.log(h.default.red("ERROR: No package.json found. exiting...")),
process.exit(1);const r=class ModuleLoader{static load(e){const s=e.main;return require(t.resolve(t.dirname(e.path),s))}
}.load(s),n=process.argv.findIndex((t=>t.endsWith(".ts")))
;if(-1===n)return console.log(h.default.red("ERROR: No .ts file to run")),process.exit(1)
;const o=process.argv[n],c=n>2?process.argv.slice(2,n):[],u=process.argv.length>n+1?process.argv.slice(n+1):[];let a
;if(a=t.isAbsolute(o)?o:t.resolve(process.cwd(),o),
!e.existsSync(a))return console.log(h.default.red(`ERROR: ${a} not exists`)),process.exit(1)
;if(!e.statSync(a).isFile())return console.log(h.default.red(`ERROR: ${a} is not a file`)),process.exit(1)
;const l=class TSConfigResolver{static FromPath(t){const e=f(t,"tsconfig.json");if(e)return e.path}}.FromPath(a)
;if(!l)return console.log(h.default.red("ERROR: No tsconfig.json found")),process.exit(1)
;const p=t.resolve(__dirname,"../lib/node.js")
;if(!r.sys.fileExists(p))return console.log(h.default.red("ERROR: No typescript runtime found.")),process.exit(1)
;let d=t.resolve(__dirname,"../lib/reporter.js");r.sys.fileExists(d)||(d=void 0),
console.log(h.default.yellow("[ Unregistered ]")+h.default.white(` ${i.name} v${i.version}, typescript v${s.version}, node ${process.version}`))
;const g=new TypeScriptProgram(r,p,d,a,l,c,u);new TypeScriptProgramWatcher(r,g).watch()}();
