import React from 'react';
import { Link } from 'react-router';

const Table = React.createClass({
  //setting up initial state
  getInitialState:function(){
    return{
      data:[]
    };
  },
  componentDidMount(){
    this.getDataFromServer('http://localhost:9200/murmuration_objective/_search');
  },
  //showResult Method
  showResult: function(response) {
    //console.log(response.hits.hits);
    this.setState({
      data: response.hits.hits
    });
  },
  //making ajax call to get data from server
  getDataFromServer:function(URL){
    $.ajax({
      type:"GET",
      dataType:"json",
      url:URL,
      success: function(response) {
        this.showResult(response);
      }.bind(this),
      error: function(xhr, status, err) {
        console.error(this.props.url, status, err.toString());
      }.bind(this)
    });
  },
  render:function(){
    return(
      <div>
        <Result result={this.state.data}/>
      </div>
    );
  }
});

const Result = React.createClass({
  render:function(){
    console.log(this.props.result);
    var result = this.props.result.map(function(result,index){
      return <ResultItem key={index} objective={ result } />
    });
    return(
      <div className="row">
        <div className="col-md-12">
          <table className="table table-bordered">
            <thead>
            <tr>
              <th>Name</th>
              <th>Description</th>
              <th>Skillsets</th>
              <th>Priority</th>
              <th>Targets</th>
              <th>Start</th>
              <th>End</th>
            </tr>
            </thead>
            <tbody>
            {result}
            </tbody>
          </table>
        </div>
      </div>
    );
  }
});

var ResultItem = React.createClass({
  render:function(){
    var objective = this.props.objective;
    return(
      <tr>
        <td><Link to={"/objective/" + objective._id}>{objective._source.name}</Link></td>
        <td>{objective._source.description}</td>
        <td>{objective._source.skillsets}</td>
        <td>{objective._source.priority}</td>
        <td>{objective._source.targets}</td>
        <td>{objective._source.start}</td>
        <td>{objective._source.end}</td>      
      </tr>
    );
  }
});

export default Table;
