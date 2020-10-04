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
})({"../node_modules/tslib/tslib.es6.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.__extends = __extends;
exports.__rest = __rest;
exports.__decorate = __decorate;
exports.__param = __param;
exports.__metadata = __metadata;
exports.__awaiter = __awaiter;
exports.__generator = __generator;
exports.__exportStar = __exportStar;
exports.__values = __values;
exports.__read = __read;
exports.__spread = __spread;
exports.__spreadArrays = __spreadArrays;
exports.__await = __await;
exports.__asyncGenerator = __asyncGenerator;
exports.__asyncDelegator = __asyncDelegator;
exports.__asyncValues = __asyncValues;
exports.__makeTemplateObject = __makeTemplateObject;
exports.__importStar = __importStar;
exports.__importDefault = __importDefault;
exports.__classPrivateFieldGet = __classPrivateFieldGet;
exports.__classPrivateFieldSet = __classPrivateFieldSet;
exports.__createBinding = exports.__assign = void 0;

/*! *****************************************************************************
Copyright (c) Microsoft Corporation.

Permission to use, copy, modify, and/or distribute this software for any
purpose with or without fee is hereby granted.

THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
PERFORMANCE OF THIS SOFTWARE.
***************************************************************************** */

/* global Reflect, Promise */
var extendStatics = function (d, b) {
  extendStatics = Object.setPrototypeOf || {
    __proto__: []
  } instanceof Array && function (d, b) {
    d.__proto__ = b;
  } || function (d, b) {
    for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p];
  };

  return extendStatics(d, b);
};

function __extends(d, b) {
  extendStatics(d, b);

  function __() {
    this.constructor = d;
  }

  d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
}

var __assign = function () {
  exports.__assign = __assign = Object.assign || function __assign(t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
      s = arguments[i];

      for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
    }

    return t;
  };

  return __assign.apply(this, arguments);
};

exports.__assign = __assign;

function __rest(s, e) {
  var t = {};

  for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0) t[p] = s[p];

  if (s != null && typeof Object.getOwnPropertySymbols === "function") for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
    if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i])) t[p[i]] = s[p[i]];
  }
  return t;
}

function __decorate(decorators, target, key, desc) {
  var c = arguments.length,
      r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc,
      d;
  if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
  return c > 3 && r && Object.defineProperty(target, key, r), r;
}

function __param(paramIndex, decorator) {
  return function (target, key) {
    decorator(target, key, paramIndex);
  };
}

function __metadata(metadataKey, metadataValue) {
  if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(metadataKey, metadataValue);
}

function __awaiter(thisArg, _arguments, P, generator) {
  function adopt(value) {
    return value instanceof P ? value : new P(function (resolve) {
      resolve(value);
    });
  }

  return new (P || (P = Promise))(function (resolve, reject) {
    function fulfilled(value) {
      try {
        step(generator.next(value));
      } catch (e) {
        reject(e);
      }
    }

    function rejected(value) {
      try {
        step(generator["throw"](value));
      } catch (e) {
        reject(e);
      }
    }

    function step(result) {
      result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected);
    }

    step((generator = generator.apply(thisArg, _arguments || [])).next());
  });
}

function __generator(thisArg, body) {
  var _ = {
    label: 0,
    sent: function () {
      if (t[0] & 1) throw t[1];
      return t[1];
    },
    trys: [],
    ops: []
  },
      f,
      y,
      t,
      g;
  return g = {
    next: verb(0),
    "throw": verb(1),
    "return": verb(2)
  }, typeof Symbol === "function" && (g[Symbol.iterator] = function () {
    return this;
  }), g;

  function verb(n) {
    return function (v) {
      return step([n, v]);
    };
  }

  function step(op) {
    if (f) throw new TypeError("Generator is already executing.");

    while (_) try {
      if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
      if (y = 0, t) op = [op[0] & 2, t.value];

      switch (op[0]) {
        case 0:
        case 1:
          t = op;
          break;

        case 4:
          _.label++;
          return {
            value: op[1],
            done: false
          };

        case 5:
          _.label++;
          y = op[1];
          op = [0];
          continue;

        case 7:
          op = _.ops.pop();

          _.trys.pop();

          continue;

        default:
          if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) {
            _ = 0;
            continue;
          }

          if (op[0] === 3 && (!t || op[1] > t[0] && op[1] < t[3])) {
            _.label = op[1];
            break;
          }

          if (op[0] === 6 && _.label < t[1]) {
            _.label = t[1];
            t = op;
            break;
          }

          if (t && _.label < t[2]) {
            _.label = t[2];

            _.ops.push(op);

            break;
          }

          if (t[2]) _.ops.pop();

          _.trys.pop();

          continue;
      }

      op = body.call(thisArg, _);
    } catch (e) {
      op = [6, e];
      y = 0;
    } finally {
      f = t = 0;
    }

    if (op[0] & 5) throw op[1];
    return {
      value: op[0] ? op[1] : void 0,
      done: true
    };
  }
}

