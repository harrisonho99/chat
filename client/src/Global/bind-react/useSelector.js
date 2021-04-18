import { GlobalContextRx } from "./GlobalContextRx"
import { useContext, useEffect, useState } from "react"

const useSelector = (selector) => {
    if (typeof selector !== "function") {
        throw Error("Selector should be a function accept state and return selected state.")
    }
    const { getContext, subscribe } = useContext(GlobalContextRx)
    let selectedContext = selector(getContext())
    const [state, setState] = useState(selectedContext)
    useEffect(() => {
        return subscribe(() => {
            setState(selector(getContext()))
        })
    }, [])
    return state
}
export { useSelector }

