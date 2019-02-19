import React = require("react");
import { dataPage, DataPageProps, DataPageState } from '../../dist/index'

interface Props extends DataPageProps<number[]> {

}

interface State extends DataPageState<number[]> {

}

@dataPage({
    async load() {
        let numbers: Number[] = []
        for (let i = 0; i < 15; i++) {
            numbers.push(i)
        }

        return new Promise((resolve, reject) => {
            setTimeout(() => resolve(numbers), 500)
        })
    },
    loadMore(pageIndex: number) {

        if (pageIndex == 2)
            return Promise.resolve([])

        let numbers: Number[] = []
        for (let i = 0; i < 15; i++) {
            numbers.push(i)
        }

        return new Promise((resolve, reject) => {
            setTimeout(() => resolve(numbers), 500)
        })
    },
    header: function () {
        return <div className="text-center" style={{ height: 50, paddingTop: 8 }}>
            <h4>Header</h4>
        </div>
    },
    // footer: function () {
    //     return <div style={{ height: 60 }}>

    //     </div>
    // }
})
export default class IndexPage extends React.Component<Props, State> {
    constructor(props: Props) {
        super(props)

        this.state = { loadMoreResults: [] }
    }
    render() {
        let { loadResult: items } = this.props
        let { loadMoreResults } = this.state
        return <ul className="list-group">
            {items.map(o =>
                <li key={o} className="list-group-item">{o}</li>
            )}
            {loadMoreResults.map(loadMoreResult =>
                loadMoreResult.map(o =>
                    <li key={o} className="list-group-item">{o}</li>
                )
            )}
        </ul>
    }
}