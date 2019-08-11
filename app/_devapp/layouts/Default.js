import React from "react";
import PropTypes from "prop-types";

import MainHeader from "../components/layout/MainHeader";
import { Container } from "@material-ui/core";

const DefaultLayout = ({ path, routes, children }) => (
    <Container>
        <MainHeader path={path} routes={routes} />
        <div id="body">
            {children}
        </div>
    </Container>
);

DefaultLayout.propTypes = {
    path: PropTypes.string,
    routes: PropTypes.array
};

DefaultLayout.defaultProps = {
    path: '',
    routes: []
};

export default DefaultLayout;
