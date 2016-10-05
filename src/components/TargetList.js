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
  render:function(){
    var targetId = this.props.targetId;
    return(
      <div>
        <strong>TargetId: </strong>{targetId}<br/>
      </div>
    );
  }
});
export default TargetList;