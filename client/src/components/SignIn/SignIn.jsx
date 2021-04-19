import { BasicForm } from "../../common/BasicForm"
import { useSetGlobalContext } from "../../Global/bind-react/useSetGlobal"
import { useHistory } from "react-router-dom"
export const SignIn = () => {
    const history = useHistory()
    const setGlobal = useSetGlobalContext()
    const handleSubmit = (data) => {
        let validForm = false
        for (let key in data) {
            validForm = !!data[key]
        }
        if (validForm) {
            setGlobal({ auth: true })
            history.push("/chat")
        }
    }
    return (
        <BasicForm title="SIGN IN 😝" submitForm={handleSubmit} />
    )
}