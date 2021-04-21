import { useState } from 'react';
import { IconButton, makeStyles } from '@material-ui/core';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import AddCircleRoundedIcon from '@material-ui/icons/AddCircleRounded';
import { SimpleModal } from './SimpleModal';

const useStyle = makeStyles((theme) => {
  return {
    additionalIcon: {
      fontSize: theme.spacing(6),
    },
    additionalButton: {
      position: 'absolute',
      bottom: theme.spacing(4),
      right: theme.spacing(2),
    },
  };
});
export function SimpleMenu() {
  const [anchorEl, setAnchorEl] = useState(null);
  const [isModelOpen, setModalOpen] = useState(false);
  const classes = useStyle();
  const handleClick = (event) => {
    event.stopPropagation();
    setAnchorEl(event.currentTarget);
  };

  const handleClose = (event) => {
    event.stopPropagation();
    setAnchorEl(null);
    setModalOpen(true)
  };

  return (
    <div>
      <IconButton
        aria-controls='simple-menu'
        aria-haspopup='true'
        aria-label='more'
        color='secondary'
        onClick={handleClick}
        className={classes.additionalButton}
      >
        <AddCircleRoundedIcon className={classes.additionalIcon} />
      </IconButton>
      <Menu
        id='simple-menu'
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        <MenuItem onClick={handleClose}>New Inbox</MenuItem>
        {/* <MenuItem onClick={handleClose}>My account</MenuItem>
        <MenuItem onClick={handleClose}>Logout</MenuItem> */}
      </Menu>
      <SimpleModal isModelOpen={isModelOpen} />
    </div>
  );
}
