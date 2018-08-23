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
eval("\n\n__webpack_require__(/*! ../scss/main.scss */ \"./src/scss/main.scss\");\n\nvar todos = document.getElementById('todo-list');\n\nvar todoForm = document.getElementById('todo-form');\n\nvar todoInput = document.getElementById('todo-input');\n\nvar exists = document.getElementById('exists');\n\nif (todos) {\n    fetch('http://localhost:8081/api/todos').then(function (res) {\n        return res.json();\n    }).then(function (res) {\n        var _iteratorNormalCompletion = true;\n        var _didIteratorError = false;\n        var _iteratorError = undefined;\n\n        try {\n            for (var _iterator = res.data[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {\n                var todo = _step.value;\n\n                createTodoItem(todo.content);\n            }\n        } catch (err) {\n            _didIteratorError = true;\n            _iteratorError = err;\n        } finally {\n            try {\n                if (!_iteratorNormalCompletion && _iterator.return) {\n                    _iterator.return();\n                }\n            } finally {\n                if (_didIteratorError) {\n                    throw _iteratorError;\n                }\n            }\n        }\n\n        var todoDeleteButtons = document.querySelectorAll('.delete');\n\n        todoDeleteButtons.forEach(function (todo) {\n            todo.addEventListener(\"click\", function (e) {\n                fetch('http://localhost:8081/api/todo/delete', {\n                    method: 'POST',\n                    headers: {\n                        'Accept': 'application/json',\n                        'Content-Type': 'application/json; charset=utf-8'\n                    },\n                    body: JSON.stringify({\n                        content: e.target.parentElement.parentElement.children[0].textContent\n                    })\n                }).then(function (res) {\n                    return res.json();\n                }).then(function (res) {\n                    console.log(res);\n\n                    /** Delete from HTML */\n                    // let index = Array.from(todoDeleteButtons).findIndex(element => element === e.target);\n                    todos.removeChild(e.target.parentElement.parentElement);\n                });\n            });\n        });\n    });\n}\n\nif (todoForm) {\n    todoForm.addEventListener('submit', function (e) {\n        e.preventDefault();\n\n        if (todoInput.value !== '') {\n            // * Create a fetch post request \n            fetch('http://localhost:8081/api/todo/create', {\n                method: 'POST',\n                headers: {\n                    'Accept': 'application/json',\n                    'Content-Type': 'application/json; charset=utf-8'\n                },\n                body: JSON.stringify({ content: todoInput.value })\n            }).then(function (res) {\n                return res.json();\n            }).then(function (res) {\n                console.log(res);\n\n                if (res.exists) {\n                    exists.classList.remove('hidden');\n                    exists.classList.add('shown');\n\n                    setTimeout(function () {\n                        exists.classList.remove('shown');\n                        exists.classList.add('hidden');\n                    }, 1500);\n\n                    todoInput.value = \"\";\n                } else {\n                    createTodoItem(todoInput.value);\n                }\n            });\n        }\n    });\n}\n\nfunction createTodoItem(content) {\n    var todoItem = document.createElement('li');\n    todoItem.setAttribute('class', 'collection-item');\n\n    var todoText = document.createElement('span');\n    todoText.textContent = content;\n\n    var link = document.createElement('a');\n    link.setAttribute('class', 'secondary-content');\n\n    var icon = document.createElement('i');\n    icon.setAttribute('class', 'material-icons delete');\n    icon.textContent = 'delete';\n\n    link.appendChild(icon);\n\n    todoItem.appendChild(todoText);\n\n    todoItem.appendChild(link);\n\n    todos.appendChild(todoItem);\n\n    todoInput.value = \"\";\n}\n\n//# sourceURL=webpack:///./src/js/app.js?");

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