import React, { Component } from 'react';
import { Link, browserHistory } from 'react-router';
import ajax from 'superagent';
import '../../semantic/dist/semantic.min.css';
import '../../node_modules/normalize.css/normalize.css';

export default class SigninComponent extends Component{


  constructor(props){
    super(props);
    this.state = {
      isError: false,
      errMsg: ''
    }
    this.handleEmailInput = this.handleEmailInput.bind(this);
    this.handlePassInput = this.handlePassInput.bind(this);
    this.handleLoginSubmit = this.handleLoginSubmit.bind(this);
  }



  handleEmailInput(e){
    this.setState({
      isError: false,
    });
  }
  handlePassInput(e){
    this.setState({
      isError: false,
    });
  }
  handleLoginSubmit(e){
    let email = this.email.value.trim();
    let password = this.password.value.trim();

    if(email === '' || password === ''){
      this.setState({
        isError: true,
        errMsg: '用户名和密码不能为空'
      });
    }

    ajax.get('http://localhost/api/login')
    .query({ username: email })
    .query({ password: password})
    .withCredentials()
    .end((err,res) => {

      if(err){
        this.setState({
          isError: true,
          errMsg: '网络错误'
        });
        console.log(err);
      }
      else{

        if(res.statusCode != 200){
          this.setState({
            isError: true,
            errMsg: '网络错误'
          });
        }
        else{
          if(res.body.code != 0){
            this.setState({
              isError: true,
              errMsg: res.body.msg
            });
          }
          else{

            this.setState({
              isError: false,
              errMsg: ''
            });
            console.log(res.body);
            sessionStorage.setItem('username', email);
            sessionStorage.setItem('token', res.body.data.token);
            sessionStorage.setItem('csrf', res.body.data.csrf_token);
            browserHistory.push('/');

          }
        }
      }

    });


  }

  render(){

    let containerStyle = {backgroundColor: '#DADADA', height: '100%'};
    let columnStyle = {maxWidth: '450px'};

    let errMsg;
    if(this.state.isError){
      errMsg = <div className='ui message error'>{this.state.errMsg}</div>
    }
    else{
      errMsg = <div></div>
    }

    return (
      <div style={[containerStyle, columnStyle]}>
        <div className="ui middle aligned center aligned grid" style={containerStyle}>
          <div className="column" style={columnStyle}>
            <h2 className="ui teal image header">
              <img src="/img/logo.png" className="image"/>
              <div className="content">
                Log-in to your account
              </div>
            </h2>
            <form className="ui large form">
              <div className="ui stacked segment">
                <div className="field">
                  <div className="ui left icon input">
                    <i className="user icon"></i>
                    <input type="text" name="email" placeholder="E-mail address"
                      ref={(ref)=>(this.email = ref)}
                      onChange={this.handleEmailInput}
                      />
                  </div>
                </div>
                <div className="field">
                  <div className="ui left icon input">
                    <i className="lock icon"></i>
                    <input type="password" name="password" placeholder="Password"
                      ref={(ref)=>(this.password = ref)}
                      onChange = {this.handlePasswordInput}
                      />
                  </div>
                </div>
                <div className="ui fluid large teal submit button"
                  onClick = {this.handleLoginSubmit}>Login</div>
              </div>
            </form>
            {errMsg}
            <div className="ui message">
              New to us? <i><Link to="/signup">Sign Up</Link></i>
            </div>
          </div>
        </div>
    </div>
    );
  }
}
