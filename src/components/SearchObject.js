import React from 'react';
import Select from 'react-select';

class SearchObject extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      type: this.props.type,
      options: [],
      value: []
    };

    this.handleSelectChange = this.handleSelectChange.bind(this);

  }

  handleSelectChange(val) {
    console.log('You\'ve selected:', val);
    this.setState({value: val});

    this.props.onChange({type: this.state.type, value: val})
  }

  render() {

    var options = [];

    //For each target, add it to the list and set the state value
    this.props.items.map(function (object) {
      options.push({value:object._id, label:(!object._source.description || object._source.description.length >= 20 ? object._source.name : object._source.description)})
    });

    this.state.options = options;

    return (
      <div>
        <h4 style={{color: "red"}}>SEARCH</h4>

        <Select
          multi
          simpleValue
          placeholder={"Search "+this.state.type+"..."}
          value={this.state.value}
          options={this.state.options}
          onChange={this.handleSelectChange}
        />
        <br/>
        <br/>
      </div>
    )
  }
}

export default SearchObject
