import React = require("react");
import { DataPageProps } from '../../src';
interface Props extends DataPageProps<number[]> {
}
export default class IndexPage extends React.Component<Props> {
    render(): JSX.Element;
}
export {};
