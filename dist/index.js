/*!
 * 
 *  maishu-chitu-react v1.5.16
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
/******/ 	return __webpack_require__(__webpack_require__.s = "./out/index.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./out/application.js":
/*!****************************!*\
  !*** ./out/application.js ***!
  \****************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {\r\n    return new (P || (P = Promise))(function (resolve, reject) {\r\n        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }\r\n        function rejected(value) { try { step(generator[\"throw\"](value)); } catch (e) { reject(e); } }\r\n        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }\r\n        step((generator = generator.apply(thisArg, _arguments || [])).next());\r\n    });\r\n};\r\n!(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__, exports, __webpack_require__(/*! react */ \"react\"), __webpack_require__(/*! react-dom */ \"react-dom\"), __webpack_require__(/*! maishu-chitu */ \"maishu-chitu\"), __webpack_require__(/*! ./errors */ \"./out/errors.js\")], __WEBPACK_AMD_DEFINE_RESULT__ = (function (require, exports, React, ReactDOM, chitu, errors_1) {\r\n    \"use strict\";\r\n    Object.defineProperty(exports, \"__esModule\", { value: true });\r\n    class Page extends chitu.Page {\r\n        constructor() {\r\n            super(...arguments);\r\n            this.component = null;\r\n        }\r\n    }\r\n    exports.Page = Page;\r\n    class Application extends chitu.Application {\r\n        constructor(args) {\r\n            super(args);\r\n            this.pageCreated.add((sender, page) => {\r\n                page.element.className = \"page\";\r\n            });\r\n        }\r\n        createDefaultAction(url, loadjs) {\r\n            return (page) => __awaiter(this, void 0, void 0, function* () {\r\n                let actionExports = yield loadjs(url);\r\n                if (!actionExports)\r\n                    throw errors_1.Errors.exportsCanntNull(url);\r\n                let _action = actionExports['default'];\r\n                if (_action == null) {\r\n                    throw errors_1.Errors.canntFindAction(page.name);\r\n                }\r\n                let action;\r\n                if (!chitu.PageMaster.isClass(_action)) {\r\n                    return _action(page, this);\r\n                }\r\n                action = _action;\r\n                let app = this;\r\n                let props = {\r\n                    app,\r\n                    data: page.data,\r\n                    source: page,\r\n                    createService(type) {\r\n                        return page.createService(type);\r\n                    }\r\n                };\r\n                let element = React.createElement(action, props);\r\n                let component = ReactDOM.render(element, page.element);\r\n                page.component = component;\r\n            });\r\n        }\r\n    }\r\n    exports.Application = Application;\r\n}).apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__),\n\t\t\t\t__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));\r\n\n\n//# sourceURL=webpack:///./out/application.js?");

/***/ }),

/***/ "./out/errors.js":
/*!***********************!*\
  !*** ./out/errors.js ***!
  \***********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;!(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__, exports], __WEBPACK_AMD_DEFINE_RESULT__ = (function (require, exports) {\r\n    \"use strict\";\r\n    Object.defineProperty(exports, \"__esModule\", { value: true });\r\n    class Errors {\r\n        static canntFindAction(pageName) {\r\n            let msg = `Cannt find action in page '${pageName}', is the exports has default field?`;\r\n            return new Error(msg);\r\n        }\r\n        static exportsCanntNull(pageName) {\r\n            let msg = `Exports of page '${pageName}' is null.`;\r\n            return new Error(msg);\r\n        }\r\n    }\r\n    exports.Errors = Errors;\r\n}).apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__),\n\t\t\t\t__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));\r\n\n\n//# sourceURL=webpack:///./out/errors.js?");

/***/ }),

/***/ "./out/index.js":
/*!**********************!*\
  !*** ./out/index.js ***!
  \**********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;!(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__, exports, __webpack_require__(/*! ./application */ \"./out/application.js\")], __WEBPACK_AMD_DEFINE_RESULT__ = (function (require, exports, application_1) {\r\n    \"use strict\";\r\n    Object.defineProperty(exports, \"__esModule\", { value: true });\r\n    exports.Application = application_1.Application;\r\n    exports.Page = application_1.Page;\r\n}).apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__),\n\t\t\t\t__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));\r\n// export { dataPage, DataPageContext, DataPageProps, DataPageState } from './data-page'\r\n// import './css/index.css'\r\n// import './css/minirefresh.css'\r\n\n\n//# sourceURL=webpack:///./out/index.js?");

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