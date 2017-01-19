import React from 'react';
import TargetListPanel from './TargetPanel';
import RegionListPanel from './RegionPanel';
import ResourceListPanel from './ResourcePanel';
import ObjectiveListPanel from './ObjectivePanel';

class Sidebar extends React.Component {

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
              <a href="#1" data-toggle="tab">Targets</a>
            </li>
            <li>
              <a href="#2" data-toggle="tab">Regions</a>
            </li>
            <li>
              <a href="#3" data-toggle="tab">Objectives</a>
            </li>
            <li>
              <a href="#4" data-toggle="tab">Resources</a>
            </li>
          </ul>

          <div className="tab-content clearfix">
            <div className="tab-pane active" id="1">
              <TargetListPanel targets={this.props.filteredTargets} regions={this.props.filteredRegions}
                               resources={this.props.filteredResources} objectives={this.props.filteredObjectives}
                               onClick={(e) => this.handleClick(e)}/>
            </div>
            <div className="tab-pane" id="2">
              <RegionListPanel targets={this.props.filteredTargets} regions={this.props.filteredRegions}
                               resources={this.props.filteredResources} objectives={this.props.filteredObjectives}
                               onClick={(e) => this.handleClick(e)}/>
            </div>
            <div className="tab-pane" id="3">
              <ObjectiveListPanel targets={this.props.filteredTargets} regions={this.props.filteredRegions}
                                  resources={this.props.filteredResources} objectives={this.props.filteredObjectives}
                                  onClick={(e) => this.handleClick(e)}/>
            </div>
            <div className="tab-pane" id="4">
              <ResourceListPanel targets={this.props.filteredTargets} regions={this.props.filteredRegions}
                                 resources={this.props.filteredResources} objectives={this.props.filteredObjectives}
                                 onClick={(e) => this.handleClick(e)}/>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Sidebar
