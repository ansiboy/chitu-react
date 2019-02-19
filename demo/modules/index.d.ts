import React = require("react");
import { DataPageProps, DataPageState } from '../../dist/index';
interface Props extends DataPageProps<number[]> {
}
interface State extends DataPageState<number[]> {
}
export default class IndexPage extends React.Component<Props, State> {
    constructor(props: Props);
    render(): JSX.Element;
}
export {};
