
/*
 * maishu-chitu-react v1.5.6
 * https://github.com/ansiboy/chitu-react
 *
 * Copyright (c) 2016-2018, shu mai <ansiboy@163.com>
 * Licensed under the MIT License.
 *
 */define('out/errors',["require", "exports"], function (require, exports) {
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
});

var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
define('out/application',["require", "exports", "react", "react-dom", "maishu-chitu", "./errors"], function (require, exports, React, ReactDOM, chitu, errors_1) {
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
});

define('out/index.js',["require", "exports", "./application"], function (require, exports, application_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.Application = application_1.Application;
    exports.Page = application_1.Page;
});
// export { dataPage, DataPageContext, DataPageProps, DataPageState } from './data-page'
// import './css/index.css'
// import './css/minirefresh.css'
;
