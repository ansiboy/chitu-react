import React = require("react");
import * as chitu from 'maishu-chitu';
import { PageNodeParser } from "maishu-chitu";
import { Router } from "maishu-router";
export interface PageProps {
    app: Application;
    data: {
        [key: string]: any;
    };
    source: Page;
    createService: chitu.Page["createService"];
    events: {
        showing: chitu.Page["showing"];
        shown: chitu.Page["shown"];
        hiding: chitu.Page["hiding"];
        hidden: chitu.Page["hidden"];
    };
}
export declare class Page extends chitu.Page {
    component: React.Component | null;
}
declare class DefaultPageNodeParser implements PageNodeParser {
    private nodes;
    private modulesPath;
    app: Application;
    loadjs: (path: string) => Promise<any>;
    constructor(modulesPath: string);
    parse(pageName: string): chitu.PageNode;
    private createDefaultAction;
}
export declare class Application extends chitu.Application {
    private defaultPage;
    constructor(args?: {
        parser?: chitu.PageNodeParser;
        /** 页面容器 */
        container?: HTMLElement | {
            [name: string]: HTMLElement;
        };
        /** 页面路径, 默认为 modules */
        modulesPath?: string;
        mode?: "history" | "hash";
        routers?: Router[];
        defaultPage?: string;
    });
    createPageElement(pageName: string, containerName: string): HTMLElement;
    private getRouteString;
    static createPageNodeParser(modulesPath: string): DefaultPageNodeParser;
}
export {};
