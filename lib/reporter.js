"use strict";Object.defineProperty(exports,"t",{value:!0})
;const s=require("timers"),t=require("./124246bb.chunk.js"),e=80,i=["⠋","⠙","⠹","⠸","⠼","⠴","⠦","⠧","⠇","⠏"]
;class Loader{constructor(){this.dots=i,this.interval=e,this.x=0}start(s){this.end(),
process.stdout.write(`\r[K${this.dots[this.x++]} ${s}`),this.x%=this.dots.length,this.loader=setInterval((()=>{
process.stdout.write(`\r[K${this.dots[this.x++]} ${s}`),this.x%=this.dots.length}),this.interval)}end(){
this.loader&&(s.clearInterval(this.loader),this.loader=null)}info(s){this.end(),console.log(`\r[K${t.Blue("ℹ")} ${s}`)}
}let r;process.on("message",(function(s){if(s){if("report"===s.type){const{method:t,options:e}=s.value
;return r||(r=new Loader),void r[t](e)}console.log("Unsupported message type:",s.type)}})),exports.name="reporter";
