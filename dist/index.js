/*!
 * 
 *  maishu-chitu-react v1.40.0
 *  https://github.com/ansiboy/services-sdk
 *  
 *  Copyright (c) 2016-2018, shu mai <ansiboy@163.com>
 *  Licensed under the MIT License.
 * 
 */
(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory(require("maishu-chitu"), require("react"), require("react-dom"));
	else if(typeof define === 'function' && define.amd)
		define(["maishu-chitu", "react", "react-dom"], factory);
	else {
		var a = typeof exports === 'object' ? factory(require("maishu-chitu"), require("react"), require("react-dom")) : factory(root["maishu-chitu"], root["react"], root["react-dom"]);
		for(var i in a) (typeof exports === 'object' ? exports : root)[i] = a[i];
	}
})(typeof window === 'undefined' ? global : window, function(__WEBPACK_EXTERNAL_MODULE_maishu_chitu__, __WEBPACK_EXTERNAL_MODULE_react__, __WEBPACK_EXTERNAL_MODULE_react_dom__) {
return /******/ (function(modules) { // webpackBootstrap
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
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
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

"use strict";

var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Application = exports.Page = void 0;
const React = __webpack_require__(/*! react */ "react");
const ReactDOM = __webpack_require__(/*! react-dom */ "react-dom");
const chitu = __webpack_require__(/*! maishu-chitu */ "maishu-chitu");
const errors_1 = __webpack_require__(/*! ./errors */ "./out/errors.js");
const data_loader_1 = __webpack_require__(/*! ./data-loader */ "./out/data-loader.js");
class Page extends chitu.Page {
    constructor() {
        super(...arguments);
        this.component = null;
    }
}
exports.Page = Page;
class DefaultPageNodeParser {
    constructor(modulesPath) {
        this.nodes = {};
        this.modulesPath = modulesPath.endsWith("/") ? modulesPath.substr(0, modulesPath.length - 1) : modulesPath;
    }
    parse(pageName) {
        let node = this.nodes[pageName];
        if (node == null) {
            let path = `${pageName}`.split('_').join('/');
            if (this.modulesPath) {
                path = `${this.modulesPath}/${path}`;
            }
            node = { action: this.createDefaultAction(path, (path) => this.loadjs(path)), name: pageName };
            this.nodes[pageName] = node;
        }
        return node;
    }
    createDefaultAction(url, loadjs) {
        return (page, app) => __awaiter(this, void 0, void 0, function* () {
            let actionExports = yield loadjs(url);
            if (!actionExports)
                throw errors_1.Errors.exportsCanntNull(url);
            let action = actionExports.default;
            if (action == null) {
                throw errors_1.Errors.canntFindAction(page.name);
            }
            let props = {
                app: app,
                data: page.data,
                events: {
                    shown: page.shown,
                    showing: page.showing,
                    hidden: page.hidden,
                    hiding: page.hiding,
                },
                source: page,
                createService(type) {
                    return page.createService(type);
                }
            };
            let loadProps = actionExports.loadProps;
            if (typeof loadProps == "function") {
                let partialProps = yield loadProps(page.data, app);
                props = Object.assign(props, partialProps || {});
            }
            let loadData = actionExports.loadData || action[data_loader_1.LOAD_DATA];
            if (typeof loadData == "function") {
                let partialData = yield loadData(props);
                Object.assign(props.data, partialData);
            }
            let element = React.createElement(action, props);
            let component = ReactDOM.render(element, page.element);
            // let component = ReactDOM.hydrate(element, page.element) as React.Component;
            page.component = component;
        });
    }
}
const TargetUrlVariableName = "targetUrl";
const DefaultPage = "index";
class Application extends chitu.Application {
    constructor(args) {
        args = args || {};
        if (args.modulesPath === undefined) {
            args.modulesPath = "modules";
        }
        if (!args.parser)
            args.parser = Application.createPageNodeParser(args.modulesPath);
        super(args);
        args.parser.app = this;
        args.parser.loadjs = (path) => this.loadjs(path);
        this.defaultPage = args.defaultPage || DefaultPage;
        this.pageType = Page;
        let mode = args.mode || "hash";
        if (mode == "history") {
            this.run = () => {
                let routeString = this.getRouteString();
                this.showPage(routeString);
            };
            this.parseUrl = (url) => {
                let searchIndex = url.indexOf("?");
                let search;
                let pathName;
                if (searchIndex > 0) {
                    search = url.substr(searchIndex);
                    pathName = url.substr(0, searchIndex);
                }
                else {
                    pathName = url;
                }
                let routers = args === null || args === void 0 ? void 0 : args.routers;
                let values = {};
                if (routers != null) {
                    for (let i = 0; i < routers.length; i++) {
                        let m = routers[i].match(pathName);
                        if (m) {
                            let { controller, action } = m;
                            if (!controller)
                                throw new Error(`Can not get controller from route data.`);
                            if (!action)
                                throw new Error(`Can not get action from route data.`);
                            Object.assign(values, m);
                            break;
                        }
                    }
                }
                if (search) {
                    let q = search.substr(1);
                    let r = q ? this.pareeUrlQuery(q) : {};
                    Object.assign(values, r);
                }
                let arr = pathName.split("/").filter(o => o);
                let pageName = arr.length == 0 ? "index" : arr.join("_");
                return { pageName, values };
            };
        }
    }
    createPageElement(pageName, containerName) {
        let container = this.containers[containerName];
        if (container == null)
            throw errors_1.Errors.containerNotExist(containerName);
        let e = container.querySelector(`[name="${pageName}"]`);
        if (e == null) {
            e = super.createPageElement(pageName, containerName);
            e.setAttribute("name", pageName);
        }
        return e;
    }
    getRouteString() {
        let routeString = window[TargetUrlVariableName];
        if (!routeString) {
            routeString = location.pathname || this.defaultPage;
            if (location.search) {
                routeString = routeString + location.search;
            }
        }
        routeString = routeString.trim();
        if (routeString[0] == '/') {
            routeString = routeString.substr(1);
        }
        return routeString;
    }
    static createPageNodeParser(modulesPath) {
        let p = new DefaultPageNodeParser(modulesPath);
        return p;
    }
}
exports.Application = Application;


/***/ }),

/***/ "./out/data-loader.js":
/*!****************************!*\
  !*** ./out/data-loader.js ***!
  \****************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
exports.LOAD_PROPS = exports.dataLoader = exports.LOAD_DATA = void 0;
exports.LOAD_DATA = "loadData";
function dataLoader(loadData) {
    return function (constructor) {
        constructor[exports.LOAD_DATA] = loadData;
        return constructor;
    };
}
exports.dataLoader = dataLoader;
exports.LOAD_PROPS = "loadProps";


/***/ }),

