// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles
parcelRequire = (function (modules, cache, entry, globalName) {
  // Save the require from previous bundle to this closure if any
  var previousRequire = typeof parcelRequire === 'function' && parcelRequire;
  var nodeRequire = typeof require === 'function' && require;

  function newRequire(name, jumped) {
    if (!cache[name]) {
      if (!modules[name]) {
        // if we cannot find the module within our internal map or
        // cache jump to the current global require ie. the last bundle
        // that was added to the page.
        var currentRequire = typeof parcelRequire === 'function' && parcelRequire;
        if (!jumped && currentRequire) {
          return currentRequire(name, true);
        }

        // If there are other bundles on this page the require from the
        // previous one is saved to 'previousRequire'. Repeat this as
        // many times as there are bundles until the module is found or
        // we exhaust the require chain.
        if (previousRequire) {
          return previousRequire(name, true);
        }

        // Try the node require function if it exists.
        if (nodeRequire && typeof name === 'string') {
          return nodeRequire(name);
        }

        var err = new Error('Cannot find module \'' + name + '\'');
        err.code = 'MODULE_NOT_FOUND';
        throw err;
      }

      localRequire.resolve = resolve;
      localRequire.cache = {};

      var module = cache[name] = new newRequire.Module(name);

      modules[name][0].call(module.exports, localRequire, module, module.exports, this);
    }

    return cache[name].exports;

    function localRequire(x){
      return newRequire(localRequire.resolve(x));
    }

    function resolve(x){
      return modules[name][1][x] || x;
    }
  }

  function Module(moduleName) {
    this.id = moduleName;
    this.bundle = newRequire;
    this.exports = {};
  }

  newRequire.isParcelRequire = true;
  newRequire.Module = Module;
  newRequire.modules = modules;
  newRequire.cache = cache;
  newRequire.parent = previousRequire;
  newRequire.register = function (id, exports) {
    modules[id] = [function (require, module) {
      module.exports = exports;
    }, {}];
  };

  var error;
  for (var i = 0; i < entry.length; i++) {
    try {
      newRequire(entry[i]);
    } catch (e) {
      // Save first error but execute all entries
      if (!error) {
        error = e;
      }
    }
  }

  if (entry.length) {
    // Expose entry point to Node, AMD or browser globals
    // Based on https://github.com/ForbesLindesay/umd/blob/master/template.js
    var mainExports = newRequire(entry[entry.length - 1]);

    // CommonJS
    if (typeof exports === "object" && typeof module !== "undefined") {
      module.exports = mainExports;

    // RequireJS
    } else if (typeof define === "function" && define.amd) {
     define(function () {
       return mainExports;
     });

    // <script>
    } else if (globalName) {
      this[globalName] = mainExports;
    }
  }

  // Override the current require with this new one
  parcelRequire = newRequire;

  if (error) {
    // throw error from earlier, _after updating parcelRequire_
    throw error;
  }

  return newRequire;
})({"../src/Data.ts":[function(require,module,exports) {
"use strict";

var __assign = this && this.__assign || function () {
  __assign = Object.assign || function (t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
      s = arguments[i];

      for (var p in s) {
        if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
      }
    }

    return t;
  };

  return __assign.apply(this, arguments);
};

Object.defineProperty(exports, "__esModule", {
  value: true
});

var Data =
/** @class */
function () {
  function Data(value) {
    var _this = this;

    this.listeners = [];

    this.notifyListeners = function () {
      _this.listeners.forEach(function (callback) {
        return callback();
      });
    };

    this.prev = __assign({}, value);
    this.state = new Proxy(value, {
      get: function get(target, prop) {
        return target[prop];
      },
      set: function set(target, prop, value) {
        var key = prop;
        if (value === target[key]) return true;
        _this.prev = __assign({}, target);
        target[key] = value;

        _this.notify();

        return true;
      }
    });
  }

  Data.prototype.get = function () {
    return this.state;
  };

  Data.prototype.getPrev = function () {
    return this.prev;
  };

  Data.prototype.set = function (value) {
    this.prev = __assign({}, this.state);
    this.state = value;
    this.notify();
  };

  Data.prototype.notify = function () {
    if (this.raf) cancelAnimationFrame(this.raf);
    this.raf = requestAnimationFrame(this.notifyListeners);
  };

  Data.prototype.subscribe = function (callback) {
    var _this = this;

    this.listeners.push(callback);
    return {
      unsubscribe: function unsubscribe() {
        _this.listeners = _this.listeners.filter(function (fn) {
          return fn !== callback;
        });
      }
    };
  };

  return Data;
}();

exports.default = Data;
},{}],"../src/utils.ts":[function(require,module,exports) {
"use strict";

var __importDefault = this && this.__importDefault || function (mod) {
  return mod && mod.__esModule ? mod : {
    "default": mod
  };
};

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.invariant = exports.query = exports.is = exports.toCamelCase = exports.toKebabCase = void 0;

var Data_1 = __importDefault(require("./Data"));

function toKebabCase(str) {
  return str.match(/[A-Z]{2,}(?=[A-Z][a-z]+[0-9]*|\b)|[A-Z]?[a-z]+[0-9]*|[A-Z]|[0-9]+/g).map(function (x) {
    return x.toLowerCase();
  }).join("-");
}

exports.toKebabCase = toKebabCase;

function toCamelCase(str) {
  return str.replace(/-./g, function (s) {
    return s.toUpperCase()[1];
  });
}

exports.toCamelCase = toCamelCase;
exports.is = {
  data: function data(val) {
    return val instanceof Data_1.default;
  },
  input: function input(el) {
    return el.nodeName === "INPUT";
  },
  obj: function obj(val) {
    return Object.prototype.toString.call(val) === "[object Object]";
  }
};

function query(selector) {
  return typeof selector === "string" ? document.querySelector(selector) : selector;
}

exports.query = query;

function invariant(cond, msg) {
  if (cond) throw msg;
}

exports.invariant = invariant;
},{"./Data":"../src/Data.ts"}],"../src/Controller.ts":[function(require,module,exports) {
"use strict";

var __assign = this && this.__assign || function () {
  __assign = Object.assign || function (t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
      s = arguments[i];

      for (var p in s) {
        if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
      }
    }

    return t;
  };

  return __assign.apply(this, arguments);
};

var __rest = this && this.__rest || function (s, e) {
  var t = {};

  for (var p in s) {
    if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0) t[p] = s[p];
  }

  if (s != null && typeof Object.getOwnPropertySymbols === "function") for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
    if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i])) t[p[i]] = s[p[i]];
  }
  return t;
};

