import React from 'react';

/*const App: React.FC = () => {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.tsx</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}*/

import { BrowserRouter as Router, Route } from "react-router-dom";

import routes from "./routes";
import { connect } from 'react-redux';
import * as backendActions from './store/backend/actions';
import {IntlProvider} from 'react-intl';
import msg_en from './messages.en';
import msg_ru from './messages.ru';
import msg_uk from './messages.uk';

import "./App.scss";

export interface Props {
  onInit?: () => void;
}

interface State {
  lang: string;
}

class AppBase extends React.Component<Props, State> {
    constructor(props: Props) {
        super(props);

        let lang = 'uk';

        this.state = {
            lang: lang
        }
    }

    componentDidMount() {
        if(this.props.onInit) this.props.onInit();
    }

    render() {
        const { lang } = this.state;
        let msg = {};
        switch(lang) {
          case 'ru': msg = msg_ru; break;
          case 'en': msg = msg_en; break;
          default: msg = msg_uk; break;
        }
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

export function mapStateToProps() {}

export function mapDispatchToProps(dispatch: Dispatch<actions.EnthusiasmAction>) {
  return {
    onInit: () => dispatch(backendActions.getDocs()),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(AppBase);
