import './Chat.css';
import {
  Typography,
  makeStyles,
  Container,
  Grid,
  TextField,
  Button,
  IconButton,
} from '@material-ui/core';
import { connectWS } from '../../helper/connectWS/io';
import { useSelector } from '../../Global/bind-react/useSelector';
import { useSetGlobalContext } from '../../Global/bind-react/useSetGlobal';

import { useEffect, useState } from 'react';
import MoodIcon from '@material-ui/icons/Mood';
import { Emoji } from '../../common/Emoji';
import { useParams } from "react-router-dom"

const useStyles = makeStyles((theme) => {
  return {
    chatForm: {
      display: 'flex',
      justifyContent: 'center',
      position: 'relative',
    },
    chatInput: {
      margin: 'auto 1rem',
      width: '80%',
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
    iconButton: {
      width: 'fit-content',
      color: theme.palette.secondary.main,
      padding: 5,
      margin: '0 5px 0 0',
      position: 'relative',
    },
    faceIcon: {
      fontSize: theme.spacing(4),
    },
  };
});


export const Chat = () => {
  const [isShowEmojiPicker, setShowEmojiPicker] = useState(false);
  const classes = useStyles();
  const { id: param } = useParams();
  const [chat, setChat] = useState('');
  const setContext = useSetGlobalContext()
  const context = useSelector((context) => ({
    socketURL: context.socketURL,
    socketMobileURL: context.socketMobileURL,
    id: context.id,
    displayName: context.displayName
  }));



  // handle socket
  useEffect(() => {
    const socket = connectWS(context.socketURL);
    socket.auth = { id: context.id, displayName: context.displayName };
    socket.connect();

    socket.on('users', (users) => {
      if (Array.isArray(users)) {
        setContext({ listUserActive: users })
      }
    });
    socket.emit("private message", {
      chat,
      from: context.id,
      to: param
    })
    socket.on("connect_error", (error) => {
      console.log(error)
    })
    // socket.onAny((event, ...args) => {
    //   setCheckSocket(socket.active)
    // });
    // disconnect socket when unmounting
    return () => {
      socket.disconnect();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [context.socketURL, context.id]);



  // Emoji Picker
  useEffect(() => {
    const blur = () => {
      setShowEmojiPicker(false);
    };
    document.addEventListener('click', blur);
    return () => {
      document.removeEventListener('click', blur);
    };
  });


  //handle Emoji
  const onSelectEmoji = (emoji) => {
    setChat(chat + emoji.native.toString());
  };
  const handleToggleEmoji = () => {
    setShowEmojiPicker(!isShowEmojiPicker);
  };
  //handle form
  const handleSubmit = (event) => {
    event.preventDefault();
    if (!chat && chat.length < 1) return;

    console.log({ chat });
    // if (socket && param) {
    //   socket.emit("private message", {
    //     chat,
    //     from: context.id,
    //     to: param
    //   })
    // }
    setShowEmojiPicker(false);
    setChat('');

  };
  const handleChatChange = (event) => {
    setChat(event.target.value);
  };
  return (
    <div>
      <Container>
        <Grid container>
          <Grid item xs={12}>
            <Typography variant='h2' align='center'>
              Chat 😁
            </Typography>
          </Grid>
          <Grid item xs={12} className={classes.gridForm}>
            <form
              className={classes.chatForm}
              onSubmit={handleSubmit}
              onClick={(e) => {
                e.stopPropagation();
              }}
            >
              <TextField
                id='input-wrapper'
                color='secondary'
                autoCapitalize='off'
                autoComplete='off'
                value={chat}
                onChange={handleChatChange}
                variant='filled'
                className={classes.chatInput}
                size='medium'
                InputProps={{
                  startAdornment: (
                    <IconButton
                      onClick={handleToggleEmoji}
                      position='start'
                      className={classes.iconButton}
                    >
                      {isShowEmojiPicker ? (
                        <Emoji onSelectEmoji={onSelectEmoji} />
                      ) : null}
                      <MoodIcon className={classes.faceIcon} />
                    </IconButton>
                  ),
                }}
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
