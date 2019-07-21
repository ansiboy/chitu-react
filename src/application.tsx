import React = require("react");
import ReactDOM = require("react-dom");
import * as chitu from 'maishu-chitu'
import { ServiceConstructor, IService } from "maishu-chitu";
import { Errors } from "./errors";

type LoadJS = (path: string) => Promise<{
    default: (props: any, app: chitu.PageMaster) => React.ReactElement<any> | {
        new(props: any, app: chitu.PageMaster): React.ReactElement<any>;
    };
}>;

export interface PageProps {
    app: Application,
    data: chitu.Page["data"],
    source: chitu.Page,
    createService: chitu.Page["createService"]
}

export class Page extends chitu.Page {
    component: React.Component | null = null
}

export class Application extends chitu.Application {
    constructor(args?: {
        parser?: chitu.PageNodeParser;
        container?: HTMLElement | { [name: string]: HTMLElement };
    }) {
        super(args)

        this.pageCreated.add((sender, page) => {
            page.element.className = "page"
        })
    }
    protected createDefaultAction(url: string, loadjs: (path: string) => Promise<any>): chitu.Action {
        return async (page: chitu.Page) => {
            let actionExports = await (loadjs as LoadJS)(url);
            if (!actionExports)
                throw Errors.exportsCanntNull(url);

            let _action = actionExports['default']
            if (_action == null) {
                throw Errors.canntFindAction(page.name);
            }

            let action: any;
            // if (!chitu.PageMaster.isClass(_action)) {
            //     return _action(page, this)
            // }

            action = _action as any
            let app = this as Application
            let props: PageProps = {
                app,
                data: page.data as { [key: string]: any },
                source: page,
                createService<T extends IService>(type?: ServiceConstructor<T>) {
                    return page.createService<T>(type)
                }
            }
            let element = React.createElement(action, props)
            let component = ReactDOM.render(element, page.element) as any as React.Component
            (page as Page).component = component
        }
    }
}




