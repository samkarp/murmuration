import React from 'react';
import Map from './Map';
import Sidebar from './Sidebar';

class ViewMapItems extends React.Component {

  constructor(props) {
    super(props);
    this.updateMap = this.updateMap.bind(this);
    this.state = {
      selectedItems: []
    };
  }

  updateMap(object) {

    var newArray = this.state.selectedItems.slice();
    if (!newArray.includes(object)) {
      newArray.push(object);
    } else {
      newArray.splice(newArray.indexOf(object), 1)
    }

    this.setState({selectedItems: newArray});

  }

  render() {

    return (
      <div className="container-fluid">
        <div className="row">
          <div className="col-md-3 sidebar">
            <Sidebar onClick={(e) => this.updateMap(e)}/>
          </div>
          <div className="col-md-9 map">
            <Map size={{width: '72vw', height: '85vh'}} targets={this.state.selectedItems}/>
          </div>
        </div>
      </div>
    )
  }
}

export default ViewMapItems
