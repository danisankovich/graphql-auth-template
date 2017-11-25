import React, { Component } from 'react';


require("../css/styles.css")

class FrontPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showForm: false,
    }
  }

  render() {
    const { showForm } = this.state;
    const { data } = this.props;

    return (
      <div>
        <h1>Front Page</h1>
      </div>

    );
  }
}

export default FrontPage;
