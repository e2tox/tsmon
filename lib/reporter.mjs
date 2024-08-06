import{clearInterval as s}from"timers";const t=80,i=["⠋","⠙","⠹","⠸","⠼","⠴","⠦","⠧","⠇","⠏"];class Loader{
constructor(){this.dots=i,this.interval=t,this.x=0}start(s){
this.end(),process.stdout.write(`\r[K${this.dots[this.x++]} ${s}`),this.x%=this.dots.length,
this.loader=setInterval((()=>{process.stdout.write(`\r[K${this.dots[this.x++]} ${s}`),this.x%=this.dots.length
}),this.interval)}end(){this.loader&&(s(this.loader),this.loader=null)}info(s){this.end(),
console.log("\r[K[34mℹ[0m "+s)}}let o;process.on("message",(function(s){if(s){if("report"===s.type){
const{method:t,options:i}=s.value;return o||(o=new Loader),void o[t](i)}console.log("Unsupported message type:",s.type)}
}));const e="reporter";export{e as name};
