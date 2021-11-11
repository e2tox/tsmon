"use strict";let e;Object.defineProperty(exports,"o",{value:!0}),process.on("message",(function(o){if(o){
if("report"===o.type){const{method:r,options:s}=o.value;return e||(e=require("ora")()),void e[r](s)}
console.log("Unsupported message type:",o.type)}})),exports.name="reporter";
