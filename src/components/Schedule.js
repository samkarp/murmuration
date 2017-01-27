import React from 'react';
import Sidebar from './Sidebar';
import events from '../../sample_data/events'
import HTML5Backend from 'react-dnd-html5-backend'
import { DragDropContext } from 'react-dnd'
import BigCalendar from 'react-big-calendar'
import moment from 'moment'
import withDragAndDrop from 'react-big-calendar/lib/addons/dragAndDrop';
import axios from 'axios';

// import 'react-big-calendar/lib/less/styles.less';
// import 'react-big-calendar/lib/css/react-big-calendar.css';

BigCalendar.momentLocalizer(moment);

const DragAndDropCalendar = withDragAndDrop(BigCalendar);

const formats = {
  dateFormat: 'DDD',

  dayFormat: 'ddd, MMM DDD',

  dayRangeHeaderFormat: ({ start, end }) =>
    start.toISOString().replace(/-/g, '/').split('T')[0] +
    ' —> ' +
    end.toISOString().replace(/-/g, '/').split('T')[0]

};

class Schedule extends React.Component {

  constructor (props) {
    super(props);
    this.state = {
      patrols: [],
      filteredPatrols: [],
      events: [],
      filteredEvents: []
    };

    this.moveEvent = this.moveEvent.bind(this)
  }

  moveEvent({ event, start, end }) {
    const { events } = this.state;

    const idx = events.indexOf(event);
    const updatedEvent = { start, end };

    for(var k in event) {
      if(!(k in updatedEvent)) {
        updatedEvent[k] = event[k]
      }
    }

    const nextEvents = events;
    nextEvents.splice(idx, 1, updatedEvent);

    this.setState({
      events: nextEvents
    });

    // alert(`${event.title} was dropped onto ${event.start}`);
  }

  componentWillMount() {
    axios.get("http://localhost:9200/murmuration_patrol/_search")
      .then( res => {
        const patrols = res.data.hits.hits;
        const events = res.data.hits.hits.map(obj => new Object({"start": new Date(obj._source.start), "end": new Date(obj._source.end), "title": "Patrol "+obj._id}));
        this.setState({patrols: patrols, events: events});
      });
  }

  render(){
    return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-md-3 sidebar">
          <Sidebar onClick={(e) => this.updateMap(e)} targets={[]}
                   regions={[]} objectives={[]}
                   resources={[]} filteredTargets={[]}
                   filteredRegions={[]} filteredObjectives={[]}
                   filteredResources={[]}/>
        </div>
        <div className="col-md-9 calendar">

          <DragAndDropCalendar
            style={{width: '72vw', height: '85vh'}}
            selectable={true}
            events={this.state.events}
            onEventDrop={this.moveEvent}
            defaultView='week'
            defaultDate={new Date(2017, 0, 4)}
            formats={formats}
          />
        </div>
      </div>
    </div>
    )
  }
}

export default DragDropContext(HTML5Backend)(Schedule)
