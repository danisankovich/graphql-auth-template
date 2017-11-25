import React, { Component } from 'react';
import { hashHistory, Link } from 'react-router';

class Response extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  swapHide() {
    let { hidden } = this.state;
    hidden = hidden ? false : true;

    this.setState({hidden})
  }

  componentWillMount() {
    if (this.props.response && this.props.response.helpful) {
      this.setState({hidden: this.props.response.helpful < 0})
    }
  }

  render() {
    const {hidden } = this.state;
    const {response} = this.props;
    return (
      <div className="response-container">
        <div className="submitted-by-response">
          {!hidden && <a className="hideHolder" onClick={this.swapHide.bind(this)}>-</a>}
          {hidden && <a className="showHolder" onClick={this.swapHide.bind(this)}>+</a>}
          <span>&nbsp;</span>Submitted by: <Link>{response.username}</Link>
        </div>
        <div className={"response-helpful-count" + (response.helpful >= 0 ? ' positive' : ' negative')}>{response.helpful}</div>
        {!hidden && <div>
          <div className="responseContent">{response.content}</div>
          <div className="button-holder">
            <div>Helpful? <a>Yes</a>/<a>No</a></div>
            <div><a>Report</a></div>
          </div>
        </div>}
      </div>
    )
  }
}

export default Response;
