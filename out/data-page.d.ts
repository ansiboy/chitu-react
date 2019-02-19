import React = require("react");
import { PageSpiner } from "./controls/page-spiner";
import { PageProps } from "./application";
import './css/minirefresh.css';
interface DataPageOptions<R1, R2> {
    load: () => Promise<R1>;
    loadMore?: (pageIndex: number) => Promise<R2>;
    header?: (context: DataPageContext) => JSX.Element;
    footer?: (context: DataPageContext) => JSX.Element;
}
export interface DataPageProps<T> extends PageProps, React.Props<any> {
    loadResult: T;
    dataContext: DataPageContext;
}
export interface DataPageState<T> {
    loadMoreResults: T[];
}
export interface DataPageContext {
    component?: React.Component;
}
export declare function dataPage<R1, R2>(options: DataPageOptions<R1, R2>): <T extends new (props: any) => React.Component<{}, {}, any>>(constructor: T) => {
    new <P extends PageProps, S = {}, R = {}>(props: P): {
        pageSpiner?: PageSpiner | undefined;
        headerElement?: HTMLElement | undefined;
        footerElement?: HTMLElement | undefined;
        component?: React.Component<{}, {}, any> | undefined;
        pageIndex: number;
        loadMoreResults: R2[];
        dataPageContext: DataPageContext;
        createMiniRefresh(container: HTMLElement): void;
        load(): Promise<R1>;
        render(): JSX.Element;
        context: any;
        setState<K extends keyof S>(state: S | ((prevState: Readonly<S>, props: Readonly<P>) => S | Pick<S, K> | null) | Pick<S, K> | null, callback?: (() => void) | undefined): void;
        forceUpdate(callBack?: (() => void) | undefined): void;
        readonly props: Readonly<{
            children?: React.ReactNode;
        }> & Readonly<P>;
        state: Readonly<S>;
        refs: {
            [key: string]: React.ReactInstance;
        };
    };
    contextType?: React.Context<any> | undefined;
};
export {};
