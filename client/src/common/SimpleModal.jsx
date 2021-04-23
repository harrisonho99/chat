import { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import { TextField, Button, Typography } from '@material-ui/core';
import { useForm } from 'react-hook-form';
import PersonAddIcon from '@material-ui/icons/PersonAdd';
function getModalStyle() {
  return {
    top: `35%`,
    left: `50%`,
    transform: `translate(-50%, -50%)`,
  };
}

const useStyles = makeStyles((theme) => ({
  paper: {
    position: 'absolute',
    width: 400,
    backgroundColor: theme.palette.background.paper,
    border: '2px solid rgb(255, 244, 229)',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
    borderRadius: 5,
  },
  form: {
    display: 'flex',
    height: 48,
    width: '100%',
    justifyContent: 'space-evenly',
    alignItems: 'center',
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(2),
  },
  submitButton: {
    height: '100%',
  },

}));

export function SimpleModal({ isModelOpen }) {
  const classes = useStyles();
  const [modalStyle] = useState(getModalStyle);
  const { register, reset, handleSubmit } = useForm();

  const handleClose = () => { };
  const onAddNewbox = (data) => {
    console.log(data);
    reset();
  };
  const body = (
    <div
      style={modalStyle}
      className={classes.paper}
      onClick={(event) => {
        event.stopPropagation();
      }}
      onChange={(event) => {
        event.stopPropagation();
      }}
    >
      <Typography align='center' variant='h5' color='secondary'>
        Enter Username
      </Typography>
      <form onSubmit={handleSubmit(onAddNewbox)} className={classes.form}>
        <TextField
          size="small"
          className={classes.input}
          autoCapitalize='off'
          autoComplete='off'
          defaultValue=''
          type='text'
          {...register('addNewInbox', { minLength: 1 })}
          color='secondary'
          variant='filled'
        />
        <Button
          size='large'
          type='submit'
          variant='contained'
          color='secondary'
          className={classes.submitButton}
        >
          <PersonAddIcon />
        </Button>
      </form>
    </div>
  );

  return (
    <div>
      <Modal
        open={isModelOpen}
        onClose={handleClose}
        aria-labelledby='simple-modal-title'
        aria-describedby='simple-modal-description'
      >
        {body}
      </Modal>
    </div>
  );
}
