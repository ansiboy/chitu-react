
/*
 * maishu-chitu-react v1.2.6
 * https://github.com/ansiboy/chitu-react
 *
 * Copyright (c) 2016-2018, shu mai <ansiboy@163.com>
 * Licensed under the MIT License.
 *
 */
(function(f){if(typeof exports==="object"&&typeof module!=="undefined"){module.exports=f()}else if(typeof define==="function"&&define.amd){define([],f)}else{var g;if(typeof window!=="undefined"){g=window}else if(typeof global!=="undefined"){g=global}else if(typeof self!=="undefined"){g=self}else{g=this}g.maishuChituReact = f()}})(function(){var define,module,exports;return (function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const React = require("react");
const ReactDOM = require("react-dom");
const chitu = require("maishu-chitu");
const errors_1 = require("./errors");
class Page extends chitu.Page {
    constructor() {
        super(...arguments);
        this.component = null;
    }
}
exports.Page = Page;
class Application extends chitu.Application {
    constructor(args) {
        super(args);
        this.pageCreated.add((sender, page) => {
            page.element.className = "page";
        });
    }
    createDefaultAction(url, loadjs) {
        return (page) => __awaiter(this, void 0, void 0, function* () {
            let actionExports = yield loadjs(url);
            if (!actionExports)
                throw errors_1.Errors.exportsCanntNull(url);
            let _action = actionExports['default'];
            if (_action == null) {
                throw errors_1.Errors.canntFindAction(page.name);
            }
            let action;
            if (!chitu.PageMaster.isClass(_action)) {
                return _action(page, this);
            }
            action = _action;
            let app = this;
            let props = {
                app,
                data: page.data,
                source: page,
                createService(type) {
                    return page.createService(type);
                }
            };
            let element = React.createElement(action, props);
            let component = ReactDOM.render(element, page.element);
            page.component = component;
        });
    }
}
exports.Application = Application;

},{"./errors":2,"maishu-chitu":"maishu-chitu","react":"react","react-dom":"react-dom"}],2:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Errors {
    static canntFindAction(pageName) {
        let msg = `Cannt find action in page '${pageName}', is the exports has default field?`;
        return new Error(msg);
    }
    static exportsCanntNull(pageName) {
        let msg = `Exports of page '${pageName}' is null.`;
        return new Error(msg);
    }
}
exports.Errors = Errors;

},{}],3:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var application_1 = require("./application");
exports.Application = application_1.Application;
exports.Page = application_1.Page;
// export { dataPage, DataPageContext, DataPageProps, DataPageState } from './data-page'
// import './css/index.css'
// import './css/minirefresh.css'

},{"./application":1}]},{},[3])(3)
});
