var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports", "react", "./controls/page-spiner", "minirefresh", "./css/minirefresh.css"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    const React = require("react");
    const page_spiner_1 = require("./controls/page-spiner");
    const MiniRefreshTools = require("minirefresh");
    require("./css/minirefresh.css");
    function dataPage(options) {
        options = options || {};
        return function (constructor) {
            return class DataPageContainer extends React.Component {
                constructor(props) {
                    super(props);
                    this.pageIndex = 0;
                    this.loadMoreResults = [];
                    this.dataPageContext = {};
                }
                createMiniRefresh(container) {
                    let miniRefresh = new MiniRefreshTools.theme.defaults({
                        container,
                        down: {
                            offset: 30,
                            callback: () => {
                                if (this.pageSpiner == null)
                                    throw new Error("Page spiner is null");
                                this.pageSpiner.load();
                                miniRefresh.endDownLoading(true);
                            }
                        },
                        up: {
                            isAuto: false,
                            callback: () => __awaiter(this, void 0, void 0, function* () {
                                if (!options.loadMore) {
                                    miniRefresh.endUpLoading(true);
                                    return;
                                }
                                let result = yield options.loadMore(this.pageIndex++);
                                this.loadMoreResults.push(result);
                                let state = { loadMoreResults: this.loadMoreResults };
                                if (this.component == null)
                                    throw new Error('Component is null');
                                this.component.setState(state);
                                if (result == null || (Array.isArray(result) && result.length == 0)) {
                                    miniRefresh.endUpLoading(true);
                                    return;
                                }
                                miniRefresh.endUpLoading(false);
                            }),
                            toTop: {
                                isEnable: false
                            }
                        },
                        isScrollBar: false,
                    });
                }
                load() {
                    this.pageIndex = 0;
                    this.loadMoreResults = [];
                    return options.load();
                }
                render() {
                    let sectionClassName = "minirefresh-wrap";
                    if (options.header)
                        sectionClassName = sectionClassName + " header-padding";
                    if (options.footer)
                        sectionClassName = sectionClassName + " footer-padding";
                    let header = options.header ? options.header(this.dataPageContext) : null;
                    let footer = options.footer ? options.footer(this.dataPageContext) : null;
                    return React.createElement(React.Fragment, null,
                        options.header ?
                            React.createElement("header", { ref: e => this.headerElement = e || this.headerElement }, header) : null,
                        React.createElement(page_spiner_1.PageSpiner, { load: () => this.load(), ref: e => this.pageSpiner = e || this.pageSpiner },
                            React.createElement(page_spiner_1.PageSpinerContext.Consumer, null, args => {
                                let headerHeight = 0;
                                if (this.headerElement != null) {
                                    for (let i = 0; i < this.headerElement.children.length; i++) {
                                        let item = this.headerElement.children.item(i);
                                        if (!item)
                                            continue;
                                        headerHeight = headerHeight + item.clientHeight;
                                    }
                                }
                                let footerHeight = 0;
                                if (this.footerElement != null) {
                                    for (let i = 0; i < this.footerElement.children.length; i++) {
                                        let item = this.footerElement.children.item(i);
                                        if (!item)
                                            continue;
                                        footerHeight = footerHeight + item.clientHeight;
                                    }
                                }
                                let props = Object.assign({}, this.props, {
                                    loadResult: args.result, ref: (e) => this.dataPageContext.component = this.component = e || this.component,
                                    dataContext: this.dataPageContext
                                });
                                return React.createElement("section", { style: { height: `calc(100% - ${headerHeight + footerHeight}px)`, marginTop: headerHeight, marginBottom: footerHeight }, ref: e => e ? this.createMiniRefresh(e) : null },
                                    React.createElement("div", { className: "minirefresh-scroll", style: { height: '100%' } }, React.createElement(constructor, props)));
                            })),
                        options.footer ?
                            React.createElement("footer", { ref: e => this.footerElement = e || this.footerElement }, footer) : null);
                }
            };
        };
    }
    exports.dataPage = dataPage;
});
