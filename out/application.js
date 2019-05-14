var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
define(["require", "exports", "react", "react-dom", "maishu-chitu", "./errors"], function (require, exports, React, ReactDOM, chitu, errors_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
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
                // if (!chitu.PageMaster.isClass(_action)) {
                //     return _action(page, this)
                // }
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
});