Object.defineProperty(exports, "__esModule", {
  value: true
});

var utils_1 = require("./utils");

function get(value, key) {
  return utils_1.is.obj(value) ? value[key] : value;
}

function partition(_props) {
  var data = {};
  var props = {};
  var events = {};

  for (var key in _props) {
    var value = _props[key];

    if (key.startsWith("on")) {
      var eventName = key.substr(2).toLowerCase();
      events[eventName] = value;
    } else if (key.startsWith("data")) {
      data[utils_1.toKebabCase(key)] = value;
    } else {
      props[key] = value;
    }
  }

  return {
    data: data,
    props: props,
    events: events
  };
}

var Controller =
/** @class */
function () {
  function Controller(domNode, block) {
    var _this = this;

    this.domNode = domNode;
    this.block = block;
    this.subscriptions = [];

    this.observer = function (records) {
      for (var _i = 0, records_1 = records; _i < records_1.length; _i++) {
        var record = records_1[_i];
        record.removedNodes.forEach(function (node) {
          var _a, _b;

          if (node === _this.domNode) {
            (_b = (_a = _this.block).disconnected) === null || _b === void 0 ? void 0 : _b.call(_a);

            _this.destroy();
          }
        });
      }
    };
  }

  Controller.prototype.init = function () {
    var _a, _b;

    var props = this.block(this.getAttributes());
    this.partitions = partition(props);
    this.processPartitions();
    (_b = (_a = this.block).connected) === null || _b === void 0 ? void 0 : _b.call(_a);
    var mutation = new MutationObserver(this.observer);
    mutation.observe(this.domNode.parentNode, {
      childList: true
    });
  };

  Controller.prototype.getAttributes = function () {
    var props = {};
    var attrs = this.domNode.attributes;

    for (var i = 0; i < attrs.length; i++) {
      var _a = attrs[i],
          name = _a.name,
          value = _a.value;
      props[utils_1.toCamelCase(name)] = value;
    }

    return props;
  };

  Controller.prototype.setValue = function (value) {
    if (utils_1.is.input(this.domNode)) {
      this.domNode.value = value;
    } else {
      this.domNode.textContent = value;
    }
  };

  Controller.prototype.throwStateError = function (key, state) {
    utils_1.invariant(!utils_1.is.data(state), key + " value should be a state object");
  };

  Controller.prototype.processPartitions = function () {
    var _this = this;

    var _a = this.partitions,
        data = _a.data,
        props = _a.props,
        events = _a.events;

    var value = props.value,
        style = props.style,
        className = props.class,
        restProps = __rest(props, ["value", "style", "class"]);

    if (value) {
      var key_1 = value.key,
          state_1 = value.state;
      this.throwStateError(key_1, state_1);
      var subscription = state_1.subscribe(function () {
        _this.setValue(get(state_1.get(), key_1));
      });
      this.subscriptions.push(subscription);
    }

    if (className) {
      var key_2 = className.key,
          state_2 = className.state;
      this.throwStateError(key_2, state_2);
      var subscription = state_2.subscribe(function () {
        var value = get(state_2.get(), key_2);
        var prevValue = get(state_2.getPrev(), key_2);

        _this.domNode.classList.remove(prevValue);

        if (value) _this.domNode.classList.add(value);
      });
      this.subscriptions.push(subscription);
    }

    if (style) {
      var _loop_1 = function _loop_1(key) {
        var _a = style[key],
            _key = _a.key,
            state = _a.state;
        this_1.throwStateError(key, state);
        var subscription = state.subscribe(function () {
          var value = get(state.get(), _key);
          _this.domNode.style[key] = value;
        });
        this_1.subscriptions.push(subscription);
      };

      var this_1 = this;

      for (var key in style) {
        _loop_1(key);
      }
    }

    var _props = __assign(__assign({}, data), restProps);

    if (_props) {
      var _loop_2 = function _loop_2(key) {
        var _a = _props[key],
            _key = _a.key,
            state = _a.state;
        this_2.throwStateError(key, state);
        var subscription = state.subscribe(function () {
          var value = get(state.get(), _key);

          _this.domNode.setAttribute(key, value);
        });
        this_2.subscriptions.push(subscription);
      };

      var this_2 = this;

      for (var key in _props) {
        _loop_2(key);
      }
    }

    for (var key in events) {
      this.domNode.addEventListener(key, events[key]);
    }
  };

  Controller.prototype.destroy = function () {
    this.subscriptions.forEach(function (sub) {
      sub.unsubscribe();
    });
    this.partitions = null;
    this.subscriptions = null;
  };

  return Controller;
}();

