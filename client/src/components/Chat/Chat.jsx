import {
  Typography,
  makeStyles,
  Container,
  Grid,
  TextField,
  Button,
} from '@material-ui/core';
import { useForm } from 'react-hook-form';
import { connectWS } from '../../helper/connectWS/io';
import { useSelector } from '../../Global/bind-react/useSelector';
import { useEffect } from 'react';

const useStyles = makeStyles((theme) => {
  return {
    chatForm: {
      display: 'flex',
      justifyContent: 'center',
    },
    chatInput: {
      margin: 'auto 1rem',
      width: '80%',
      fontSize: theme.spacing(2),
    },
    chatButton: {
      marginRight: theme.spacing(3),
      width: theme.spacing(18),
    },
    gridForm: {
      position: 'fixed',
      bottom: 0,
      left: 0,
      width: '100%',
      paddingBottom: theme.spacing(3),
    },
  };
});

export const Chat = () => {
  const { handleSubmit, register, reset } = useForm();
  const classes = useStyles();
  const context = useSelector((context) => ({
    socketURL: context.socketURL,
    id: context.id,
  }));
  useEffect(() => {
    const socket = connectWS(context.socketURL);
    socket.auth = { id: context.id };
    socket.connect();
    socket.on('users', (users) => {
      console.log(users);
    });
    socket.on("message", (data) => {
      console.log(data)
    })
  }, [context.socketURL, context.id]);

  const onSubmit = (data, e) => {
    const { chat } = data;
    if (!chat && chat.length < 1) return;
    console.log({ data });
    reset();
  };
  return (
    <div>
      <Container>
        <Grid container>
          <Grid item xs={12}>
            <Typography variant='h1' align='center'>
              Chat 😈
            </Typography>
          </Grid>
          <Grid item xs={12} className={classes.gridForm}>
            <form
              className={classes.chatForm}
              onSubmit={handleSubmit(onSubmit)}
            >
              <TextField
                color='secondary'
                autoCapitalize='off'
                autoComplete='off'
                defaultValue=''
                {...register('chat', { maxLength: 40 })}
                variant='filled'
                className={classes.chatInput}
                size='medium'
              />
              <Button
                type='submit'
                className={classes.chatButton}
                children='Send'
                size='large'
                variant='contained'
                color='secondary'
              />
            </form>
          </Grid>
        </Grid>
      </Container>
    </div>
  );
};
