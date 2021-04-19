import { Fragment } from 'react';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import Button from '@material-ui/core/Button';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import { Link, useRouteMatch } from "react-router-dom"
import AccountCircleTwoToneIcon from '@material-ui/icons/AccountCircleTwoTone';
const useStyles = makeStyles({
    list: {
        width: 250,
    },
    fullList: {
        width: 'auto',
    },
});
export const SideDrawer = ({ listMessage, anchor, toggleDrawer, drawerState }) => {
    const classes = useStyles();

    const list = (anchor) => (
        <div
            className={clsx(classes.list, {
                [classes.fullList]: anchor === 'top' || anchor === 'bottom',
            })}
            role="presentation"
            onClick={toggleDrawer(anchor, false)}
            onKeyDown={toggleDrawer(anchor, false)}
        >
            <List>
                {
                    listMessage ? listMessage.map((user) => (
                        <Link to={`/chat/${user.id}`} key={user.id} >
                            <ListItem button >
                                <ListItemIcon><AccountCircleTwoToneIcon /></ListItemIcon>
                                <ListItemText primary={user.displayName} />
                            </ListItem>
                        </Link>
                    )) : null
                }
            </List>
        </div>
    );
    return (
        <div>
            <Fragment key={anchor}>
                <Button >{anchor}</Button>
                <Drawer anchor={anchor} open={drawerState[anchor]} onClose={toggleDrawer(anchor, false)}>
                    {list(anchor)}
                </Drawer>
            </Fragment>
        </div>
    );
}