exports.default = Controller;
},{"./utils":"../src/utils.ts"}],"../src/useData.ts":[function(require,module,exports) {
"use strict";

var __importDefault = this && this.__importDefault || function (mod) {
  return mod && mod.__esModule ? mod : {
    "default": mod
  };
};

Object.defineProperty(exports, "__esModule", {
  value: true
});

var Data_1 = __importDefault(require("./Data"));

function useData(state) {
  var get = {};
  var data = new Data_1.default(state);

  var _state = data.get();

  var forceUpdate = function forceUpdate() {
    for (var key in state) {
      _state[key] = _state[key];
    }
  };

  var map = function map(_a, callback) {
    var key = _a.key,
        state = _a.state;
    var fauxState = new Data_1.default(_state);
    Object.defineProperties(fauxState, {
      get: {
        value: function value() {
          return callback(state.get()[key]);
        }
      },
      getPrev: {
        value: function value() {
          return callback(state.getPrev()[key]);
        }
      }
    });
    state.subscribe(function () {
      fauxState.set(state.get());
    });
    return {
      key: key,
      state: fauxState
    };
  };

  for (var key in state) {
    Object.defineProperty(get, key, {
      value: {
        key: key,
        state: data
      },
      writable: false,
      enumerable: false,
      configurable: false
    });
  }

  return {
    get: get,
    map: map,
    data: data,
    state: _state,
    forceUpdate: forceUpdate
  };
}

exports.default = useData;
},{"./Data":"../src/Data.ts"}],"../src/index.ts":[function(require,module,exports) {
"use strict";

var __importDefault = this && this.__importDefault || function (mod) {
  return mod && mod.__esModule ? mod : {
    "default": mod
  };
};

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.useData = exports.map = exports.register = void 0;

var Controller_1 = __importDefault(require("./Controller"));

var utils_1 = require("./utils");

var useData_1 = __importDefault(require("./useData"));

exports.useData = useData_1.default;

function register(block, domNode) {
  var element = utils_1.query(domNode);
  utils_1.invariant(!element, "element with selector " + domNode + " not found");
  var controller = new Controller_1.default(element, block);
  controller.init();
}

exports.register = register;

function map(data) {}

exports.map = map;
},{"./Controller":"../src/Controller.ts","./utils":"../src/utils.ts","./useData":"../src/useData.ts"}],"index.ts":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var src_1 = require("../src");