var __createBinding = Object.create ? function (o, m, k, k2) {
  if (k2 === undefined) k2 = k;
  Object.defineProperty(o, k2, {
    enumerable: true,
    get: function () {
      return m[k];
    }
  });
} : function (o, m, k, k2) {
  if (k2 === undefined) k2 = k;
  o[k2] = m[k];
};

exports.__createBinding = __createBinding;

function __exportStar(m, o) {
  for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(o, p)) __createBinding(o, m, p);
}

function __values(o) {
  var s = typeof Symbol === "function" && Symbol.iterator,
      m = s && o[s],
      i = 0;
  if (m) return m.call(o);
  if (o && typeof o.length === "number") return {
    next: function () {
      if (o && i >= o.length) o = void 0;
      return {
        value: o && o[i++],
        done: !o
      };
    }
  };
  throw new TypeError(s ? "Object is not iterable." : "Symbol.iterator is not defined.");
}

function __read(o, n) {
  var m = typeof Symbol === "function" && o[Symbol.iterator];
  if (!m) return o;
  var i = m.call(o),
      r,
      ar = [],
      e;

  try {
    while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar.push(r.value);
  } catch (error) {
    e = {
      error: error
    };
  } finally {
    try {
      if (r && !r.done && (m = i["return"])) m.call(i);
    } finally {
      if (e) throw e.error;
    }
  }

  return ar;
}

function __spread() {
  for (var ar = [], i = 0; i < arguments.length; i++) ar = ar.concat(__read(arguments[i]));

  return ar;
}

function __spreadArrays() {
  for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;

  for (var r = Array(s), k = 0, i = 0; i < il; i++) for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++) r[k] = a[j];

  return r;
}

;

function __await(v) {
  return this instanceof __await ? (this.v = v, this) : new __await(v);
}

function __asyncGenerator(thisArg, _arguments, generator) {
  if (!Symbol.asyncIterator) throw new TypeError("Symbol.asyncIterator is not defined.");
  var g = generator.apply(thisArg, _arguments || []),
      i,
      q = [];
  return i = {}, verb("next"), verb("throw"), verb("return"), i[Symbol.asyncIterator] = function () {
    return this;
  }, i;

  function verb(n) {
    if (g[n]) i[n] = function (v) {
      return new Promise(function (a, b) {
        q.push([n, v, a, b]) > 1 || resume(n, v);
      });
    };
  }

  function resume(n, v) {
    try {
      step(g[n](v));
    } catch (e) {
      settle(q[0][3], e);
    }
  }

  function step(r) {
    r.value instanceof __await ? Promise.resolve(r.value.v).then(fulfill, reject) : settle(q[0][2], r);
  }

  function fulfill(value) {
    resume("next", value);
  }

  function reject(value) {
    resume("throw", value);
  }

  function settle(f, v) {
    if (f(v), q.shift(), q.length) resume(q[0][0], q[0][1]);
  }
}

function __asyncDelegator(o) {
  var i, p;
  return i = {}, verb("next"), verb("throw", function (e) {
    throw e;
  }), verb("return"), i[Symbol.iterator] = function () {
    return this;
  }, i;

  function verb(n, f) {
    i[n] = o[n] ? function (v) {
      return (p = !p) ? {
        value: __await(o[n](v)),
        done: n === "return"
      } : f ? f(v) : v;
    } : f;
  }
}

