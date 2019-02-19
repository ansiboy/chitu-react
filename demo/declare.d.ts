declare module 'minirefresh' {
    interface Options {
        container: string | HTMLElement,
        down?: {
            /** 触发下拉的阈值，当下拉距离大于这个阈值后，在松开时会触发下拉刷新 */
            offset?: number,
            callback: () => void
        },
        up?: {
            callback: () => void
            /** 提示没有更多数据 */
            contentnomore?: string,
            /** 是否初始化时自动执行一次上拉加载（会同时有动画和回调），当下拉的down的isAuto生效时，这个不会生效 */
            isAuto?: false,
        },

        /** 是否显示滚动条，为false时会将滚动条宽度设为0 */
        isScrollBar: boolean,
    }
    class MiniRefreshTheme {
        constructor(options: Options);

        endDownLoading(isSuccess: boolean, successTips?: string): void

        /**
         * 结束上拉加载
         * @param isFinishUp 默认为false，是否没有更多数据，如果为true，会变为没有更多数据，不能继续加载更多，直到下拉刷新后更新状态或者主动resetUp状态才能继续加载
         */
        endUpLoading(isFinishUp: boolean): void
    }

    // export  let defaults = MiniRefreshTheme
    namespace theme {
        class defaults extends MiniRefreshTheme {
            constructor(options: Options & {
                up?: Options['up'] & {
                    toTop?: {
                        isEnable?: boolean
                    }
                }
            });
        }
    }


    // export = MiniRefreshTools
}