import React = require("react");
import * as chitu from 'maishu-chitu';
export interface PageProps {
    app: Application;
    data: chitu.Page["data"];
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
export declare class Application extends chitu.Application {
    constructor(args?: {
        parser?: chitu.PageNodeParser;
        container?: HTMLElement | {
            [name: string]: HTMLElement;
        };
    });
    protected createDefaultAction(url: string, loadjs: (path: string) => Promise<any>): chitu.Action;
}
