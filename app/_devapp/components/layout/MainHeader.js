import React from "react";
import PropTypes from "prop-types";
// import { connect } from 'react-redux';
// import * as backendSelectors from '../../store/backend/reducer';
// import * as cartSelectors from '../../store/cart/reducer';
import { NavLink } from 'react-router-dom';
import { withStyles } from '@material-ui/styles';
import { AppBar, Toolbar, IconButton, Typography, Button } from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';

const styles = {
	root: {
		background: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)',
		border: 0,
		borderRadius: 3,
		boxShadow: '0 3px 5px 2px rgba(255, 105, 135, .3)',
		color: 'white',
		height: 48,
		padding: '0 30px',
	},
};

class MainHeader extends React.Component {
	constructor(props) {
		super(props);
	}

	render() {
		const { classes } = this.props;

		return (<AppBar position="static">
			<Toolbar>
				<IconButton edge="start" color="inherit" aria-label="menu">
					<MenuIcon />
				</IconButton>
				<Typography variant="h6" >
					DocFlow
				</Typography>
				<Button
					color="inherit"
					to='/app'
					component={NavLink}
				>App</Button>
			</Toolbar>
		</AppBar>);
	}
}

MainHeader.propTypes = {
	path: PropTypes.string,
	routes: PropTypes.array
};

MainHeader.defaultProps = {
	path: '',
	routes: []
};

// function mapStateToProps(state) {
// 	//const data = backendSelectors.getContactsData(state);
// 	//const cartCnt = cartSelectors.getCartCount(state);
// 	return {
// 		//data,
// 		//cartCnt
// 	};
//   }

// export default connect(mapStateToProps)(MainHeader);
export default withStyles(styles)(MainHeader);

