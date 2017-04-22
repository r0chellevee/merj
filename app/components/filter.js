import React, {Component} from 'react';
import { Button, Col, Row } from 'react-bootstrap';
import {Tabs, Tab, DropdownButton, MenuItem} from 'material-ui/Tabs';
import {EventItem} from './eventItem';
import MapView from './mapView';
import ListOrMapButton from './ListOrMapButton';
import DatePicker from 'react-datepicker';
import moment from 'moment';

import 'react-datepicker/dist/react-datepicker.css';

const styles = {
    headline: {
    fontSize: 24,
    paddingTop: 16,
    marginBottom: 12,
    fontWeight: 400,
  }
};

class Filter extends Component {

  constructor(props) {
    super(props);
    this.state = {
      filteredEvents: this.props.events,
      isMap: false,
      startDate: moment(), // this property highlights today's date on the calendar
      isOpen: false,
      show: false
    }
    // will need to also bind all the other methods to 'this'
    this.listMapHandler = this.listMapHandler.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.toggleCalendar = this.toggleCalendar.bind(this);
    // this.handleSelect = this.handleSelect.bind(this);
  }

  listMapHandler() {
    // console.log('listMapHandler was called!', this.props.events);
    this.setState({
      isMap: !this.state.isMap
    });

    this.props.showMap();

  }

  handleChange(date) {
    console.log(moment(date).format())
    this.props.updateDate(moment(date).format())
    this.toggleCalendar()
  }

  toggleCalendar(e) {
    e && e.preventDefault()
    this.setState({
      isOpen: !this.state.isOpen
    })
  }

  //from here, distance search
  distanceHandleChange (event, index, value) {
    this.setState({value});
  }

  //get user's current location and measuring radius
  async distanceHandler(option) {
    if (value === 1 ) {
      console.log('value', value)
      const data = this.props.events.slice();
      const geocoder = new google.maps.Geocoder();

      const userPosition = await new Promise(resolve =>
        $.getJSON("http://freegeoip.net/json/", function(data) {
          resolve({
            lat: data.latitude,
            lng: data.longitude
          })
        })
      )

      const userPositionOnGoogleMap = new google.maps.LatLng(parseFloat(userPosition.lat), parseFloat(userPosition.lng));
      const distanceResults = [];
      const distanceRemainingResults = [];
  
      await Promise.all(
        data.map(datum =>
          new Promise(resolve =>
            geocoder.geocode({'address' : datum['location'] }, function (results, status) {
              if (status === 'OK') {
                const preEventPosition = JSON.stringify(results[0].geometry.location)
                const eventPosition = JSON.parse(preEventPosition)
                const eventPositionOnGoogleMap = new google.maps.LatLng(parseFloat(eventPosition.lat), parseFloat(eventPosition.lng));
                const path = google.maps.geometry.spherical.computeDistanceBetween(userPositionOnGoogleMap, eventPositionOnGoogleMap);
                if (path <= option) {
                  distanceResults.push(datum);
                } else {
                  distanceRemainingResults.push(datum);
                }
              } else {
                console.log('err', status)
              }
              resolve()
            })
          )
        )
      )
      this.props.updateEventList(distanceResults);
      console.log('distanceResults', distanceResults)
    }
  }

  render() {
    let labelForMap = this.state.isMap ? "List": "Map"
    // console.log("props!!hey!!!", this.props)
    return (
      <Tabs>
        <Tab label="Distance" onClick={() => this.setState({ show: true})}>
          <div style={styles.headline}></div>
          <DropdownButton>
            <MenuItem id="2miles" onClick={ this.distanceHandler(3218.69) }>2 miles</MenuItem>
            <MenuItem id="5miles" onClick={this.distanceHandler(8046.72)}>5 miles</MenuItem>
            <MenuItem id="20miles" onClick={this.distanceHandler(32186.9)}>20 miles</MenuItem>
          </DropdownButton>

        </Tab>
        <Tab label="Calendar" onClick={this.toggleCalendar} handleEventClick={this.props.handleEventClick}>
          <div style={styles.headline}>
            {
              this.state.isOpen && (
                <DatePicker
                  onClickOutside={this.toggleCalendar}
                  selected={this.state.startDate}
                  onSelect={this.handleSelect}
                  onChange={this.handleChange}
                  withPortal
                  inline />
              )
            }
          </div>
        </Tab>
        <Tab label="Hot" >
          <div style={styles.headline}></div>
        </Tab>
        <Tab label={labelForMap} onActive={this.listMapHandler}>
          <div style={styles.headline}>
          </div>
        </Tab>
      </Tabs>
    );
  }
};

export default Filter;