function __asyncValues(o) {
  if (!Symbol.asyncIterator) throw new TypeError("Symbol.asyncIterator is not defined.");
  var m = o[Symbol.asyncIterator],
      i;
  return m ? m.call(o) : (o = typeof __values === "function" ? __values(o) : o[Symbol.iterator](), i = {}, verb("next"), verb("throw"), verb("return"), i[Symbol.asyncIterator] = function () {
    return this;
  }, i);

  function verb(n) {
    i[n] = o[n] && function (v) {
      return new Promise(function (resolve, reject) {
        v = o[n](v), settle(resolve, reject, v.done, v.value);
      });
    };
  }

  function settle(resolve, reject, d, v) {
    Promise.resolve(v).then(function (v) {
      resolve({
        value: v,
        done: d
      });
    }, reject);
  }
}

function __makeTemplateObject(cooked, raw) {
  if (Object.defineProperty) {
    Object.defineProperty(cooked, "raw", {
      value: raw
    });
  } else {
    cooked.raw = raw;
  }

  return cooked;
}

;

var __setModuleDefault = Object.create ? function (o, v) {
  Object.defineProperty(o, "default", {
    enumerable: true,
    value: v
  });
} : function (o, v) {
  o["default"] = v;
};

function __importStar(mod) {
  if (mod && mod.__esModule) return mod;
  var result = {};
  if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);

  __setModuleDefault(result, mod);

  return result;
}

function __importDefault(mod) {
  return mod && mod.__esModule ? mod : {
    default: mod
  };
}

function __classPrivateFieldGet(receiver, privateMap) {
  if (!privateMap.has(receiver)) {
    throw new TypeError("attempted to get private field on non-instance");
  }

  return privateMap.get(receiver);
}

function __classPrivateFieldSet(receiver, privateMap, value) {
  if (!privateMap.has(receiver)) {
    throw new TypeError("attempted to set private field on non-instance");
  }

  privateMap.set(receiver, value);
  return value;
}
},{}],"../src/Data.ts":[function(require,module,exports) {
"use strict";

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

Object.defineProperty(exports, "__esModule", {
  value: true
});

var Data = /*#__PURE__*/function () {
  function Data(value) {
    var _this = this;

    _classCallCheck(this, Data);

    this.listeners = [];

    this.notifyListeners = function () {
      _this.listeners.forEach(function (callback) {
        return callback();
      });
    };

    this.prev = Object.assign({}, value);
    this.state = new Proxy(value, {
      get: function get(target, prop) {
        return target[prop];
      },
      set: function set(target, prop, value) {
        var key = prop;
        if (value === target[key]) return true;
        _this.prev = Object.assign({}, target);
        target[key] = value;

        _this.notify();

        return true;
      }
    });
  }

  _createClass(Data, [{
    key: "get",
    value: function get() {
      return this.state;
    }
  }, {
    key: "getPrev",
    value: function getPrev() {
      return this.prev;
    }
  }, {
    key: "set",
    value: function set(value) {
      this.prev = Object.assign({}, this.state);
      this.state = value;
      this.notify();
    }
  }, {
    key: "notify",
    value: function notify() {
      if (this.raf) cancelAnimationFrame(this.raf);
      this.raf = requestAnimationFrame(this.notifyListeners);
    }
  }, {
    key: "subscribe",
    value: function subscribe(callback) {
      var _this2 = this;

      this.listeners.push(callback);
      return {
        unsubscribe: function unsubscribe() {
          _this2.listeners = _this2.listeners.filter(function (fn) {
            return fn !== callback;
          });
        }
      };
    }
  }]);

  return Data;
}();

exports.default = Data;
},{}],"../src/utils.ts":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.watch = exports.throwError = exports.queryAll = exports.query = exports.is = exports.toCamelCase = exports.toKebabCase = void 0;

var tslib_1 = require("tslib");

var Data_1 = tslib_1.__importDefault(require("./Data"));

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

function queryAll(selector) {
  return Array.from(document.querySelectorAll(selector));
}

exports.queryAll = queryAll;

function throwError(cond, msg) {
  if (cond) throw msg;
}

exports.throwError = throwError;

function watch(_ref, callback) {
  var key = _ref.key,
      state = _ref.state;
  state.subscribe(function () {
    var value = state.get()[key];
    var prevValue = state.getPrev()[key];
    if (value !== prevValue) callback();
  });
}