var _a = src_1.useData({
  radius: 10
}),
    map = _a.map,
    state = _a.state,
    radius = _a.get.radius;

var Range = function Range() {
  return {
    onChange: function onChange(_a) {
      var target = _a.target;
      var value = target.value;
      state.radius = parseFloat(value);
    }
  };
};

var Circle = function Circle() {
  return {
    r: radius,
    style: {
      transform: map(radius, function (r) {
        return "translateX(" + r + "px)";
      })
    }
  };
};

var blocks = {
  circle: Circle,
  input: Range
};

for (var key in blocks) {
  src_1.register(blocks[key], key);
}
},{"../src":"../src/index.ts"}],"../../../../../AppData/Local/Yarn/Data/global/node_modules/parcel-bundler/src/builtins/hmr-runtime.js":[function(require,module,exports) {
var global = arguments[3];
var OVERLAY_ID = '__parcel__error__overlay__';
var OldModule = module.bundle.Module;

function Module(moduleName) {
  OldModule.call(this, moduleName);
  this.hot = {
    data: module.bundle.hotData,
    _acceptCallbacks: [],
    _disposeCallbacks: [],
    accept: function (fn) {
      this._acceptCallbacks.push(fn || function () {});
    },
    dispose: function (fn) {
      this._disposeCallbacks.push(fn);
    }
  };
  module.bundle.hotData = null;
}

module.bundle.Module = Module;
var checkedAssets, assetsToAccept;
var parent = module.bundle.parent;

if ((!parent || !parent.isParcelRequire) && typeof WebSocket !== 'undefined') {
  var hostname = "" || location.hostname;
  var protocol = location.protocol === 'https:' ? 'wss' : 'ws';
  var ws = new WebSocket(protocol + '://' + hostname + ':' + "60939" + '/');

  ws.onmessage = function (event) {
    checkedAssets = {};
    assetsToAccept = [];
    var data = JSON.parse(event.data);

    if (data.type === 'update') {
      var handled = false;
      data.assets.forEach(function (asset) {
        if (!asset.isNew) {
          var didAccept = hmrAcceptCheck(global.parcelRequire, asset.id);

          if (didAccept) {
            handled = true;
          }
        }
      }); // Enable HMR for CSS by default.

      handled = handled || data.assets.every(function (asset) {
        return asset.type === 'css' && asset.generated.js;
      });

      if (handled) {
        console.clear();
        data.assets.forEach(function (asset) {
          hmrApply(global.parcelRequire, asset);
        });
        assetsToAccept.forEach(function (v) {
          hmrAcceptRun(v[0], v[1]);
        });
      } else if (location.reload) {
        // `location` global exists in a web worker context but lacks `.reload()` function.
        location.reload();
      }
    }

    if (data.type === 'reload') {
      ws.close();

      ws.onclose = function () {
        location.reload();
      };
    }

    if (data.type === 'error-resolved') {
      console.log('[parcel] ✨ Error resolved');
      removeErrorOverlay();
    }

    if (data.type === 'error') {
      console.error('[parcel] 🚨  ' + data.error.message + '\n' + data.error.stack);
      removeErrorOverlay();
      var overlay = createErrorOverlay(data);
      document.body.appendChild(overlay);
    }
  };
}

function removeErrorOverlay() {
  var overlay = document.getElementById(OVERLAY_ID);

  if (overlay) {
    overlay.remove();
  }
}

function createErrorOverlay(data) {
  var overlay = document.createElement('div');
  overlay.id = OVERLAY_ID; // html encode message and stack trace

  var message = document.createElement('div');
  var stackTrace = document.createElement('pre');
  message.innerText = data.error.message;
  stackTrace.innerText = data.error.stack;
  overlay.innerHTML = '<div style="background: black; font-size: 16px; color: white; position: fixed; height: 100%; width: 100%; top: 0px; left: 0px; padding: 30px; opacity: 0.85; font-family: Menlo, Consolas, monospace; z-index: 9999;">' + '<span style="background: red; padding: 2px 4px; border-radius: 2px;">ERROR</span>' + '<span style="top: 2px; margin-left: 5px; position: relative;">🚨</span>' + '<div style="font-size: 18px; font-weight: bold; margin-top: 20px;">' + message.innerHTML + '</div>' + '<pre>' + stackTrace.innerHTML + '</pre>' + '</div>';
  return overlay;
}

function getParents(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return [];
  }

  var parents = [];
  var k, d, dep;

  for (k in modules) {
    for (d in modules[k][1]) {
      dep = modules[k][1][d];

      if (dep === id || Array.isArray(dep) && dep[dep.length - 1] === id) {
        parents.push(k);
      }
    }
  }

  if (bundle.parent) {
    parents = parents.concat(getParents(bundle.parent, id));
  }

  return parents;
}

function hmrApply(bundle, asset) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (modules[asset.id] || !bundle.parent) {
    var fn = new Function('require', 'module', 'exports', asset.generated.js);
    asset.isNew = !modules[asset.id];
    modules[asset.id] = [fn, asset.deps];
  } else if (bundle.parent) {
    hmrApply(bundle.parent, asset);
  }
}

