// use cookie instead
const PERSIST = "persist"
export const persistLocalStorage = (setContext) => {
    try {
        const persist = JSON.parse(window.localStorage[PERSIST]);
        if (persist == null) {
            setContext({
                id: null,
                auth: false,
                token: null,
                refreshToken: null,
                displayName: null,
                socketID: null,
            });
        }
        else {
            setContext(persist);
        }
    } catch (error) {
        console.log(error);
    }
};

export const setLocalStorage = (info, setContext) => {
    try {
        localStorage.removeItem(PERSIST)
        window.localStorage[PERSIST] = JSON.stringify(info)
        setContext(info)
    } catch (error) {
        console.log(error)
    }
}

export const removeLocalStorage = () => {
    localStorage.removeItem(PERSIST)
}