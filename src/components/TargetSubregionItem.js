import React from 'react';

class TargetSubregionItem extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      isSelected: false
    };
  }

  handleClick(item) {

    this.props.onClick(item);

    var selected = !this.state.isSelected;
    this.setState({isSelected: selected});

  }

  render() {

    return(<li key={this.props.subregion._id}
               className="list-group-item"
               style={{backgroundColor: (this.state.isSelected ? "#7af19f" : "white")}}><a
               onClick={ () => this.handleClick(this.props.subregion) }
          >{this.props.subregion._source.description}</a></li>)
  }
}

export default TargetSubregionItem
