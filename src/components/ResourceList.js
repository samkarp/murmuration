import React from 'react';

const ResourceList = React.createClass({
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
		console.log(this.props.skillset);
		this.getDataFromServer('http://localhost:9200/murmuration_resource/_search?q=skillsets:' + this.props.skillset.join(" OR "));
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
	render: function() {		
		var resource = this.state.data.map(function(resource, index){
			return <ResourceItem key={ index } resource={ resource._source }/>
		});
		return (
			<div> Resource List goes here:<br/>
					{ resource }
			</div>
			
		)
	}
});

var ResourceItem = React.createClass({
  render:function(){
    var resource = this.props.resource;
    console.log(resource);
    return(
      <div>
        <strong>Name: </strong>{resource.name}<br/>
        <strong>Shift Start: </strong>{resource.shift_start}<br/>
        <strong>Shift End: </strong>{resource.shift_end}<br/>
        <strong>Skillsets: </strong>{resource.skillsets}<br/>
        <strong>RegionIds: </strong>{resource.regionids}<br/>
      </div>
    );
  }
});
export default ResourceList;