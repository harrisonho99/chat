import { PureComponent } from "react"
import { GlobalContextRx } from "./GlobalContextRx"
class Provider extends PureComponent {
    render() {
        return (
            <GlobalContextRx.Provider value={this.props.context}>
                {this.props.children}
            </GlobalContextRx.Provider>
        )
    }
}
export { Provider }