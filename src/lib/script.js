"use strict";require("core-js/modules/es.object.to-string.js"),require("core-js/modules/es.function.name.js"),require("core-js/modules/es.array.from.js"),require("core-js/modules/es.string.iterator.js"),require("core-js/modules/es.symbol.js"),require("core-js/modules/es.symbol.description.js"),require("core-js/modules/es.symbol.iterator.js"),require("core-js/modules/es.array.iterator.js"),require("core-js/modules/web.dom-collections.iterator.js"),require("core-js/modules/web.dom-collections.for-each.js"),require("core-js/modules/es.object.keys.js"),require("core-js/modules/es.array.slice.js");function _createForOfIteratorHelper(a,b){var c;if("undefined"==typeof Symbol||null==a[Symbol.iterator]){if(Array.isArray(a)||(c=_unsupportedIterableToArray(a))||b&&a&&"number"==typeof a.length){c&&(a=c);var d=0,e=function(){};return{s:e,n:function n(){return d>=a.length?{done:!0}:{done:!1,value:a[d++]}},e:function e(a){throw a},f:e}}throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}var f,g=!0,h=!1;return{s:function s(){c=a[Symbol.iterator]()},n:function n(){var a=c.next();return g=a.done,a},e:function e(a){h=!0,f=a},f:function f(){try{g||null==c.return||c.return()}finally{if(h)throw f}}}}function _unsupportedIterableToArray(a,b){if(a){if("string"==typeof a)return _arrayLikeToArray(a,b);var c=Object.prototype.toString.call(a).slice(8,-1);return"Object"===c&&a.constructor&&(c=a.constructor.name),"Map"===c||"Set"===c?Array.from(a):"Arguments"===c||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(c)?_arrayLikeToArray(a,b):void 0}}function _arrayLikeToArray(a,b){(null==b||b>a.length)&&(b=a.length);for(var c=0,d=Array(b);c<b;c++)d[c]=a[c];return d}var template=document.querySelector("#task-template").content,fragment=document.createDocumentFragment(),entry=document.querySelector("#entry"),lista=document.querySelector("#list"),form=document.querySelector(".nav-entry"),taskTemplate=document.getElementById("task-template");form.addEventListener("submit",function(a){a.preventDefault(),newTask()}),document.querySelectorAll(".sort").forEach(function(a){return a.onclick=function(){sort()}}),window.onload=load;function load(){var a=Object.keys(localStorage);0===a.length&&create("Make code");for(var b,c=0,d=a;c<d.length;c++)b=d[c],create(b);checked(),lista.scrollTo(0,0)}function newTask(){create(entry.value),entry.value=""}function create(a){var b=a.charAt(0).toUpperCase()+a.slice(1),c=!!(b in localStorage)&&"false"!=localStorage.getItem(b);localStorage.setItem(b,c),renderPill(b),lista.querySelectorAll("input").forEach(function(a){return a.addEventListener("click",function(){chequeado(this)})}),lista.querySelectorAll(".delete").forEach(function(a){return a.addEventListener("click",function(){deleted(this)})})}function renderPill(a){template.querySelector(".task-label span").textContent=a;var b=template.cloneNode(!0);fragment.appendChild(b),lista.appendChild(fragment)}function checked(){var a=lista.querySelectorAll("li");a.forEach(function(a){var b=a.querySelector("span").textContent;"true"==localStorage.getItem(b)&&a.querySelector("label").click()})}function sort(){for(var a=[],b=Object.keys(localStorage),c=0;c<b.length;c++)a[c]=b[c];var d=invert(a);deletedAll(),localStorage.clear();var e,f=_createForOfIteratorHelper(d);try{for(f.s();!(e=f.n()).done;){var g=e.value;create(g)}}catch(a){f.e(a)}finally{f.f()}}function invert(a){for(var b,c=0;c<a.length/2;c++)b=a[c],a[c]=a[a.length-c-1],a[a.length-c-1]=b;return a}function chequeado(a){a.checked?(a.parentElement.style.textDecoration="line-through",localStorage.setItem(a.parentElement.querySelector("span").textContent,!0)):!a.checked&&(a.parentElement.style.textDecoration="none",localStorage.setItem(a.parentElement.querySelector("span").textContent,!1))}function deletedAll(){document.querySelectorAll(".delete").forEach(function(a){deleted(a)}),localStorage.clear()}function deleted(a){var b=a.parentElement.querySelector("span").textContent;localStorage.removeItem(b),a.parentElement.remove()}