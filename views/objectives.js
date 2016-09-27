var MainBox  = React.createClass({
    render:function(){
        return(
            <App/>
        );
    }
});
var App = React.createClass({
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
var Result = React.createClass({
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
                                <th className="col-md-4">Name</th>
                                <th >Description</th>
                                <th>Skillsets</th>
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
            <tr >
                <td>{objective._source.name}</td>
                <td>{objective._source.description}</td>
                <td>{objective._source.skillsets}</td>
            </tr>
        );
    }
});

ReactDOM.render(
    <MainBox />,
    document.querySelector("#app")
);