# tsmon

`tsmon` is a tool that helps develop typescript based applications by automatically transpile and restarting the process when file changes are detected.

## Installation

```bash
npm i -g tsmon
```

## Usage

```bash
tsmon [node arguments] your-app.ts [arguments...]
```

## Examples

Example 1. Just run the index.ts

```bash
tsmon index.ts
```

Example 2. You want pass some parameter to your app

```bash
tsmon index.ts hello typescript 2019
```

Example 3. You want debugging the process

```bash
tsmon --inspect index.ts
```

Example 4. You want pass some parameter to your code and debug

```bash
tsmon --inspect index.ts hello world
```

## Roadmap
- [x] Incremental type check
- [x] Incremental transpile
- [x] Automatically reload on .ts / tsconfig.json changes
- [x] Gracefully shutdown running process
- [x] Support node arguments
- [x] Support additional command line arguments
- [x] Manual reload with 'rs' command
- [ ] Monitoring additional directories other than code files
- [ ] Server mode - turn off all visual effects and integrated with systemd
- [ ] Add option to use [deno](https://github.com/denoland/deno) runtime

## Access Source Code

This is a [Source-available Software](https://en.wikipedia.org/wiki/Source-available_software). But you still can get the transpiled js file from [unpkg.com](https://unpkg.com/tsmon@0.2.1/bin/standalone). The typescript source code is only available to our commercial subscription users.

## License

Copyright 2019 Ling Zhang

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

    http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.
