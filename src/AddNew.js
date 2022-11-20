import React from 'react';
import './style.css';
import toastr from 'toastr';
import 'toastr/build/toastr.min.css';

class AddNew extends React.Component {
  constructor(props) {
    super(props);
  }
  onClick() {
    toastr.options = {
      positionClass: 'toast-top-full-width',
      hideDuration: 300,
      timeOut: 60000,
    };
    toastr.clear();
    setTimeout(() => toastr.success(`Settings updated`), 300);
  }
  render() {
    return (
      <div>
        <p>Start editing to see some magic happen :)</p>
        <button onClick={this.onClick}>click me</button>
      </div>
    );
  }
}

export default AddNew;
