import React, {Component} from 'react';
import {Link} from 'react-router';

export default class SignupComponent extends Component{

  constructor(props){
    super(props);
    this.state = {
      isError: false,
    }
    this.handleEmailInput = this.handleEmailInput.bind(this);
    this.handlePasswordInput = this.handlePasswordInput.bind(this);
    this.handleRePasswordInput = this.handleRePasswordInput.bind(this);
    this.handleSignUpSubmit = this.handleSignUpSubmit.bind(this);
  }

  handleEmailInput(e){

  }
  handlePasswordInput(e){

  }
  handleRePasswordInput(e){

  }
  handleSignUpSubmit(e){
    e.preventDefault();
    console.log(e);
  }

  render(){
      let containerStyle = {backgroundColor: '#DADADA', height: '100%'};
      let columnStyle = {maxWidth: '450px'};

      return (
        <div style={[containerStyle, columnStyle]}>
          <div className="ui middle aligned center aligned grid" style={containerStyle}>
            <div className="column" style={columnStyle}>
              <h2 className="ui teal image header">
                <img src="/img/logo.png" className="image"/>
                <div className="content">
                  Register a New Account
                </div>
              </h2>
              <form className="ui large form">
                <div className="ui stacked segment">
                  <div className="field">
                    <div className="ui left icon input">
                      <i className="user icon"></i>
                      <input type="text" name="email" placeholder="E-mail address"/>
                    </div>
                  </div>
                  <div className="field">
                    <div className="ui left icon input">
                      <i className="lock icon"></i>
                      <input type="password" name="password" placeholder="Password"
                        ref={(ref) => (this.password = ref)}
                        onChange={this.handlePasswordInput}/>
                    </div>
                  </div>
                  <div className="field">
                    <div className="ui left icon input">
                      <i className="lock icon"></i>
                      <input type="password" name="password" placeholder="Retype Password"
                        ref={(ref)=>(this.repassword = ref)}
                        onChange={this.handleRePasswordInput}/>
                    </div>
                  </div>
                  <div className="ui fluid large teal submit button"
                    onClick={this.handleSignUpSubmit}>
                    Sign Up
                  </div>
                </div>

                <div className="ui error message"></div>

              </form>

              <div className="ui message">
                Already have an Account? <i><Link to="/signin">Sign In</Link></i>
              </div>
            </div>
          </div>
      </div>
    );
  }
}
