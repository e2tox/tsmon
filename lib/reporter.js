let e;
Object.defineProperty(exports, '__esModule', { value: !0 }),
  process.on('message', function(o) {
    if (o) {
      if ('report' === o.type) {
        const { method: r, options: t } = o.value;
        return e || (e = require('ora')()), void e[r](t);
      }
      console.log('Unsupported message type:', o.type);
    }
  }),
  (exports.name = 'reporter');
