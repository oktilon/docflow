import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";

import routes from "./routes";
import { connect } from 'react-redux';
import * as backendActions from './store/backend/actions';
import {IntlProvider} from 'react-intl';
import messages from './messages';

//import "bootstrap/dist/css/bootstrap.min.css";
import "./App.scss";

class AppBase extends React.Component {
    constructor(props) {
        super(props);

        let lang = 'uk';

        this.state = {
            lang: lang
        }
    }

    componentDidMount() {
        this.props.dispatch(backendActions.fetchMenu());
    }

    render() {
        const { lang } = this.state;
        const msg = messages[lang];
        return (<IntlProvider locale={lang} messages={msg}>
            <Router basename="docflow">
                {routes.map((route, index) => {
                    const regPath = /\/(.*)/.exec(route.path);
                    const pathName = regPath ? regPath[1].toLowerCase() : '';
                    return (
                        <Route
                            key={index}
                            path={route.path}
                            exact={route.exact}
                            component={props => {
                                return (
                                    <route.layout path={pathName} routes={routes} {...props}>
                                        {route.component ? <route.component {...props} /> : false}
                                    </route.layout>
                                );
                            }}
                        />
                    );
                })}
            </Router>
        </IntlProvider>);
    }
}

export default connect()(AppBase);