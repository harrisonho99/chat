// import { useState } from 'react';
// import Button from '@material-ui/core/Button';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';
import { makeStyles } from '@material-ui/core/styles';

function Alert(props) {
  return <MuiAlert elevation={6} variant='filled' {...props} />;
}

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    '& > * + *': {
      marginTop: theme.spacing(2),
    },
  },
}));
// severity = "error" | "warning" | "info" | "success"
export function SimpleSnackbar({
  open = true,
  setOpen,
  onClose,
  severity = 'info',
  message = '',
  autoHideDuration = 3000,
}) {
  const classes = useStyles();
  const handleClose = (_, reason) => {
    if (typeof onClose === 'function') {
      onClose();
    }
    if (reason === 'clickaway') {
      return;
    }
    if (typeof setOpen === 'function') {
      setOpen(false);
    }
  };

  return (
    <div className={classes.root}>
      <Snackbar
        open={open}
        autoHideDuration={autoHideDuration}
        onClose={handleClose}
      >
        <Alert onClose={handleClose} severity={severity}>
          {message}
        </Alert>
      </Snackbar>
    </div>
  );
}
