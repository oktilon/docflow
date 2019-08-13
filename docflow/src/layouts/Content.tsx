import React from "react";
import _ from 'lodash';
import PropTypes from "prop-types";
import { Container, Grid } from "@material-ui/core";

import MenuHeader from "../components/layout/MainHeader";
import FloatingCart from "../components/layout/FloatingCart";

const ContentLayout = ({ path, routes, children, noHeader, noFooter }) => {
  const isMenu = _.indexOf(['pizza','fast-food','desserts','drinks'], path) >= 0;
  return (
    <Container>
      <Grid container>
        <Grid item>
          {!noHeader && <MenuHeader noNavigation={false} path={path} routes={routes} />}
          {isMenu && <FloatingCart />}
          <div id="contents">
            {children}
          </div>
        </Grid>
      </Grid>
    </Container>
  );
}

ContentLayout.propTypes = {
  /**
   * Whether to display the navbar, or not.
   */
  noHeader: PropTypes.bool,
  /**
   * Whether to display the footer, or not.
   */
  noFooter: PropTypes.bool,

  path: PropTypes.string
};

ContentLayout.defaultProps = {
  noHeader: false,
  noFooter: false,
  path: ''
};

export default ContentLayout;
