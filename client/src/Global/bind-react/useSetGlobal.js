import { GlobalContextRx } from "./GlobalContextRx"
import { useContext } from "react"
const useSetGlobalContext = () => {
    return useContext(GlobalContextRx).setContext
}
export { useSetGlobalContext }