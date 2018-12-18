import React = require("react");
import ReactDOM = require("react-dom");
import * as chitu from 'maishu-chitu'

type LoadJS = (path: string) => Promise<{
    defalut: (props: any, app: chitu.PageMaster) => React.ReactElement<any> | {
        new(props: any, app: chitu.PageMaster): React.ReactElement<any>;
    };
}>;

export class Page extends chitu.Page {
    component: React.Component
}

export class Application extends chitu.Application {
    protected createDefaultAction(url: string, loadjs: (path: string) => Promise<any>) {
        return async (page: Page) => {
            let actionExports = await (loadjs as LoadJS)(url);
            if (!actionExports)
                throw chitu.Errors.exportsCanntNull(url);

            let _action = actionExports['default']
            if (_action == null) {
                throw chitu.Errors.canntFindAction(page.name);
            }

            let action: any;
            if (chitu.PageMaster.isClass(_action)) {
                action = _action as any
            }
            else {
                action = _action as any
            }

            let app = this as Application
            let props = Object.assign({}, page.data, { app })
            let element = React.createElement(action, props)
            let component = ReactDOM.render(element, page.element) as any as React.Component
            page.component = component
            return element;
        }
    }
}

