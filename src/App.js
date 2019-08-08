import React, { Fragment, Component } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import './App.css';
import axios from 'axios'
import Navbar from './components/layout/Navbar';
import Users from './components/users/Users';
import Search from './components/users/Search';
import Alert from './components/layout/Alert'
import About from './components/pages/About';
import User from './components/users/User'


class App extends Component {
  state = {
    users: [],
    user: {},
    repos: [],
    loading: false,
    alert: null,

  }




  searchUsers = async (text) => {
    console.log("SEARCH USER");
    this.setState({ loading: true })
    const res = await axios.get(`https://api.github.com/search/users?q=${text}&cliend_id=
    ${process.env.REACT_APP_GITHUB_CLIENT_ID}client_secret=
    ${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`);

    this.setState({ users: res.data.items, loading: false });
  }

  // Get a single User
  getUser = async (username) => {
    console.log("INSIDE THE GET USER", username);
    this.setState({ loading: true });

    const res = await axios.get(`https://api.github.com/users/${username}?client_id=
    ${process.env.REACT_APP_GITHUB_CLIENT_ID}client_secret=
    ${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`);
    console.log("res.data", res.data);
    this.setState({ user: res.data, loading: false });
  }




  getUserRepos = async (username) => {
    this.setState({ loading: true });

    const res = await axios.get(`https://api.github.com/users/${username}/repos?per_page=5&sort=created:asc&client_id=
    ${process.env.REACT_APP_GITHUB_CLIENT_ID}client_secret=
    ${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`);
    console.log("Repos", res.data);
    this.setState({ repos: res.data, loading: false });
  }




  clearUsers = () => {
    this.setState({ users: [], loading: false });
  }

  setAlert = (msg, type) => {
    this.setState({ alert: { msg: msg, type: type } });
    setTimeout(() => this.setState({ alert: null }), 5000);
  }



  render() {
    const { users, user, repos, loading } = this.state;
    return (
      <Router>
        <div className="App">
          <Navbar />
          <div className="container">
            <Alert alert={this.state.alert} />
            <Switch>
              <Route
                exact
                path="/"
                render={props => (
                  <Fragment>
                    <Search
                      searchUsers={this.searchUsers}
                      clearUsers={this.clearUsers}
                      showClear={users.length > 0 ? true : false}
                      setAlert={this.setAlert}
                    />
                    <Users
                      loading={loading}
                      users={users}
                    />
                  </Fragment>
                )} />
              <Route exact path="/about" component={About} />
              <Route exact path="/user/:login" render={props => (
                <User
                  {...props}
                  getUser={this.getUser}
                  getUserRepos={this.getUserRepos}
                  user={user}
                  repos={repos}
                  loading={loading}
                />
              )} />
            </Switch>
          </div>

        </div>
      </Router>
    );
  }
}
export default App;
