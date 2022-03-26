"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Application = exports.Page = void 0;
const React = require("react");
const ReactDOM = require("react-dom");
const chitu = require("maishu-chitu");
const errors_1 = require("./errors");
const data_loader_1 = require("./data-loader");
class Page extends chitu.Page {
    constructor() {
        super(...arguments);
        this.component = null;
    }
}
exports.Page = Page;
class DefaultPageNodeParser {
    constructor(modulesPath) {
        this.nodes = {};
        this.modulesPath = modulesPath.endsWith("/") ? modulesPath.substr(0, modulesPath.length - 1) : modulesPath;
    }
    parse(pageName) {
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
    createDefaultAction(url, loadjs) {
        return (page, app) => __awaiter(this, void 0, void 0, function* () {
            let actionExports = yield loadjs(url);
            if (!actionExports)
                throw errors_1.Errors.exportsCanntNull(url);
            let action = actionExports.default;
            if (action == null) {
                throw errors_1.Errors.canntFindAction(page.name);
            }
            let props = {
                app: app,
                data: page.data,
                events: {
                    shown: page.shown,
                    showing: page.showing,
                    hidden: page.hidden,
                    hiding: page.hiding,
                },
                source: page,
                createService(type) {
                    return page.createService(type);
                }
            };
            let loadProps = actionExports.loadProps;
            if (typeof loadProps == "function") {
                let partialProps = yield loadProps(page.data, app);
                props = Object.assign(props, partialProps || {});
            }
            let loadData = actionExports.loadData || action[data_loader_1.LOAD_DATA];
            if (typeof loadData == "function") {
                let partialData = yield loadData(props);
                Object.assign(props.data, partialData);
            }
            let element = React.createElement(action, props);
            let component = ReactDOM.render(element, page.element);
            // let component = ReactDOM.hydrate(element, page.element) as React.Component;
            page.component = component;
        });
    }
}
const TargetUrlVariableName = "targetUrl";
const DefaultPage = "index";
class Application extends chitu.Application {
    constructor(args) {
        args = args || {};
        if (args.modulesPath === undefined) {
            args.modulesPath = "modules";
        }
        if (!args.parser)
            args.parser = Application.createPageNodeParser(args.modulesPath);
        super(args);
        args.parser.app = this;
        args.parser.loadjs = (path) => this.loadjs(path);
        this.defaultPage = args.defaultPage || DefaultPage;
        this.pageType = Page;
        let mode = args.mode || "hash";
        if (mode == "history") {
            this.run = () => {
                let routeString = this.getRouteString();
                this.showPage(routeString);
            };
            this.parseUrl = (url) => {
                let searchIndex = url.indexOf("?");
                let search;
                let pathName;
                if (searchIndex > 0) {
                    search = url.substr(searchIndex);
                    pathName = url.substr(0, searchIndex);
                }
                else {
                    pathName = url;
                }
                let routers = args === null || args === void 0 ? void 0 : args.routers;
                let values = {};
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
            };
        }
    }
    createPageElement(pageName, containerName) {
        let container = this.containers[containerName];
        if (container == null)
            throw errors_1.Errors.containerNotExist(containerName);
        let e = container.querySelector(`[name="${pageName}"]`);
        if (e == null) {
            e = super.createPageElement(pageName, containerName);
            e.setAttribute("name", pageName);
        }
        return e;
    }
    getRouteString() {
        let routeString = window[TargetUrlVariableName];
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
    static createPageNodeParser(modulesPath) {
        let p = new DefaultPageNodeParser(modulesPath);
        return p;
    }
}
exports.Application = Application;
