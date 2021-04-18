const createGlobalContext = (defaultContext) => {
    let context
    let listOfListener = []
    if (defaultContext) { context = defaultContext }

    function setContext(action) {
        let newContext
        if (typeof action === "function") {
            let partialContext = action(context)
            newContext = Object.assign({}, context, partialContext)
        }
        else if (typeof action === "object") {
            newContext = Object.assign({}, context, action)
        }

        if (newContext !== context) {
            context = newContext
            listOfListener.forEach((listener) => {
                listener()
            })
        }
    }
    function getContext() {
        return context
    }
    function subscribe(listener) {
        listOfListener.push(listener)
        return () => {
            listOfListener = listOfListener.filter(contextListener => contextListener !== listener)
        }
    }

    var globalContext = {
        setContext,
        getContext,
        subscribe
    }
    return globalContext
}
export { createGlobalContext }