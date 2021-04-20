import { Typography, makeStyles, Container, Grid, TextField, } from "@material-ui/core"
import { useForm } from "react-hook-form"
import { connectWS } from "../../helper/connectWS/io"
import { useSelector } from "../../Global/bind-react/useSelector"
import { useEffect } from "react"

const useStyles = makeStyles(() => {
    return (
        {
            chatForm: {
                display: "flex",
            },
            chatInput: {
                margin: "auto",
                width: "80%"
            }
        }
    )
})

export const Chat = () => {
    const { handleSubmit, register, getValues, setValue } = useForm()
    const classes = useStyles()
    const context = useSelector((context) => ({ socketURL: context.socketURL }))
    useEffect(() => {
        connectWS(context.socketURL)
    }, [context.socketURL])

    const onSubmit = (data, e) => {
        const { chat } = getValues()
        if (chat.length < 1) return
        console.log({ data })
        setValue("chat", "")
    }
    return (
        <div>
            <Container>
                <Grid container>
                    <Grid item xs={12}>
                        <Typography variant="h1" align="center">
                            Chat 😈
                        </Typography>
                    </Grid >
                    <Grid item xs={12}>
                        <form className={classes.chatForm} onSubmit={handleSubmit(onSubmit)}>
                            <TextField color="secondary" autoCapitalize="off" autoComplete="off" {...register("chat", { maxLength: 40 })} variant="filled" className={classes.chatInput} />
                        </form>
                    </Grid>
                </Grid>
            </Container>
        </div>
    )
}