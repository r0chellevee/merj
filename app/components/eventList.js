import React, { Component } from 'react';
import {EventItem} from './eventItem';

class EventList extends Component {
  constructor(props) {
    super(props)
    this.state = {list: this.props.events, updated: false}
    this.deleteEvent = this.deleteEvent.bind(this)
  }
 
 deleteEvent(newList) {
  this.setState({ list: newList, updated: true })
 }

 render() {
  if (this.state.updated) {
    return (
      <div>
        <div id='eventlist'>
          {this.state.list.map((event, i, list) =>
           <EventItem list={list} event={event} key={i} index={event.id}
                handleEventClick={this.props.handleEventClick}
                 deleteEvent={this.deleteHandler}/>
           )}
        </div>
      </div>
    )
  } else {
      return (
        <div>
          <div id='eventlist'>
            {this.props.events.map((event, i, list) =>
             <EventItem list={list} event={event} key={i} index={event.id}
                  handleEventClick={this.props.handleEventClick}
                   deleteEvent={this.deleteEvent}/>
             )}
          </div>
        </div>
      )
    }
  }
}

export {EventList};