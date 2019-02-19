import React = require("react");
import { PageSpiner, PageSpinerContext } from "./controls/page-spiner";
import MiniRefreshTools = require('minirefresh');
import { PageProps } from "./application";
import { MiniRefreshTheme } from "minirefresh";
import './css/minirefresh.css'

interface DataPageOptions<R1, R2> {
    load: () => Promise<R1>,
    loadMore?: (pageIndex: number) => Promise<R2>,
    header?: (context: DataPageContext) => JSX.Element,
    footer?: (context: DataPageContext) => JSX.Element
}

export interface DataPageProps<T> extends PageProps, React.Props<any> {
    loadResult: T,
    dataContext: DataPageContext
}

export interface DataPageState<T> {
    loadMoreResults: T[]
}

export interface DataPageContext {
    component?: React.Component
}

export function dataPage<R1, R2>(options: DataPageOptions<R1, R2>) {
    options = options || {}

    return function <T extends { new(props: any): React.Component }>(constructor: T) {
        return class DataPageContainer<P extends PageProps, S={}, R={}> extends React.Component<P, S> {

            pageSpiner?: PageSpiner;
            headerElement?: HTMLElement;
            footerElement?: HTMLElement;
            component?: React.Component<{}, {}, any>;

            pageIndex: number = 0
            loadMoreResults: R2[] = []
            dataPageContext: DataPageContext = {}


            constructor(props: P) {
                super(props)
            }
            createMiniRefresh(container: HTMLElement) {
                let miniRefresh: MiniRefreshTheme = new MiniRefreshTools.theme.defaults({
                    container,
                    down: {
                        offset: 30,
                        callback: () => {
                            if (this.pageSpiner == null)
                                throw new Error("Page spiner is null")

                            this.pageSpiner.load()
                            miniRefresh.endDownLoading(true)
                        }
                    },
                    up: {
                        isAuto: false,
                        callback: async () => {
                            if (!options.loadMore) {
                                miniRefresh.endUpLoading(true)
                                return
                            }

                            let result = await options.loadMore(this.pageIndex++)
                            this.loadMoreResults.push(result)
                            let state: DataPageState<R2> = { loadMoreResults: this.loadMoreResults }
                            if (this.component == null)
                                throw new Error('Component is null')

                            this.component.setState(state)
                            if (result == null || (Array.isArray(result) && result.length == 0)) {
                                miniRefresh.endUpLoading(true)
                                return
                            }

                            miniRefresh.endUpLoading(false)
                        },
                        toTop: {
                            isEnable: false
                        }
                    },
                    isScrollBar: false,
                })
            }
            load() {
                this.pageIndex = 0
                this.loadMoreResults = []
                return options.load()
            }
            render() {
                let sectionClassName = "minirefresh-wrap"
                if (options.header)
                    sectionClassName = sectionClassName + " header-padding"

                if (options.footer)
                    sectionClassName = sectionClassName + " footer-padding"

                let header = options.header ? options.header(this.dataPageContext) : null
                let footer = options.footer ? options.footer(this.dataPageContext) : null
                return <>
                    {options.header ?
                        <header ref={e => this.headerElement = e || this.headerElement}>
                            {header}
                        </header> : null}
                    <PageSpiner load={() => this.load()} ref={e => this.pageSpiner = e || this.pageSpiner}>
                        <PageSpinerContext.Consumer>
                            {args => {
                                let headerHeight = 0
                                if (this.headerElement != null) {
                                    for (let i = 0; i < this.headerElement.children.length; i++) {
                                        let item = this.headerElement.children.item(i)
                                        if (!item)
                                            continue

                                        headerHeight = headerHeight + item.clientHeight
                                    }
                                }

                                let footerHeight = 0
                                if (this.footerElement != null) {
                                    for (let i = 0; i < this.footerElement.children.length; i++) {
                                        let item = this.footerElement.children.item(i)
                                        if (!item)
                                            continue

                                        footerHeight = footerHeight + item.clientHeight
                                    }
                                }

                                let props: DataPageProps<R1> = Object.assign({}, this.props, {
                                    loadResult: args.result as any as R1, ref: (e: React.Component) => this.dataPageContext.component = this.component = e || this.component,
                                    dataContext: this.dataPageContext
                                })
                                return <section style={{ height: `calc(100% - ${headerHeight + footerHeight}px)`, marginTop: headerHeight, marginBottom: footerHeight }}
                                    ref={e => e ? this.createMiniRefresh(e) : null}>
                                    <div className="minirefresh-scroll" style={{ height: '100%' }}>
                                        {React.createElement(constructor, props)}
                                    </div>
                                </section>
                            }}
                        </PageSpinerContext.Consumer>
                    </PageSpiner>
                    {options.footer ?
                        <footer ref={e => this.footerElement = e || this.footerElement}>
                            {footer}
                        </footer> : null}
                </>
            }
        }
    }
}