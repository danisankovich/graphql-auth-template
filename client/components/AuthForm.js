import React, { Component } from 'react';

class AuthForm extends Component {
  constructor(props) {
    super(props);

    this.state = {
      email: '',
      username: '',
      password: '',
    }
  }
  onSubmit(e) {
    e.preventDefault();
    const { username, email, password } = this.state;
    this.props.onSubmit({ username, email, password });
  }

  render() {
    return (
      <div className="row">
        <form className="col s6" onSubmit={this.onSubmit.bind(this)}>
          <div className="input-field">
            <input
              placeholder={`Username ${this.props.isLogin ? 'or Email' : ''}`}
              value={this.state.username}
              onChange={e => this.setState({username: e.target.value})}
              type="text"
            />
          </div>
          {!this.props.isLogin && <div className="input-field">
            <input
              placeholder="email"
              value={this.state.email}
              onChange={e => this.setState({email: e.target.value})}
              type="email"
            />
          </div>}
          <div className="input-field">
              <input
                placeholder="password"
                value={this.state.password}
                onChange={e => this.setState({password: e.target.value})}
                type="password"
              />
          </div>
          <div className="errors">
            {this.props.errors.map(error => <div key={error}>{error}</div>)}
          </div>
          <button className="btn">Submit</button>
        </form>
      </div>

    );
  }
}

export default AuthForm;
