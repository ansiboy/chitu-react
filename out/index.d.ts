import React = require("react");
import * as chitu from 'maishu-chitu';
export declare class Page extends chitu.Page {
    component: React.Component;
}
export declare class Application extends chitu.Application {
    protected createDefaultAction(url: string, loadjs: (path: string) => Promise<any>): (page: Page) => Promise<React.DetailedReactHTMLElement<React.InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>>;
}