function hmrAcceptCheck(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (!modules[id] && bundle.parent) {
    return hmrAcceptCheck(bundle.parent, id);
  }

  if (checkedAssets[id]) {
    return;
  }

  checkedAssets[id] = true;
  var cached = bundle.cache[id];
  assetsToAccept.push([bundle, id]);

  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    return true;
  }

  return getParents(global.parcelRequire, id).some(function (id) {
    return hmrAcceptCheck(global.parcelRequire, id);
  });
}

function hmrAcceptRun(bundle, id) {
  var cached = bundle.cache[id];
  bundle.hotData = {};

  if (cached) {
    cached.hot.data = bundle.hotData;
  }

  if (cached && cached.hot && cached.hot._disposeCallbacks.length) {
    cached.hot._disposeCallbacks.forEach(function (cb) {
      cb(bundle.hotData);
    });
  }

  delete bundle.cache[id];
  bundle(id);
  cached = bundle.cache[id];

  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    cached.hot._acceptCallbacks.forEach(function (cb) {
      cb();
    });

    return true;
  }
}
},{}]},{},["../../../../../AppData/Local/Yarn/Data/global/node_modules/parcel-bundler/src/builtins/hmr-runtime.js","index.ts"], null)
//# sourceMappingURL=/example.77de5100.js.map