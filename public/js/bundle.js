!function(t){var e={};function n(o){if(e[o])return e[o].exports;var r=e[o]={i:o,l:!1,exports:{}};return t[o].call(r.exports,r,r.exports,n),r.l=!0,r.exports}n.m=t,n.c=e,n.d=function(t,e,o){n.o(t,e)||Object.defineProperty(t,e,{enumerable:!0,get:o})},n.r=function(t){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})},n.t=function(t,e){if(1&e&&(t=n(t)),8&e)return t;if(4&e&&"object"==typeof t&&t&&t.__esModule)return t;var o=Object.create(null);if(n.r(o),Object.defineProperty(o,"default",{enumerable:!0,value:t}),2&e&&"string"!=typeof t)for(var r in t)n.d(o,r,function(e){return t[e]}.bind(null,r));return o},n.n=function(t){var e=t&&t.__esModule?function(){return t.default}:function(){return t};return n.d(e,"a",e),e},n.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)},n.p="",n(n.s=0)}([function(t,e,n){t.exports=n(1)},function(t,e,n){"use strict";n(2),document.addEventListener("DOMContentLoaded",function(){var t=document.querySelectorAll(".modal"),e=M.Modal.init(t,{opacity:.8}),n=document.getElementById("todo-list"),o=document.getElementById("todo-form"),r=document.getElementById("todo-input"),a=document.getElementById("exists"),l=document.getElementById("editModal"),i=null,c=document.getElementById("editModalInput");function d(t){var e=document.createElement("li");e.setAttribute("class","collection-item");var o=document.createElement("span");o.textContent=t;var a=document.createElement("a");a.setAttribute("class","secondary-content");var l=document.createElement("i");l.setAttribute("class","material-icons delete"),l.textContent="delete";var d=document.createElement("a");d.setAttribute("href","#editModal"),d.setAttribute("class","secondary-content modal-trigger"),d.addEventListener("click",function(t){i=t.target.parentElement.parentElement.children[0].textContent,c.value=t.target.parentElement.parentElement.children[0].textContent});var u=document.createElement("i");u.setAttribute("class","material-icons edit"),u.textContent="edit",a.appendChild(l),d.appendChild(u),e.appendChild(o),e.appendChild(a),e.appendChild(d),n.appendChild(e),r.value=""}l&&l.addEventListener("submit",function(t){t.preventDefault(),""!==c.value&&fetch("http://localhost:8081/api/todo/edit",{method:"POST",headers:{Accept:"application/json","Content-Type":"application/json; charset=utf-8"},body:JSON.stringify({newContent:c.value,oldContent:i})}).then(function(t){return t.json()}).then(function(t){console.log(t),e[0].close();var n=document.querySelectorAll(".collection-item");Array.from(n).find(function(e){return e.children[0].textContent===t.data.oldContent}).children[0].textContent=t.data.newContent})}),n&&fetch("http://localhost:8081/api/todos").then(function(t){return t.json()}).then(function(t){var e=!0,o=!1,r=void 0;try{for(var a,l=t.data[Symbol.iterator]();!(e=(a=l.next()).done);e=!0){d(a.value.content)}}catch(t){o=!0,r=t}finally{try{!e&&l.return&&l.return()}finally{if(o)throw r}}document.querySelectorAll(".delete").forEach(function(t){t.addEventListener("click",function(t){fetch("http://localhost:8081/api/todo/delete",{method:"POST",headers:{Accept:"application/json","Content-Type":"application/json; charset=utf-8"},body:JSON.stringify({content:t.target.parentElement.parentElement.children[0].textContent})}).then(function(t){return t.json()}).then(function(e){console.log(e),n.removeChild(t.target.parentElement.parentElement)})})})}),o&&o.addEventListener("submit",function(t){t.preventDefault(),""!==r.value&&fetch("http://localhost:8081/api/todo/create",{method:"POST",headers:{Accept:"application/json","Content-Type":"application/json; charset=utf-8"},body:JSON.stringify({content:r.value})}).then(function(t){return t.json()}).then(function(t){console.log(t),t.exists?(a.classList.remove("hidden"),a.classList.add("shown"),setTimeout(function(){a.classList.remove("shown"),a.classList.add("hidden")},1500),r.value=""):d(r.value)})})})},function(t,e,n){}]);