import React from "react";
import { NavLink  } from "react-router-dom";
import Grid from '@material-ui/core/Grid';

const BottomNav = ({ item, path }) => {
    let cls = [];
    const m = /\/(.*)/.exec(item.path);
    if(m && m[1] == path) cls.push('selected');
    if(item.last) cls.push('last');
    return (
        <Grid className={cls.join(' ')}>
            <NavLink to={item.path}>{item.title}</NavLink>
        </Grid>
    );
}

export default BottomNav;