/***/ "./out/errors.js":
/*!***********************!*\
  !*** ./out/errors.js ***!
  \***********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
exports.Errors = void 0;
class Errors {
    static canntFindAction(pageName) {
        let msg = `Cannt find action in page '${pageName}', is the exports has default field?`;
        return new Error(msg);
    }
    static exportsCanntNull(pageName) {
        let msg = `Exports of page '${pageName}' is null.`;
        return new Error(msg);
    }
    static containerNotExist(containerName) {
        let msg = `Container ${containerName} is not exists.`;
        return new Error(msg);
    }
}
exports.Errors = Errors;


/***/ }),

/***/ "./out/index.js":
/*!**********************!*\
  !*** ./out/index.js ***!
  \**********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
exports.dataLoader = exports.Page = exports.Application = void 0;
var application_1 = __webpack_require__(/*! ./application */ "./out/application.js");
Object.defineProperty(exports, "Application", { enumerable: true, get: function () { return application_1.Application; } });
Object.defineProperty(exports, "Page", { enumerable: true, get: function () { return application_1.Page; } });
var data_loader_1 = __webpack_require__(/*! ./data-loader */ "./out/data-loader.js");
Object.defineProperty(exports, "dataLoader", { enumerable: true, get: function () { return data_loader_1.dataLoader; } });


/***/ }),

/***/ "maishu-chitu":
/*!*******************************!*\
  !*** external "maishu-chitu" ***!
  \*******************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE_maishu_chitu__;

/***/ }),

/***/ "react":
/*!************************!*\
  !*** external "react" ***!
  \************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE_react__;

/***/ }),

/***/ "react-dom":
/*!****************************!*\
  !*** external "react-dom" ***!
  \****************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE_react_dom__;

/***/ })

/******/ });
});
//# sourceMappingURL=index.js.map