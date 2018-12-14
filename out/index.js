var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports", "react", "react-dom", "maishu-chitu"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    const React = require("react");
    const ReactDOM = require("react-dom");
    const chitu = require("maishu-chitu");
    class Application extends chitu.Application {
        createDefaultAction(url, loadjs) {
            return (page) => __awaiter(this, void 0, void 0, function* () {
                let actionExports = yield loadjs(url);
                if (!actionExports)
                    throw chitu.Errors.exportsCanntNull(url);
                let _action = actionExports['default'];
                if (_action == null) {
                    throw chitu.Errors.canntFindAction(page.name);
                }
                let action;
                if (chitu.PageMaster.isClass(_action)) {
                    action = _action;
                }
                else {
                    action = _action;
                }
                let app = this;
                let props = Object.assign({}, page.data, { app });
                let element = React.createElement(action, props);
                ReactDOM.render(element, page.element);
                return element;
            });
        }
    }
    exports.Application = Application;
});
