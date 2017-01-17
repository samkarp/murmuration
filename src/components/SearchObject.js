import React from 'react';
import Select from 'react-select';

class SearchObject extends React.Component {

  constructor(props) {
    super(props);
    // this.handleClick = this.handleClick.bind(this);
    // this.state = {
    //   targets: []
    // }
  }

  handleClick(selection) {
    this.props.onClick(selection);
  }

  render() {

    // var regions = this.props.regions;
    // var resources = this.props.resources;
    // var objectives = this.props.objectives;
    var targets = this.props.targets;
    //
    // var functionToCall = this.handleClick;

    // { value: 'one', label: 'One' },
    // { value: 'two', label: 'Two' }

    var options = [];

    this.props.targets.map(function (target) {
      options.push({value:target._id, label:target._source.description})
    });

    function logChange(val) {
      console.log("Selected: " + val);
    }

    return (
      <div>
        <h4 style={{color: "red"}}>SEARCH</h4>


        <Select
          name="form-field-name"
          value="All"
          multi={true}
          options={options}
          onChange={logChange}
        />
        <br/>
        <br/>
      </div>
    )
  }
}

export default SearchObject
