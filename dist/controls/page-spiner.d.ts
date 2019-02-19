import React = require("react");
interface Props extends React.Props<PageSpiner> {
    load: () => Promise<any>;
}
interface State {
    status: 'Loading' | 'LoadSuccess' | 'LoadFail';
}
export declare let PageSpinerContext: React.Context<{
    result: null;
}>;
export declare class PageSpiner extends React.Component<Props, State> {
    loadResult: any;
    constructor(props: Props);
    componentDidMount(): void;
    load(): Promise<void>;
    render(): JSX.Element;
}
export {};
