import React, { Component } from 'react';
import Login from './Login';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../css/App.css';
import { appConfig } from '../utils/constants';
import { UserSession } from 'blockstack';
import { configure, User, getConfig } from 'radiks';
import { Connect } from '@blockstack/connect';
import DiagnosticContainer from './DiagnosticContainer';
import WeeklyTracker from './WeeklyTracker';
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import setLoginLoading from '../redux/actions/actions';

const RADIKS_URL = process.env.REACT_APP_QA_URL || 'http://127.0.0.1:1260'; // TODO this will change to wherever our radiks server will be hosted in prod

const makeUserSession = () => {
  return new UserSession({ appConfig });
};

function PrivateRoute({ userSession, children, ...rest }) {
  console.log('rendering');
  return (
    <Route
      {...rest}
      render={s => {
        const location = s.location;
        return userSession && userSession.isUserSignedIn() ? (
          children
        ) : (
          <Redirect
            to={{
              pathname: '/signup',
              state: { from: location },
            }}
          />
        );
      }}
    />
  );
}
class App extends Component {
  constructor(props) {
    super(props);
  }

  state = {
    url: '',
    userSession: undefined,
  };

  async componentDidMount() {
    const userSession = makeUserSession();
    configure({
      apiServer: RADIKS_URL,
      userSession,
    });

    this.setState({ url: window.location.origin, userSession });
  }

  handleSignOut(e) {
    const { userSession } = this.state;
    e.preventDefault();
    userSession.signUserOut(window.location.origin);
  }

  render() {
    const { userSession } = this.state;

    const { url } = this.state;
    const authOptions = {
      redirectTo: '/',
      finished: async ({ userSession }) => {
        configure({
          apiServer: RADIKS_URL,
          userSession,
        });
        await User.createWithCurrentUser();

        this.setState({ url: window.location.origin, userSession });
      },
      appDetails: {
        name: 'Corona Tracker',
        icon: `${url}/icon.png`,
      },
      userSession,
    };

    console.log(userSession);
    return (
      <BrowserRouter>
        <Connect authOptions={authOptions}>
          <div className="App">
            <Switch>
              <PrivateRoute userSession={userSession} exact path="/">
                <div>
                  <DiagnosticContainer userSession={userSession} handleSignOut={this.handleSignOut} />
                </div>
              </PrivateRoute>
              {/* ADD/EDIT ROUTES WITH THEIR COMPONENTS HERE: */}
              <Route path="/signup" component={Login} />
              <Route path="/symptomsurvey" />
              <Route path="/log" component={WeeklyTracker} />
              <Route path="/healthlog" />
              <Route path="/education" />
              <Route path="/map" />
              <Route path="/settings" />
            </Switch>
          </div>
        </Connect>
      </BrowserRouter>
    );
  }
}

const mapStateToProps = ({ loginLoading }) => ({
  loginLoading,
});

const mapDispatchToProps = dispatch => ({
  setLoading(isLoading) {
    return () => {
      dispatch(setLoginLoading(isLoading));
    };
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
