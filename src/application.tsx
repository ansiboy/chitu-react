import React = require("react");
import ReactDOM = require("react-dom");
import * as chitu from 'maishu-chitu'
import { ServiceConstructor, IService, PageNodeParser, PageNode, Action, PageMaster } from "maishu-chitu";
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

class DefaultPageNodeParser implements PageNodeParser {
    private nodes: { [key: string]: PageNode } = {}
    private app: Application;
    private modulesPath: string;
    constructor(app: Application, modulesPath: string) {
        this.app = app;
        this.modulesPath = modulesPath.endsWith("/") ? modulesPath.substr(0, modulesPath.length - 1) : modulesPath;
    }
    parse(pageName: string) {
        let node = this.nodes[pageName];
        if (node == null) {
            let path = `${pageName}`.split('_').join('/');
            if (this.modulesPath) {
                path = `${this.modulesPath}/${path}`;
            }
            node = { action: this.createDefaultAction(path, this.loadjs), name: pageName };
            this.nodes[pageName] = node;
        }
        return node;
    }

    private createDefaultAction(url: string, loadjs: (path: string) => Promise<any>): chitu.Action {
        return async (page: chitu.Page) => {
            let actionExports = await (loadjs as LoadJS)(url);
            if (!actionExports)
                throw Errors.exportsCanntNull(url);

            let action = actionExports['default']
            if (action == null) {
                throw Errors.canntFindAction(page.name);
            }

            if (isReactComponent(action)) {
                let app = this.app;
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

    private loadjs(path: string) {
        return new Promise<Array<any>>((reslove, reject) => {
            requirejs([path],
                function (result: any) {
                    reslove(result);
                },
                function (err: Error) {
                    reject(err);
                });
        });
    }
}

export class Application extends chitu.Application {

    private __defaultPageNodeParser: PageNodeParser;

    constructor(args?: {
        parser?: chitu.PageNodeParser;
        /** 页面容器 */
        container?: HTMLElement | { [name: string]: HTMLElement };
        /** 模块路径 */
        modulesPath?: string,
    }) {

        args = args || {}
        if (args.modulesPath === undefined) {
            args.modulesPath = "modules";
        }

        super(args)

        this.pageCreated.add((sender, page) => {
            page.element.className = "page"
        })

        this.__defaultPageNodeParser = new DefaultPageNodeParser(this, args.modulesPath);
    }

    get defaultPageNodeParser() {
        return this.__defaultPageNodeParser;
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





