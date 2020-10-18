# tsmon

[![LICENSE](https://img.shields.io/badge/license-Anti%20996-blue.svg)](https://unpkg.com/tsmon@0.7.2/LICENSE)

`tsmon` is a tool that helps develop typescript based applications by automatically transpile and restarting the process when file changes are detected.

## Installation

```bash
npm i -g tsmon
```

## Usage

```bash
tsmon [node arguments] your-app.ts [arguments...]
```

## How fast?

Reload typescript project with 456 ts files only took 1 sec.

![Super fast reload](https://raw.githubusercontent.com/agentframework/tsmon/master/reload-time.png)

## Examples

1. Just run the index.ts

```bash
tsmon index.ts
```

2. You want pass some parameter to your app

```bash
tsmon index.ts hello typescript 2019
```

3. You want debugging the process

```bash
tsmon --inspect index.ts
```

4. You want pass some parameter to your code and debug

```bash
tsmon --inspect index.ts hello world
```

5. You want ignore type check errors

```bash
tsmon --ignore-error index.ts
```

6. You want watch additional directory `conf`

```json
{
  "compilerOptions": {
    ...
  },
  "watch": ["conf"]
}
```

## Free version

- [x] Run .ts file with zero configuration
- [x] Incremental type check
- [x] Incremental transpile
- [x] Automatically reload on .ts / tsconfig.json changes
- [x] Gracefully shutdown running process
- [x] Support node arguments
- [x] Support additional command line arguments
- [x] Manual reload with 'rs' command
- [x] Output changed file name
- [x] Monitoring additional directories other than code files. ("watch":string[] in tsconfig.json)
- [x] License under [Anti 996](https://unpkg.com/tsmon@0.7.2/LICENSE)
- [x] Support path alias in tsconfig.json
- [x] Support source map
- [x] Add --ignore-error option to ignore type errors

## Professional version

- [ ] Build `.ts` file and output single `.d.ts`, `.js` or `.ts` file
- [ ] Seamless integrate with AgentFramework
- [ ] Support deno runtime
- [ ] High performance transpiler customized on top of esbuild
- [ ] Server mode - no animation and integrated with systemd
- [ ] Auto update and restart when remote repository changes

## License

Copyright 2020 Ling Zhang

Licensed under the "Anti 996", License Version 1.0 (Draft) (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

    https://unpkg.com/tsmon@0.7.2/LICENSE

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.
