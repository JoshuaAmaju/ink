var ink = (function (exports) {
    'use strict';

    function __rest(t,e){var r={};for(var n in t)Object.prototype.hasOwnProperty.call(t,n)&&e.indexOf(n)<0&&(r[n]=t[n]);if(null!=t&&"function"==typeof Object.getOwnPropertySymbols){var o=0;for(n=Object.getOwnPropertySymbols(t);o<n.length;o++)e.indexOf(n[o])<0&&Object.prototype.propertyIsEnumerable.call(t,n[o])&&(r[n[o]]=t[n[o]]);}return r}

    class Data{constructor(t){this.listeners=[],this.notifyListeners=(()=>{this.listeners.forEach(t=>t());}),this.prev=Object.assign({},t),this.state=new Proxy(t,{get:(t,s)=>t[s],set:(t,s,e)=>{const i=s;return e===t[i]||(this.prev=Object.assign({},t),t[i]=e,this.notify(),!0)}});}get(){return this.state}getPrev(){return this.prev}set(t){this.prev=Object.assign({},this.state),this.state=t,this.notify();}notify(){this.raf&&cancelAnimationFrame(this.raf),this.raf=requestAnimationFrame(this.notifyListeners);}subscribe(t){return this.listeners.push(t),{unsubscribe:()=>{this.listeners=this.listeners.filter(s=>s!==t);}}}}

    function toKebabCase(t){return t.match(/[A-Z]{2,}(?=[A-Z][a-z]+[0-9]*|\b)|[A-Z]?[a-z]+[0-9]*|[A-Z]|[0-9]+/g).map(t=>t.toLowerCase()).join("-")}function toCamelCase(t){return t.replace(/-./g,t=>t.toUpperCase()[1])}const is={data:t=>t instanceof Data,input:t=>"INPUT"===t.nodeName,obj:t=>"[object Object]"===Object.prototype.toString.call(t)};function query(t){return "string"==typeof t?document.querySelector(t):t}function queryAll(t){return Array.from(document.querySelectorAll(t))}function throwError(t,e){if(t)throw e}function watch({key:t,state:e},r){e.subscribe(()=>{e.get()[t]!==e.getPrev()[t]&&r();});}

    function get(t,s){return is.obj(t)?t[s]:t}function partition(t){const s={},o={},e={};for(const i in t){const r=t[i];if(i.startsWith("on")){e[i.substr(2).toLowerCase()]=r;}else i.startsWith("data")?s[toKebabCase(i)]=r:o[i]=r;}return {data:s,props:o,events:e}}class Controller{constructor(t,s){this.domNode=t,this.block=s,this.subscriptions=[],this.observer=(t=>{for(const s of t)s.removedNodes.forEach(t=>{t===this.domNode&&this.destroy();});});}getAttributes(){const t={},s=this.domNode.attributes;for(let o=0;o<s.length;o++){const{name:e,value:i}=s[o];t[toCamelCase(e)]=i;}return t}processPartitions(){var t;const{data:s,props:o,events:e}=null!==(t=this.partitions)&&void 0!==t?t:{},i=null!=o?o:{},{value:r,style:n,class:a}=i,c=__rest(i,["value","style","class"]);if(r){const{key:t,state:s}=r;this.throwStateError(t,s);const o=s.subscribe(()=>{this.setValue(get(s.get(),t));});this.subscriptions.push(o);}if(a){const{key:t,state:s}=a;this.throwStateError(t,s);const o=s.subscribe(()=>{const o=get(s.get(),t),e=get(s.getPrev(),t);this.domNode.classList.remove(e),o&&this.domNode.classList.add(o);});this.subscriptions.push(o);}if(n)for(const t in n){const{key:s,state:o}=n[t];this.throwStateError(t,o);const e=o.subscribe(()=>{const e=get(o.get(),s);this.domNode.style[t]=e;});this.subscriptions.push(e);}const h=Object.assign(Object.assign({},s),c);if(h)for(const t in h){const{key:s,state:o}=h[t];this.throwStateError(t,o);const e=o.subscribe(()=>{const e=get(o.get(),s);this.domNode.setAttribute(t,e);});this.subscriptions.push(e);}for(const t in e)this.domNode.addEventListener(t,e[t]);}init(){var t,s;const o=this.block(this.getAttributes());this.partitions=partition(o),this.processPartitions();const e=null===(s=(t=this.block).connected)||void 0===s?void 0:s.call(t);e&&(this.disconnectCallback=e),this.mutationObserver=new MutationObserver(this.observer),this.mutationObserver.observe(this.domNode.parentNode,{childList:!0});}setValue(t){is.input(this.domNode)?this.domNode.value=t:this.domNode.textContent=t;}throwStateError(t,s){throwError(!is.data(s),`${t} value should be a state object`);}destroy(){var t,s,o,e;this.subscriptions.forEach(t=>{t.unsubscribe();}),null===(s=(t=this.block).disconnected)||void 0===s||s.call(t),null===(o=this.disconnectCallback)||void 0===o||o.call(this),null===(e=this.mutationObserver)||void 0===e||e.disconnect(),this.partitions=void 0,this.mutationObserver=void 0,this.disconnectCallback=void 0,this.subscriptions=void 0;}}

    function useData(t){const e={},a=new Data(t),r=a.get();for(const r in t)Object.defineProperty(e,r,{value:{key:r,state:a},writable:!1,enumerable:!1,configurable:!1});return {get:e,data:a,state:r,forceUpdate:()=>{for(const e in t)r[e]=r[e];}}}

    function register(t,e){const r=query(e);throwError(!r,`element with selector ${e} not found`);const o=new Controller(r,t);return o.init(),()=>o.destroy()}function map({key:t,state:e},r){const o=new Data(e.get());return Object.defineProperties(o,{get:{value:()=>r(e.get()[t])},getPrev:{value:()=>r(e.getPrev()[t])}}),e.subscribe(()=>{o.set(e.get());}),{key:t,state:o}}

    exports.map = map;
    exports.query = query;
    exports.queryAll = queryAll;
    exports.register = register;
    exports.useData = useData;
    exports.watch = watch;

    return exports;

}({}));
