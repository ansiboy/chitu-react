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
                let action = actionExports['default'];
                if (action == null) {
                    throw errors_1.Errors.canntFindAction(page.name);
                }
                // let action: any;
                // if (!chitu.PageMaster.isClass(_action)) {
                //     return _action(page, this)
                // }
                // action = _action as any
                if (isReactComponent(action)) {
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
                }
                else {
                    new action(page);
                }
            });
        }
    }
    exports.Application = Application;
    function isClassComponent(component) {
        return (typeof component === 'function' &&
            !!component.prototype.isReactComponent) ? true : false;
    }
    function isFunctionComponent(component) {
        return (typeof component === 'function' &&
            String(component).includes('return React.createElement')) ? true : false;
    }
    function isReactComponent(component) {
        return (isClassComponent(component) ||
            isFunctionComponent(component)) ? true : false;
    }
});
