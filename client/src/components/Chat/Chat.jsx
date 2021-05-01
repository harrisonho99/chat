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

import { useEffect, useState, useRef } from 'react';
import MoodIcon from '@material-ui/icons/Mood';
import { Emoji } from '../../common/Emoji';
import { useParams } from 'react-router-dom';
import { privateRequest } from '../../helper/request/request';
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
  const setContext = useSetGlobalContext();
  const socket = useRef(null);
  const context = useSelector((context) => ({
    socketURL: context.socketURL,
    socketMobileURL: context.socketMobileURL,
    id: context.id,
    displayName: context.displayName,
  }));

  // handle socket
  useEffect(() => {
    privateRequest()({ method: 'post', data: {} })
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
    // socket.current = connectWS(context.socketURL);
    // socket.current.auth = {
    //   userID: context.id,
    //   displayName: context.displayName,
    // };
    // socket.current.connect();
    // // socket.current.on("connect", () => {
    // socket.current.on('users', (users) => {
    //   console.log(users);
    //   if (Array.isArray(users)) {
    //     setContext({ listUserActive: users });
    //   }
    // });
    // socket.current.on('session', (data) => {
    //   const { sessionID, userID } = data;
    //   socket.current.auth = { sessionID };
    //   localStorage.setItem('sessionID', sessionID);
    //   socket.current.userID = userID;
    // });

    // let sessionID;
    // try {
    //   sessionID = window.localStorage['sessionID'];
    // } catch (error) {
    //   console.log(error);
    // }
    // if (sessionID) {
    //   socket.current.auth = {
    //     sessionID,
    //     userID: context.id,
    //     displayName: context.displayName,
    //   };
    //   socket.current.connect();
    // }
    // socket.current.emit('private message', {
    //   content: 'hello from ' + context.displayName,
    //   sender: context.id,
    //   receiver: param,
    // });

    // socket.current.on('private message', (data) => {
    //   console.log(data);
    // });

    // socket.current.on('connect_error', (error) => {
    //   console.log(error);
    // });
    // return () => {
    //   socket.current.destroy();
    // };
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
    console.log(socket.current);
    console.log({ chat });
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
