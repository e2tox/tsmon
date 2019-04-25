/* Copyright 2019 Ling Zhang

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

    http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License. */

import e from"chalk";const s=new Map,r=require.extensions[".js"],o=require("ora")("tsmon");process.on("message",function(r){if("cache"===r.type)Reflect.apply(s.set,s,r.value);else if("require"===r.type)setImmediate(()=>{require(r.value)}),process.send&&process.send({type:"required",value:r.value});else if("rs"===r.type)console.log(e.yellow("[ Unregistered ]")+e.white(" tsmon to restart at any time, enter 'rs' or 'kill'")),process.stdin.setEncoding("utf8"),process.stdin.on("readable",()=>{let e;for(;null!==(e=process.stdin.read());){const s=`${e}`.trim();if("rs"===s){process.kill(process.pid,"SIGUSR2"),process.stdin.removeAllListeners("readable"),process.removeAllListeners("message"),setTimeout(()=>{const e=process._getActiveHandles();for(const s of e)s.close&&s.close(),s.destroy&&s.destroy()},1e4).unref(),setTimeout(()=>{process.exit()},3e4).unref();break}"kill"===s?process.kill(process.pid,"SIGKILL"):"tap"===s&&process.kill(process.pid,"SIGUSR1")}});else if("progress"===r.type){const{method:e,options:s}=r.value;o[e](s)}}),[".ts",".tsx"].map(function(e){require.extensions[e]=function(e,o){const t=e._compile;return e._compile=function(e,r){const o=s.get(r);if(!o)throw new Error("File Not Found: "+r);return t.call(this,o,r)},r(e,o)}});
//# sourceMappingURL=index.mjs.map
