parcelRequire=function(e,r,t,n){var i,o="function"==typeof parcelRequire&&parcelRequire,u="function"==typeof require&&require;function f(t,n){if(!r[t]){if(!e[t]){var i="function"==typeof parcelRequire&&parcelRequire;if(!n&&i)return i(t,!0);if(o)return o(t,!0);if(u&&"string"==typeof t)return u(t);var c=new Error("Cannot find module '"+t+"'");throw c.code="MODULE_NOT_FOUND",c}p.resolve=function(r){return e[t][1][r]||r},p.cache={};var l=r[t]=new f.Module(t);e[t][0].call(l.exports,p,l,l.exports,this)}return r[t].exports;function p(e){return f(p.resolve(e))}}f.isParcelRequire=!0,f.Module=function(e){this.id=e,this.bundle=f,this.exports={}},f.modules=e,f.cache=r,f.parent=o,f.register=function(r,t){e[r]=[function(e,r){r.exports=t},{}]};for(var c=0;c<t.length;c++)try{f(t[c])}catch(e){i||(i=e)}if(t.length){var l=f(t[t.length-1]);"object"==typeof exports&&"undefined"!=typeof module?module.exports=l:"function"==typeof define&&define.amd?define(function(){return l}):n&&(this[n]=l)}if(parcelRequire=f,i)throw i;return f}({"eLcb":[function(require,module,exports) {
"use strict";Object.defineProperty(exports,"__esModule",{value:!0});var t=function(){return function(t,e){if(Array.isArray(t))return t;if(Symbol.iterator in Object(t))return function(t,e){var r=[],n=!0,o=!1,i=void 0;try{for(var a,l=t[Symbol.iterator]();!(n=(a=l.next()).done)&&(r.push(a.value),!e||r.length!==e);n=!0);}catch(c){o=!0,i=c}finally{try{!n&&l.return&&l.return()}finally{if(o)throw i}}return r}(t,e);throw new TypeError("Invalid attempt to destructure non-iterable instance")}}(),e=function(){function t(t,e){for(var r=0;r<e.length;r++){var n=e[r];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(t,n.key,n)}}return function(e,r,n){return r&&t(e.prototype,r),n&&t(e,n),e}}();function r(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}var n=function(){function n(){var e=this;r(this,n);var o={},i=!0,a=!1,l=void 0;try{for(var c,s=Object.entries({start:{rootMargin:"0px",threshold:0},half:{rootMargin:"0px",threshold:.5},full:{rootMargin:"0px",threshold:1}})[Symbol.iterator]();!(i=(c=s.next()).done);i=!0){var u=t(c.value,2),f=u[0],v=u[1];o[f]=new IntersectionObserver(function(t){t.forEach(function(t){t.isIntersecting&&e.trigger_event(t.target)})},v)}}catch(d){a=!0,l=d}finally{try{!i&&s.return&&s.return()}finally{if(a)throw l}}this.selector="data-scrollwiz",this.scroll_event=document.createEvent("Event"),this.scroll_event.initEvent("scrollwiz",!0,!0),document.querySelectorAll("["+this.selector+"]").forEach(function(t){var r=t.getAttribute(e.selector);o[r=""==r?"half":r]&&o[r].observe(t)})}return e(n,[{key:"trigger_event",value:function(t){return t.removeAttribute(this.selector),t.classList.add("is-active"),t.dispatchEvent(this.scroll_event),!0}}]),n}(),o=function(){window.addEventListener("load",function(){"IntersectionObserver"in window?new n:document.querySelectorAll("[data-scrollwiz]").forEach(function(t){t.removeAttribute((void 0).selector),t.classList.add("is-active")})},!1)};exports.default=o;
},{}],"H3pF":[function(require,module,exports) {
"use strict";Object.defineProperty(exports,"__esModule",{value:!0}),exports.on=exports.$$=exports.$=void 0;var e=function(e){return(arguments.length>1&&void 0!==arguments[1]?arguments[1]:document).querySelector(e)};exports.$=e;var t=function(e){return(arguments.length>1&&void 0!==arguments[1]?arguments[1]:document).querySelectorAll(e)};exports.$$=t;var o=function(e,t,o,r){r=r||{},(e="string"==typeof e?document.querySelector(e):e)&&t.split(" ").forEach(function(t){e.addEventListener(t,o,r)})};exports.on=o;
},{}],"Focm":[function(require,module,exports) {
"use strict";var e=r(require("scrollwiz")),i=require("./utils/helpers");function r(e){return e&&e.__esModule?e:{default:e}}(0,e.default)(),(0,i.$$)(".period__link").forEach(function(e){(0,i.on)(e,"click",function(r){r.preventDefault(),(0,i.$$)(".period__link").forEach(function(e){return e.classList.remove("is-active")}),e.classList.add("is-active")})});
},{"scrollwiz":"eLcb","./utils/helpers":"H3pF"}]},{},["Focm"], null)