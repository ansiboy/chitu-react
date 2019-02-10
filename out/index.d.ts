import React = require("react");
import * as chitu from 'maishu-chitu';
export interface PageProps {
    app: Application;
    data: chitu.Page["data"];
    source: chitu.Page;
    createService: chitu.Page["createService"];
}
export declare class Page extends chitu.Page {
    component: React.Component;
}
export declare class Application extends chitu.Application {
    protected createDefaultAction(url: string, loadjs: (path: string) => Promise<any>): (page: Page) => Promise<React.FunctionComponentElement<PageProps>>;
}
