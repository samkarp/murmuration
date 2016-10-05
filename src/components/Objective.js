import React from 'react';
import TargetList from './TargetList';
import TargetMap from './TargetMap';
import ResourceList from './ResourceList';


const Objective = React.createClass({
	getInitialState:function(){
		return{
	      data:[]
	    };
	},
	componentDidMount(){
		this.getDataFromServer('http://localhost:9200/murmuration_objective/_search?q=_id:' + this.props.routeParams.id);
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
	render: function(){
		var targetArray;
		var skillsetArray;
		var objectiveResult = this.state.data.map(function(result,index){
      		targetArray = result._source.targets;      		
      		skillsetArray = result._source.skillsets;
      		return <ObjectiveItem key={index} objective={ result } />
    	});
    	var targetListResult = this.state.data.map(function(result, index){
    		return <TargetList key={index} targets={result._source.targets} />
    	});

    	var targetMapResult = this.state.data.map(function(result, index){
    		return <TargetMap key={index} targets={result._source.targets} />
    	})
		return (
			<div>
				<div>
					{ objectiveResult }
					{ targetListResult }
					{ targetMapResult }
				</div>
				
				<ResourceList skillset={ skillsetArray }/>
			</div>
		)
	}
});

var ObjectiveItem = React.createClass({
  render:function(){
    var objective = this.props.objective;
    return(
      <div>
        <strong>Name: </strong>{objective._source.name}<br/>
        <strong>Description: </strong>{objective._source.description}<br/>
        <strong>Skillsets: </strong>{objective._source.skillsets}<br/>
        <strong>Priority: </strong>{objective._source.priority}<br/>
        <strong>Targets: </strong>{objective._source.targets}<br/>
        <strong>Start: </strong>{objective._source.start}<br/>
        <strong>End: </strong>{objective._source.end}<br/>
      </div>
    );
  }
});

export default Objective;






