import React from 'react';
import PatrolListPanel from './PatrolListPanel';

class ScheduleSidebar extends React.Component {

  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick(item) {
    this.props.onClick(item);
  }

  render() {

//Tabbed pane of Target, Region, Resource, Objective

    return (
      <div className="container-fluid" style={{textAlign: "center"}}>
        <div className="row">
          <h3>Select Item</h3>
        </div>
        <div className="row">

          <ul className="nav nav-tabs">
            <li className="active">
              <a href="#1" data-toggle="tab">Patrols</a>
            </li>
          </ul>

          <div className="tab-content clearfix">
            <div className="tab-pane active" id="1">
              <PatrolListPanel />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default ScheduleSidebar
