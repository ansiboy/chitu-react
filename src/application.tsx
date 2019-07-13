import React = require("react");
import ReactDOM = require("react-dom");
import * as chitu from 'maishu-chitu'
import { ServiceConstructor, IService } from "maishu-chitu";
import { Errors } from "./errors";

type LoadJS = (path: string) => Promise<{ default: any }>;

export interface PageProps {
    app: Application,
    data: chitu.Page["data"],
    source: Page,
    createService: chitu.Page["createService"],
    events: {
        showing: chitu.Page["showing"],
        shown: chitu.Page["shown"],
        hiding: chitu.Page["hiding"],
        hidden: chitu.Page["hidden"],

    }
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

            let action = actionExports['default']
            if (action == null) {
                throw Errors.canntFindAction(page.name);
            }

            // let action: any;
            // if (!chitu.PageMaster.isClass(_action)) {
            //     return _action(page, this)
            // }

            // action = _action as any
            if (isReactComponent(action)) {
                let app = this as Application
                let props: PageProps = {
                    app,
                    data: page.data as { [key: string]: any },
                    events: {
                        shown: page.shown,
                        showing: page.showing,
                        hidden: page.hidden,
                        hiding: page.hiding,
                    },
                    source: page as Page,
                    createService<T extends IService>(type?: ServiceConstructor<T>) {
                        return page.createService<T>(type)
                    }
                }

                let element = React.createElement(action, props)
                let component = ReactDOM.render(element, page.element) as any as React.Component
                (page as Page).component = component
            }
            else {
                new action(page);
            }
        }
    }
}

function isClassComponent(component: any) {
    return (
        typeof component === 'function' &&
        !!component.prototype.isReactComponent
    ) ? true : false
}

function isFunctionComponent(component: any) {
    return (
        typeof component === 'function' &&
        String(component).includes('return React.createElement')
    ) ? true : false;
}

function isReactComponent(component: any) {
    return (
        isClassComponent(component) ||
        isFunctionComponent(component)
    ) ? true : false;
}





