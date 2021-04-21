import { Fragment } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import { Typography, Divider } from '@material-ui/core';
import { Link } from 'react-router-dom';
import AccountCircleTwoToneIcon from '@material-ui/icons/AccountCircleTwoTone';
import ContactlessIcon from '@material-ui/icons/Contactless';
import FiberManualRecordIcon from '@material-ui/icons/FiberManualRecord';
import { SimpleMenu } from './SimpleMenu';
const useStyles = makeStyles((theme) => {
  return {
    list: {
      width: 270,
      paddingTop: theme.spacing(3),
      height: '80%',
    },
    drawer: { position: 'relative' },
    fullList: {
      width: 'auto',
    },
    contactItem: {
      marginTop: theme.spacing(0.3),
    },
    icon: {
      fontSize: '1.6rem',
      verticalAlign: 'middle',
      margin: theme.spacing(1),
      transform: 'rotate(-90deg)',
    },
    visibilityActiveIcon: {
      color: '#00e676',
      fontSize: theme.spacing(2),
    },
    userIcon: {
      color: '#ea80fc',
      fontSize: theme.spacing(4),
    },
    wrapListContact: {
      maxHeight: '100%',
      overflowY: 'scroll',
    },
  };
});
export const SideDrawer = ({
  listMessage,
  anchor,
  toggleDrawer,
  drawerState,
}) => {
  const classes = useStyles();

  const list = (anchor) => (
    <div
      className={classes.list}
      role='presentation'
      onClick={toggleDrawer(anchor, false)}
      onSubmit={toggleDrawer(anchor, false)}
    >
      <Typography align='center' color='secondary' variant='h6'>
        <span>
          List Contacts
          <ContactlessIcon className={classes.icon} />
        </span>
      </Typography>
      <Divider />
      <List className={classes.wrapListContact}>
        {listMessage
          ? listMessage.map((user) => (
              <>
                <Link
                  to={`/chat/${user.id}`}
                  key={user.id}
                  className={classes.contactItem}
                >
                  <ListItem button>
                    <ListItemIcon>
                      <AccountCircleTwoToneIcon className={classes.userIcon} />
                    </ListItemIcon>
                    <ListItemText primary={user.displayName} />
                    <ListItemIcon>
                      <FiberManualRecordIcon
                        titleAccess='online'
                        className={classes.visibilityActiveIcon}
                      />
                    </ListItemIcon>
                  </ListItem>
                </Link>
                <Divider />
              </>
            ))
          : null}
      </List>
      <SimpleMenu />
    </div>
  );
  return (
    <div>
      <Fragment key={anchor}>
        <Drawer
          anchor={anchor}
          open={drawerState[anchor]}
          onClose={toggleDrawer(anchor, false)}
          className={classes.drawer}
        >
          {list(anchor)}
        </Drawer>
      </Fragment>
    </div>
  );
};
