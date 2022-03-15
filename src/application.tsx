import React = require("react");
import ReactDOM = require("react-dom");
import * as chitu from 'maishu-chitu'
import { ServiceConstructor, IService, PageNodeParser, PageNode, Action, PageMaster } from "maishu-chitu";
import { Errors } from "./errors";
import { LOAD_DATA } from "./data-loader";
import { Router } from "maishu-router";

type LoadJS = (path: string) => Promise<ComponentModule>;

export interface ComponentModule {
    default: React.ComponentClass<any>,
    loadData?: (props: any) => Promise<any>;
}

export interface PageProps {
    app: Application,
    data: { [key: string]: any },
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
    component: React.Component | null = null;
}

class DefaultPageNodeParser implements PageNodeParser {
    private nodes: { [key: string]: PageNode } = {}
    private modulesPath: string;

    app: Application;
    loadjs: (path: string) => Promise<any>;

    constructor(modulesPath: string) {
        this.modulesPath = modulesPath.endsWith("/") ? modulesPath.substr(0, modulesPath.length - 1) : modulesPath;
    }


    parse(pageName: string) {
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

    private createDefaultAction(url: string, loadjs: (path: string) => Promise<any>): chitu.Action {
        return async (page, app) => {
            let actionExports = await (loadjs as LoadJS)(url);
            if (!actionExports)
                throw Errors.exportsCanntNull(url);

            let action = actionExports.default
            if (action == null) {
                throw Errors.canntFindAction(page.name);
            }

            let props = {
                app: app as Application,
                data: page.data as { [key: string]: any },
                events: {
                    shown: page.shown,
                    showing: page.showing,
                    hidden: page.hidden,
                    hiding: page.hiding,
                },
                source: page as Page,
                createService<T extends IService>(type?: ServiceConstructor<T>) {
                    return page.createService<T>(type);
                }
            };

            let loadData = actionExports.loadData || action[LOAD_DATA];

            if (typeof loadData == "function") {
                let partialData = await loadData(props);
                Object.assign(props.data, partialData);
            }

            let element = React.createElement(action, props);
            let component = ReactDOM.render(element, page.element) as any as React.Component
            // let component = ReactDOM.hydrate(element, page.element) as React.Component;
            (page as Page).component = component;
        }
    }
}

const TargetUrlVariableName = "targetUrl";
const DefaultPage = "index";

export class Application extends chitu.Application {

    private defaultPage: string;

    constructor(args?: {
        parser?: chitu.PageNodeParser;
        /** 页面容器 */
        container?: HTMLElement | { [name: string]: HTMLElement };
        /** 页面路径, 默认为 modules */
        modulesPath?: string,
        mode?: "history" | "hash",
        routers?: Router[],
        defaultPage?: string,
    }) {

        args = args || {}
        if (args.modulesPath === undefined) {
            args.modulesPath = "modules";
        }

        if (!args.parser)
            args.parser = Application.createPageNodeParser(args.modulesPath);


        super(args);

        (args.parser as DefaultPageNodeParser).app = this;
        (args.parser as DefaultPageNodeParser).loadjs = (path) => this.loadjs(path);
        this.defaultPage = args.defaultPage || DefaultPage;

        this.pageType = Page;
        let mode = args.mode || "hash";
        if (mode == "history") {
            this.run = () => {
                let routeString = this.getRouteString();
                this.showPage(routeString);
            }

            this.parseUrl = (url) => {
                let searchIndex = url.indexOf("?");
                let search: string | undefined;
                let pathName: string;
                if (searchIndex > 0) {
                    search = url.substr(searchIndex);
                    pathName = url.substr(0, searchIndex);
                }
                else {
                    pathName = url;
                }

                let routers = args?.routers;
                let values: { [key: string]: string } = {};
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

            }

        }
    }


    createPageElement(pageName: string, containerName: string) {
        let container = this.containers[containerName];
        if (container == null)
            throw Errors.containerNotExist(containerName);

        let e = container.querySelector(`[name="${pageName}"]`) as HTMLElement;
        if (e == null) {
            e = super.createPageElement(pageName, containerName);
            e.setAttribute("name", pageName);
        }
        return e;
    }

    private getRouteString(): string {
        let routeString: string = window[TargetUrlVariableName];
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





    static createPageNodeParser(modulesPath: string) {
        let p = new DefaultPageNodeParser(modulesPath);
        return p;
    }
}






