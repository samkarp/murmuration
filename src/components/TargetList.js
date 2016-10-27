import React from 'react';

const TargetList = React.createClass({
	render: function() {		
		console.log("PROPS IN TL");
		console.log(this.props);

		var target = this.props.targets.map(function(target, index){
			return <TargetItem key={ index } targetId={ target }/>
		});
		return (
			<div> Target List goes here:<br/>
					{ target }
			</div>
			
		)
	}
});

var TargetItem = React.createClass({
    getInitialState:function(){
		return{
	      data:[]
	    };
	},
	showResult: function(response) {
	//console.log(response.hits.hits);
		this.setState({
	    	data: response.hits.hits
		});
	},
	componentDidMount(){
		this.getDataFromServer('http://localhost:9200/murmuration_target/_search?q=_id:' + this.props.targetId);
	},
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
    	var targetId = this.props.targetId;
    	var targetResult = this.state.data.map(function(result,index){
      		return <TargetResult key={index} target={ result._source } />
    	});
    	return(
      		<div>
        		{ targetResult }<br/>
      		</div>
    	);
  	}
});

var TargetResult = React.createClass({
  render:function(){
    var target = this.props.target;
    return(
      <div>
        <strong>Name: </strong>{target.name}<br/>
        <strong>Description: </strong>{target.description}<br/>
        <strong>Location: </strong>{target.loc}<br/>
        <strong>RegionId: </strong>{target.regionid}<br/>
      </div>
    );
  }
});
export default TargetList;