import React, {Component} from 'react';
import {Link, browserHistory} from 'react-router';
import ajax from 'superagent';

export default class HomeComponent extends Component{

  constructor(props){
    super(props);
    this.state = {
      username: ''
    }

    this.handleLogoutClick = this.handleLogoutClick.bind(this);
  }

  componentWillMount() {
    let username = sessionStorage.getItem('username');
    if(username == '' || username == null){
      browserHistory.push('/signin');
    }
  }

  componentDidMount() {
    let username = sessionStorage.getItem('username');
    this.setState({
      username: username
    });
  }

  handleLogoutClick(e){
    let csrf = sessionStorage.getItem('csrf');
    console.log(csrf);
    ajax.post('http://localhost/api/logout')
        .set("x-csrf-token", csrf)
        .withCredentials()
        .end((err, res) => {
            if(err){

            }
            else{
              if(res.statusCode == 200){
                sessionStorage.setItem('username','');
                sessionStorage.setItem('token', '');
                sessionStorage.setItem('csrf', '');
                this.setState({
                  username: ''
                });
                browserHistory.push('/signin');
              }
            }
        });


  }

  render(){

    let containerStyle = {marginTop: '7em'};
    let username = this.state.username;

    return (

      <div>
        <div className="ui fixed inverted menu">
            <div className="ui container">
              <a href="#" className="header item">
                <img className="logo" src="/img/logo.png" />
                Welcome {this.state.username}
              </a>
              <a href="#" className="item">Home</a>
              <div className="ui simple dropdown item">
                Account <i className="dropdown icon"></i>
                <div className="menu">
                  <a className="item" href="#">Info</a>
                  <i className="item" onClick={this.handleLogoutClick}>Logout</i>

                </div>
              </div>
            </div>
          </div>

          <div className="ui main text container" style={containerStyle}>
            <h1 className="ui header">Balance</h1>
            <p>This is a basic fixed menu template using fixed size containers.</p>
            <p>A text container is used for the main container, which is useful for single column layouts</p>
          </div>

          <div className="ui inverted vertical footer segment">
            <div className="ui center aligned container">
              <div className="ui stackable inverted divided grid">
                <div className="three wide column">
                  <h4 className="ui inverted header">Group 1</h4>
                  <div className="ui inverted link list">
                    <a href="#" className="item">Link One</a>
                    <a href="#" className="item">Link Two</a>
                    <a href="#" className="item">Link Three</a>
                    <a href="#" className="item">Link Four</a>
                  </div>
                </div>
                <div className="three wide column">
                  <h4 className="ui inverted header">Group 2</h4>
                  <div className="ui inverted link list">
                    <a href="#" className="item">Link One</a>
                    <a href="#" className="item">Link Two</a>
                    <a href="#" className="item">Link Three</a>
                    <a href="#" className="item">Link Four</a>
                  </div>
                </div>
                <div className="three wide column">
                  <h4 className="ui inverted header">Group 3</h4>
                  <div className="ui inverted link list">
                    <a href="#" className="item">Link One</a>
                    <a href="#" className="item">Link Two</a>
                    <a href="#" className="item">Link Three</a>
                    <a href="#" className="item">Link Four</a>
                  </div>
                </div>
                <div className="seven wide column">
                  <h4 className="ui inverted header">Footer Header</h4>
                  <p>Extra space for a call to action inside the footer that could help re-engage users.</p>
                </div>
              </div>
              <div className="ui inverted section divider"></div>
              <img src="/img/logo.png" className="ui centered mini image"/>
              <div className="ui horizontal inverted small divided link list">
                <a className="item" href="#">Site Map</a>
                <a className="item" href="#">Contact Us</a>
                <a className="item" href="#">Terms and Conditions</a>
                <a className="item" href="#">Privacy Policy</a>
              </div>
            </div>
          </div>
      </div>
    );
  }
}