exports.watch = watch;
},{"tslib":"../node_modules/tslib/tslib.es6.js","./Data":"../src/Data.ts"}],"../src/Controller.ts":[function(require,module,exports) {
"use strict";

function _createForOfIteratorHelper(o) { if (typeof Symbol === "undefined" || o[Symbol.iterator] == null) { if (Array.isArray(o) || (o = _unsupportedIterableToArray(o))) { var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var it, normalCompletion = true, didErr = false, err; return { s: function s() { it = o[Symbol.iterator](); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it.return != null) it.return(); } finally { if (didErr) throw err; } } }; }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

Object.defineProperty(exports, "__esModule", {
  value: true
});

var tslib_1 = require("tslib");

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

var Controller = /*#__PURE__*/function () {
  function Controller(domNode, block) {
    var _this = this;

    _classCallCheck(this, Controller);

    this.domNode = domNode;
    this.block = block;
    this.subscriptions = [];

    this.observer = function (records) {
      var _iterator = _createForOfIteratorHelper(records),
          _step;

      try {
        for (_iterator.s(); !(_step = _iterator.n()).done;) {
          var record = _step.value;
          record.removedNodes.forEach(function (node) {
            if (node === _this.domNode) {
              _this.destroy();
            }
          });
        }
      } catch (err) {
        _iterator.e(err);
      } finally {
        _iterator.f();
      }
    };
  }

  _createClass(Controller, [{
    key: "getAttributes",
    value: function getAttributes() {
      var props = {};
      var attrs = this.domNode.attributes;

      for (var i = 0; i < attrs.length; i++) {
        var _attrs$i = attrs[i],
            name = _attrs$i.name,
            value = _attrs$i.value;
        props[utils_1.toCamelCase(name)] = value;
      }

      return props;
    }
  }, {
    key: "processPartitions",
    value: function processPartitions() {
      var _this2 = this;

      var _a;

      var _ref = (_a = this.partitions) !== null && _a !== void 0 ? _a : {},
          data = _ref.data,
          props = _ref.props,
          events = _ref.events;

      var _b = props !== null && props !== void 0 ? props : {},
          value = _b.value,
          style = _b.style,
          className = _b.class,
          restProps = tslib_1.__rest(_b, ["value", "style", "class"]);

      if (value) {
        var key = value.key,
            state = value.state;
        this.throwStateError(key, state);
        var subscription = state.subscribe(function () {
          _this2.setValue(get(state.get(), key));
        });
        this.subscriptions.push(subscription);
      }

      if (className) {
        var _key2 = className.key,
            _state = className.state;
        this.throwStateError(_key2, _state);

        var _subscription = _state.subscribe(function () {
          var value = get(_state.get(), _key2);
          var prevValue = get(_state.getPrev(), _key2);

          _this2.domNode.classList.remove(prevValue);

          if (value) _this2.domNode.classList.add(value);
        });

        this.subscriptions.push(_subscription);
      }

      if (style) {
        var _loop = function _loop(_key3) {
          var _style$_key = style[_key3],
              _key = _style$_key.key,
              state = _style$_key.state;

          _this2.throwStateError(_key3, state);

          var subscription = state.subscribe(function () {
            var value = get(state.get(), _key);
            _this2.domNode.style[_key3] = value;
          });

          _this2.subscriptions.push(subscription);
        };

        for (var _key3 in style) {
          _loop(_key3);
        }
      }

      var _props = Object.assign(Object.assign({}, data), restProps);

      if (_props) {
        var _loop2 = function _loop2(_key4) {
          var _props$_key = _props[_key4],
              _key = _props$_key.key,
              state = _props$_key.state;

          _this2.throwStateError(_key4, state);

          var subscription = state.subscribe(function () {
            var value = get(state.get(), _key);

            _this2.domNode.setAttribute(_key4, value);
          });

          _this2.subscriptions.push(subscription);
        };

        for (var _key4 in _props) {
          _loop2(_key4);
        }
      }

      for (var _key5 in events) {
        this.domNode.addEventListener(_key5, events[_key5]);
      }
    }
  }, {
    key: "init",
    value: function init() {
      var _a, _b;

      var props = this.block(this.getAttributes());
      this.partitions = partition(props);
      this.processPartitions();
      var callback = (_b = (_a = this.block).connected) === null || _b === void 0 ? void 0 : _b.call(_a);
      if (callback) this.disconnectCallback = callback;
      this.mutationObserver = new MutationObserver(this.observer);
      this.mutationObserver.observe(this.domNode.parentNode, {
        childList: true
      });
    }
  }, {
    key: "setValue",
    value: function setValue(value) {
      if (utils_1.is.input(this.domNode)) {
        this.domNode.value = value;
      } else {
        this.domNode.textContent = value;
      }
    }
  }, {
    key: "throwStateError",
    value: function throwStateError(key, state) {
      utils_1.throwError(!utils_1.is.data(state), "".concat(key, " value should be a state object"));
    }
  }, {
    key: "destroy",
    value: function destroy() {
      var _a, _b, _c, _d;

      this.subscriptions.forEach(function (sub) {
        sub.unsubscribe();
      });
      (_b = (_a = this.block).disconnected) === null || _b === void 0 ? void 0 : _b.call(_a);
      (_c = this.disconnectCallback) === null || _c === void 0 ? void 0 : _c.call(this);
      (_d = this.mutationObserver) === null || _d === void 0 ? void 0 : _d.disconnect();
      this.partitions = undefined;
      this.mutationObserver = undefined;
      this.disconnectCallback = undefined;
      this.subscriptions = undefined;
    }
  }]);

  return Controller;
}();

exports.default = Controller;
},{"tslib":"../node_modules/tslib/tslib.es6.js","./utils":"../src/utils.ts"}],"../src/useData.ts":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var tslib_1 = require("tslib");

