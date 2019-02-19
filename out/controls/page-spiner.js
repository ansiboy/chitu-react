(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports", "react"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    const React = require("react");
    exports.PageSpinerContext = React.createContext({ result: null });
    class PageSpiner extends React.Component {
        constructor(props) {
            super(props);
            this.state = { status: 'Loading' };
        }
        componentDidMount() {
            this.load();
        }
        load() {
            this.setState({ status: 'Loading' });
            return this.props.load().then(o => {
                this.loadResult = o;
                this.setState({ status: 'LoadSuccess' });
            }).catch(o => {
                this.setState({ status: 'LoadFail' });
            });
        }
        render() {
            let { status } = this.state;
            switch (status) {
                case 'Loading':
                    return React.createElement("div", { style: { paddingTop: 200, textAlign: 'center' } },
                        React.createElement("i", { className: "icon-spinner icon-spin", style: { marginRight: 4 } }),
                        React.createElement("span", null, "\u6570\u636E\u6B63\u5728\u52A0\u8F7D\u4E2D"));
                case 'LoadSuccess':
                    return React.createElement(exports.PageSpinerContext.Provider, { value: { result: this.loadResult } }, this.props.children);
                case 'LoadFail':
                    return React.createElement("div", { style: { paddingTop: 200, textAlign: 'center' } },
                        React.createElement("div", { onClick: () => this.load() }, "\u6570\u636E\u52A0\u8F7D\u5931\u8D25\uFF0C\u70B9\u51FB\u91CD\u65B0\u52A0\u8F7D"));
            }
        }
    }
    exports.PageSpiner = PageSpiner;
});
