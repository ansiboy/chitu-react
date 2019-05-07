/*!
 * 
 *  maishu-chitu-react v1.5.14
 *  https://github.com/ansiboy/services-sdk
 *  
 *  Copyright (c) 2016-2018, shu mai <ansiboy@163.com>
 *  Licensed under the MIT License.
 * 
 */
define(["maishu-chitu","react","react-dom"], function(__WEBPACK_EXTERNAL_MODULE_maishu_chitu__, __WEBPACK_EXTERNAL_MODULE_react__, __WEBPACK_EXTERNAL_MODULE_react_dom__) { return /******/ (function(modules) { // webpackBootstrap
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
/******/ 	return __webpack_require__(__webpack_require__.s = "./out/es5/index.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./out/es5/application.js":
/*!********************************!*\
  !*** ./out/es5/application.js ***!
  \********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;\n\nfunction _typeof(obj) { if (typeof Symbol === \"function\" && typeof Symbol.iterator === \"symbol\") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === \"function\" && obj.constructor === Symbol && obj !== Symbol.prototype ? \"symbol\" : typeof obj; }; } return _typeof(obj); }\n\nfunction _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if (\"value\" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }\n\nfunction _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }\n\nfunction _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError(\"Cannot call a class as a function\"); } }\n\nfunction _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === \"object\" || typeof call === \"function\")) { return call; } return _assertThisInitialized(self); }\n\nfunction _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError(\"this hasn't been initialised - super() hasn't been called\"); } return self; }\n\nfunction _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }\n\nfunction _inherits(subClass, superClass) { if (typeof superClass !== \"function\" && superClass !== null) { throw new TypeError(\"Super expression must either be null or a function\"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }\n\nfunction _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }\n\nvar __awaiter = void 0 && (void 0).__awaiter || function (thisArg, _arguments, P, generator) {\n  return new (P || (P = Promise))(function (resolve, reject) {\n    function fulfilled(value) {\n      try {\n        step(generator.next(value));\n      } catch (e) {\n        reject(e);\n      }\n    }\n\n    function rejected(value) {\n      try {\n        step(generator[\"throw\"](value));\n      } catch (e) {\n        reject(e);\n      }\n    }\n\n    function step(result) {\n      result.done ? resolve(result.value) : new P(function (resolve) {\n        resolve(result.value);\n      }).then(fulfilled, rejected);\n    }\n\n    step((generator = generator.apply(thisArg, _arguments || [])).next());\n  });\n};\n\n!(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__, exports, __webpack_require__(/*! react */ \"react\"), __webpack_require__(/*! react-dom */ \"react-dom\"), __webpack_require__(/*! maishu-chitu */ \"maishu-chitu\"), __webpack_require__(/*! ./errors */ \"./out/es5/errors.js\")], __WEBPACK_AMD_DEFINE_RESULT__ = (function (require, exports, React, ReactDOM, chitu, errors_1) {\n  \"use strict\";\n\n  Object.defineProperty(exports, \"__esModule\", {\n    value: true\n  });\n\n  var Page =\n  /*#__PURE__*/\n  function (_chitu$Page) {\n    _inherits(Page, _chitu$Page);\n\n    function Page() {\n      var _this;\n\n      _classCallCheck(this, Page);\n\n      _this = _possibleConstructorReturn(this, _getPrototypeOf(Page).apply(this, arguments));\n      _this.component = null;\n      return _this;\n    }\n\n    return Page;\n  }(chitu.Page);\n\n  exports.Page = Page;\n\n  var Application =\n  /*#__PURE__*/\n  function (_chitu$Application) {\n    _inherits(Application, _chitu$Application);\n\n    function Application(args) {\n      var _this2;\n\n      _classCallCheck(this, Application);\n\n      _this2 = _possibleConstructorReturn(this, _getPrototypeOf(Application).call(this, args));\n\n      _this2.pageCreated.add(function (sender, page) {\n        page.element.className = \"page\";\n      });\n\n      return _this2;\n    }\n\n    _createClass(Application, [{\n      key: \"createDefaultAction\",\n      value: function createDefaultAction(url, loadjs) {\n        var _this3 = this;\n\n        return function (page) {\n          return __awaiter(_this3, void 0, void 0,\n          /*#__PURE__*/\n          regeneratorRuntime.mark(function _callee() {\n            var actionExports, _action, action, app, props, element, component;\n\n            return regeneratorRuntime.wrap(function _callee$(_context) {\n              while (1) {\n                switch (_context.prev = _context.next) {\n                  case 0:\n                    _context.next = 2;\n                    return loadjs(url);\n\n                  case 2:\n                    actionExports = _context.sent;\n\n                    if (actionExports) {\n                      _context.next = 5;\n                      break;\n                    }\n\n                    throw errors_1.Errors.exportsCanntNull(url);\n\n                  case 5:\n                    _action = actionExports['default'];\n\n                    if (!(_action == null)) {\n                      _context.next = 8;\n                      break;\n                    }\n\n                    throw errors_1.Errors.canntFindAction(page.name);\n\n                  case 8:\n                    if (chitu.PageMaster.isClass(_action)) {\n                      _context.next = 10;\n                      break;\n                    }\n\n                    return _context.abrupt(\"return\", _action(page, this));\n\n                  case 10:\n                    action = _action;\n                    app = this;\n                    props = {\n                      app: app,\n                      data: page.data,\n                      source: page,\n                      createService: function createService(type) {\n                        return page.createService(type);\n                      }\n                    };\n                    element = React.createElement(action, props);\n                    component = ReactDOM.render(element, page.element);\n                    page.component = component;\n\n                  case 16:\n                  case \"end\":\n                    return _context.stop();\n                }\n              }\n            }, _callee, this);\n          }));\n        };\n      }\n    }]);\n\n    return Application;\n  }(chitu.Application);\n\n  exports.Application = Application;\n}).apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__),\n\t\t\t\t__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));\n//# sourceMappingURL=application.js.map\n\n\n//# sourceURL=webpack:///./out/es5/application.js?");

/***/ }),

/***/ "./out/es5/errors.js":
/*!***************************!*\
  !*** ./out/es5/errors.js ***!
  \***************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;\n\nfunction _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError(\"Cannot call a class as a function\"); } }\n\nfunction _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if (\"value\" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }\n\nfunction _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }\n\n!(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__, exports], __WEBPACK_AMD_DEFINE_RESULT__ = (function (require, exports) {\n  \"use strict\";\n\n  Object.defineProperty(exports, \"__esModule\", {\n    value: true\n  });\n\n  var Errors =\n  /*#__PURE__*/\n  function () {\n    function Errors() {\n      _classCallCheck(this, Errors);\n    }\n\n    _createClass(Errors, null, [{\n      key: \"canntFindAction\",\n      value: function canntFindAction(pageName) {\n        var msg = \"Cannt find action in page '\".concat(pageName, \"', is the exports has default field?\");\n        return new Error(msg);\n      }\n    }, {\n      key: \"exportsCanntNull\",\n      value: function exportsCanntNull(pageName) {\n        var msg = \"Exports of page '\".concat(pageName, \"' is null.\");\n        return new Error(msg);\n      }\n    }]);\n\n    return Errors;\n  }();\n\n  exports.Errors = Errors;\n}).apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__),\n\t\t\t\t__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));\n//# sourceMappingURL=errors.js.map\n\n\n//# sourceURL=webpack:///./out/es5/errors.js?");

/***/ }),

/***/ "./out/es5/index.js":
/*!**************************!*\
  !*** ./out/es5/index.js ***!
  \**************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;\n\n!(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__, exports, __webpack_require__(/*! ./application */ \"./out/es5/application.js\")], __WEBPACK_AMD_DEFINE_RESULT__ = (function (require, exports, application_1) {\n  \"use strict\";\n\n  Object.defineProperty(exports, \"__esModule\", {\n    value: true\n  });\n  exports.Application = application_1.Application;\n  exports.Page = application_1.Page;\n}).apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__),\n\t\t\t\t__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__)); // export { dataPage, DataPageContext, DataPageProps, DataPageState } from './data-page'\n// import './css/index.css'\n// import './css/minirefresh.css'\n//# sourceMappingURL=index.js.map\n\n\n//# sourceURL=webpack:///./out/es5/index.js?");

/***/ }),

/***/ "maishu-chitu":
/*!*******************************!*\
  !*** external "maishu-chitu" ***!
  \*******************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = __WEBPACK_EXTERNAL_MODULE_maishu_chitu__;\n\n//# sourceURL=webpack:///external_%22maishu-chitu%22?");

/***/ }),

/***/ "react":
/*!************************!*\
  !*** external "react" ***!
  \************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = __WEBPACK_EXTERNAL_MODULE_react__;\n\n//# sourceURL=webpack:///external_%22react%22?");

/***/ }),

/***/ "react-dom":
/*!****************************!*\
  !*** external "react-dom" ***!
  \****************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = __WEBPACK_EXTERNAL_MODULE_react_dom__;\n\n//# sourceURL=webpack:///external_%22react-dom%22?");

/***/ })

/******/ })});;