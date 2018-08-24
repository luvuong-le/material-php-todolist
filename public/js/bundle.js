/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/js/app.js":
/*!***********************!*\
  !*** ./src/js/app.js ***!
  \***********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\n__webpack_require__(/*! ../scss/main.scss */ \"./src/scss/main.scss\");\n\n/** \r\n * * Initialize Materialize Modals \r\n * \r\n*/\ndocument.addEventListener('DOMContentLoaded', function () {\n\tvar elems = document.querySelectorAll('.modal');\n\tvar options = {\n\t\topacity: 0.8\n\t};\n\tvar instances = M.Modal.init(elems, options);\n\n\tvar todos = document.getElementById('todo-list');\n\n\tvar todoForm = document.getElementById('todo-form');\n\n\tvar todoInput = document.getElementById('todo-input');\n\n\tvar exists = document.getElementById('exists');\n\n\tvar editModal = document.getElementById('editModal');\n\n\tvar oldEditModalInput = null;\n\n\tvar editModalInput = document.getElementById('editModalInput');\n\n\tif (editModal) {\n\t\teditModal.addEventListener('submit', function (e) {\n\t\t\te.preventDefault();\n\n\t\t\tif (editModalInput.value !== '') {\n\t\t\t\t// * Create a fetch post request\n\t\t\t\tfetch('http://localhost:8081/api/todo/edit', {\n\t\t\t\t\tmethod: 'POST',\n\t\t\t\t\theaders: {\n\t\t\t\t\t\tAccept: 'application/json',\n\t\t\t\t\t\t'Content-Type': 'application/json; charset=utf-8'\n\t\t\t\t\t},\n\t\t\t\t\tbody: JSON.stringify({ newContent: editModalInput.value, oldContent: oldEditModalInput })\n\t\t\t\t}).then(function (res) {\n\t\t\t\t\treturn res.json();\n\t\t\t\t}).then(function (res) {\n\t\t\t\t\tconsole.log(res);\n\t\t\t\t\tinstances[0].close();\n\n\t\t\t\t\tvar items = document.querySelectorAll('.collection-item');\n\n\t\t\t\t\tvar item = Array.from(items).find(function (element) {\n\t\t\t\t\t\treturn element.children[0].textContent === res.data.oldContent;\n\t\t\t\t\t});\n\n\t\t\t\t\titem.children[0].textContent = res.data.newContent;\n\t\t\t\t});\n\t\t\t}\n\t\t});\n\t}\n\n\tif (todos) {\n\t\tfetch('http://localhost:8081/api/todos').then(function (res) {\n\t\t\treturn res.json();\n\t\t}).then(function (res) {\n\t\t\tvar _iteratorNormalCompletion = true;\n\t\t\tvar _didIteratorError = false;\n\t\t\tvar _iteratorError = undefined;\n\n\t\t\ttry {\n\t\t\t\tfor (var _iterator = res.data[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {\n\t\t\t\t\tvar todo = _step.value;\n\n\t\t\t\t\tcreateTodoItem(todo.content);\n\t\t\t\t}\n\t\t\t} catch (err) {\n\t\t\t\t_didIteratorError = true;\n\t\t\t\t_iteratorError = err;\n\t\t\t} finally {\n\t\t\t\ttry {\n\t\t\t\t\tif (!_iteratorNormalCompletion && _iterator.return) {\n\t\t\t\t\t\t_iterator.return();\n\t\t\t\t\t}\n\t\t\t\t} finally {\n\t\t\t\t\tif (_didIteratorError) {\n\t\t\t\t\t\tthrow _iteratorError;\n\t\t\t\t\t}\n\t\t\t\t}\n\t\t\t}\n\n\t\t\tvar todoDeleteButtons = document.querySelectorAll('.delete');\n\n\t\t\ttodoDeleteButtons.forEach(function (todo) {\n\t\t\t\ttodo.addEventListener('click', function (e) {\n\t\t\t\t\tfetch('http://localhost:8081/api/todo/delete', {\n\t\t\t\t\t\tmethod: 'POST',\n\t\t\t\t\t\theaders: {\n\t\t\t\t\t\t\tAccept: 'application/json',\n\t\t\t\t\t\t\t'Content-Type': 'application/json; charset=utf-8'\n\t\t\t\t\t\t},\n\t\t\t\t\t\tbody: JSON.stringify({\n\t\t\t\t\t\t\tcontent: e.target.parentElement.parentElement.children[0].textContent\n\t\t\t\t\t\t})\n\t\t\t\t\t}).then(function (res) {\n\t\t\t\t\t\treturn res.json();\n\t\t\t\t\t}).then(function (res) {\n\t\t\t\t\t\tconsole.log(res);\n\n\t\t\t\t\t\t/** Delete from HTML */\n\t\t\t\t\t\t// let index = Array.from(todoDeleteButtons).findIndex(element => element === e.target);\n\t\t\t\t\t\ttodos.removeChild(e.target.parentElement.parentElement);\n\t\t\t\t\t});\n\t\t\t\t});\n\t\t\t});\n\t\t});\n\t}\n\n\tif (todoForm) {\n\t\ttodoForm.addEventListener('submit', function (e) {\n\t\t\te.preventDefault();\n\n\t\t\tif (todoInput.value !== '') {\n\t\t\t\t// * Create a fetch post request\n\t\t\t\tfetch('http://localhost:8081/api/todo/create', {\n\t\t\t\t\tmethod: 'POST',\n\t\t\t\t\theaders: {\n\t\t\t\t\t\tAccept: 'application/json',\n\t\t\t\t\t\t'Content-Type': 'application/json; charset=utf-8'\n\t\t\t\t\t},\n\t\t\t\t\tbody: JSON.stringify({ content: todoInput.value })\n\t\t\t\t}).then(function (res) {\n\t\t\t\t\treturn res.json();\n\t\t\t\t}).then(function (res) {\n\t\t\t\t\tconsole.log(res);\n\n\t\t\t\t\tif (res.exists) {\n\t\t\t\t\t\texists.classList.remove('hidden');\n\t\t\t\t\t\texists.classList.add('shown');\n\n\t\t\t\t\t\tsetTimeout(function () {\n\t\t\t\t\t\t\texists.classList.remove('shown');\n\t\t\t\t\t\t\texists.classList.add('hidden');\n\t\t\t\t\t\t}, 1500);\n\n\t\t\t\t\t\ttodoInput.value = '';\n\t\t\t\t\t} else {\n\t\t\t\t\t\tcreateTodoItem(todoInput.value);\n\t\t\t\t\t}\n\t\t\t\t});\n\t\t\t}\n\t\t});\n\t}\n\n\tfunction createTodoItem(content) {\n\t\tvar todoItem = document.createElement('li');\n\t\ttodoItem.setAttribute('class', 'collection-item');\n\n\t\tvar todoText = document.createElement('span');\n\t\ttodoText.textContent = content;\n\n\t\tvar link = document.createElement('a');\n\t\tlink.setAttribute('class', 'secondary-content');\n\n\t\tvar icon = document.createElement('i');\n\t\ticon.setAttribute('class', 'material-icons delete');\n\t\ticon.textContent = 'delete';\n\n\t\tvar linkEdit = document.createElement('a');\n\t\tlinkEdit.setAttribute('href', '#editModal');\n\t\tlinkEdit.setAttribute('class', 'secondary-content modal-trigger');\n\n\t\tlinkEdit.addEventListener('click', function (e) {\n\t\t\toldEditModalInput = e.target.parentElement.parentElement.children[0].textContent;\n\t\t\teditModalInput.value = e.target.parentElement.parentElement.children[0].textContent;\n\t\t});\n\n\t\tvar iconEdit = document.createElement('i');\n\t\ticonEdit.setAttribute('class', 'material-icons edit');\n\t\ticonEdit.textContent = 'edit';\n\n\t\tlink.appendChild(icon);\n\t\tlinkEdit.appendChild(iconEdit);\n\n\t\ttodoItem.appendChild(todoText);\n\n\t\ttodoItem.appendChild(link);\n\t\ttodoItem.appendChild(linkEdit);\n\n\t\ttodos.appendChild(todoItem);\n\n\t\ttodoInput.value = '';\n\t}\n});\n\n//# sourceURL=webpack:///./src/js/app.js?");

/***/ }),

/***/ "./src/scss/main.scss":
/*!****************************!*\
  !*** ./src/scss/main.scss ***!
  \****************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("// extracted by mini-css-extract-plugin\n\n//# sourceURL=webpack:///./src/scss/main.scss?");

/***/ }),

/***/ 0:
/*!*****************************!*\
  !*** multi ./src/js/app.js ***!
  \*****************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("module.exports = __webpack_require__(/*! ./src/js/app.js */\"./src/js/app.js\");\n\n\n//# sourceURL=webpack:///multi_./src/js/app.js?");

/***/ })

/******/ });