var Data_1 = tslib_1.__importDefault(require("./Data"));

function useData(state) {
  var get = {};
  var data = new Data_1.default(state);

  var _state = data.get();

  var forceUpdate = function forceUpdate() {
    for (var key in state) {
      _state[key] = _state[key];
    }
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
    data: data,
    state: _state,
    forceUpdate: forceUpdate
  };
}

exports.default = useData;
},{"tslib":"../node_modules/tslib/tslib.es6.js","./Data":"../src/Data.ts"}],"../src/index.ts":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.watch = exports.useData = exports.queryAll = exports.query = exports.map = exports.register = void 0;

var tslib_1 = require("tslib");

var Controller_1 = tslib_1.__importDefault(require("./Controller"));

var Data_1 = tslib_1.__importDefault(require("./Data"));

var useData_1 = tslib_1.__importDefault(require("./useData"));

exports.useData = useData_1.default;

var utils_1 = require("./utils");

Object.defineProperty(exports, "query", {
  enumerable: true,
  get: function get() {
    return utils_1.query;
  }
});
Object.defineProperty(exports, "queryAll", {
  enumerable: true,
  get: function get() {
    return utils_1.queryAll;
  }
});
Object.defineProperty(exports, "watch", {
  enumerable: true,
  get: function get() {
    return utils_1.watch;
  }
});

function register(block, domNode) {
  var element = utils_1.query(domNode);
  utils_1.throwError(!element, "element with selector ".concat(domNode, " not found"));
  var controller = new Controller_1.default(element, block);
  controller.init();
  return function () {
    return controller.destroy();
  };
}

exports.register = register;

function map(_ref, callback) {
  var key = _ref.key,
      state = _ref.state;
  var fauxState = new Data_1.default(state.get());
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
}

exports.map = map;
},{"tslib":"../node_modules/tslib/tslib.es6.js","./Controller":"../src/Controller.ts","./Data":"../src/Data.ts","./useData":"../src/useData.ts","./utils":"../src/utils.ts"}],"index.ts":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var src_1 = require("../src");

var _src_1$useData = src_1.useData({
  radius: 10,
  arr: [1, 2, 3]
}),
    state = _src_1$useData.state,
    data = _src_1$useData.data,
    radius = _src_1$useData.get.radius;

data.subscribe(function () {
  console.log(state.arr);
});

var Range = function Range() {
  return {
    onChange: function onChange(_ref) {
      var target = _ref.target;
      var value = target.value;
      var radius = parseFloat(value);
      state.arr.push(radius);
      state.radius = radius;
    }
  };
};

var Circle = function Circle() {
  return {
    cx: radius
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