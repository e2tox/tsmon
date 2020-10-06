Object.defineProperty(exports, '__esModule', { value: !0 });
const e = require('source-map'),
  r = require.extensions['.js'],
  s = new Map(),
  n = new (class InlineSourceMap {
    constructor(e) {
      (this.sources = e), (this.maps = new Map());
    }
    getSourceMap(e) {
      const r = this.sources.get(e);
      if (r) {
        const s = r.lastIndexOf('\n');
        if (s > 0) {
          const n = r.slice(s + 1).slice(50),
            t = Buffer.from(n, 'base64');
          return { url: e, map: JSON.parse(t.toString()) };
        }
      }
      return null;
    }
    mapSourcePosition(r) {
      let s = this.maps.get(r.source);
      if (!s) {
        const n = this.getSourceMap(r.source);
        n && ((s = { url: n.url, map: new e.SourceMapConsumer(n.map) }), this.maps.set(r.source, s));
      }
      if (null != s) {
        const e = s.map.originalPositionFor(r);
        if (null !== e.source) return (r.line = Number(e.line)), (r.column = Number(e.column) + 1), r;
      }
    }
    patch(e) {
      const r = e.toString();
      if (e.isNative()) return r;
      const s = e.getFileName() || e.getScriptNameOrSourceURL();
      if (s) {
        const n = this.mapSourcePosition({
          source: s,
          line: e.getLineNumber() || 1,
          column: e.getColumnNumber() || 1
        });
        if (n && n.source === s) {
          const e = r.lastIndexOf(':'),
            s = r.lastIndexOf(':', e - 1);
          if (s > 0) return r.slice(0, s) + ':' + n.line + ':' + n.column + ')';
          if (e > 0) return r.slice(0, e) + ':' + n.line + ':' + n.column + ')';
        }
      }
      return r;
    }
  })(s);
Error.prepareStackTrace = function prepareStackTrace(e, r) {
  return (e.name || 'Error') + ': ' + (e.message || '') + r.map(e => '\n    at ' + n.patch(e)).join('');
};
const handleProcessMessage = function(e) {
  if (e)
    switch (e.type) {
      case 'cache':
        return void Reflect.apply(s.set, s, e.value);
      case 'require':
        return void setImmediate(function main() {
          !(function registerTypeScriptExtensions(e) {
            e.map(function(e) {
              require.extensions[e] = function(e, n) {
                const t = e._compile;
                return (
                  (e._compile = function(e, r) {
                    const n = s.get(r);
                    if (!n) throw new Error('File not found: ' + r);
                    return t.call(this, n, r);
                  }),
                  r(e, n)
                );
              };
            });
          })(['.ts']),
            process.removeListener('message', handleProcessMessage),
            process.send && process.send({ type: 'requiring', value: e.value }),
            (process.argv[1] = e.value),
            require(e.value),
            process.send && process.send({ type: 'required', value: e.value });
        });
      default:
        return void console.log('Unsupported message type:', e.type);
    }
};
process.on('message', handleProcessMessage), (exports.name = 'tsmon');
