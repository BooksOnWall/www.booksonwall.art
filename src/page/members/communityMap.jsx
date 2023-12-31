import React, { Component } from 'react';


import {
    Avatar,
  } from '@material-ui/core';

import {Marker, FlyToInterpolator, StaticMap} from 'react-map-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import turf from 'turf';

let MapboxAccessToken = process.env.REACT_APP_MAT;
const apiURL = process.env.REACT_APP_API;
const Members = ({lines, members, selected, centerMap, goToMember}) => {

  if(members && members.length > 0) {
    let lines = [];
    let listMembers = members.map((member,i) => {
      const skills = member.skills;
      let hasIt = false;
      if (skills && skills.length > 0) {
        skills.filter(skill => (selected.indexOf(skill) === 0) ? hasIt = true : '');
      }
      if (selected.length === 0) {
        hasIt = true;
      }
      if (hasIt) lines.push(member.geometry.coordinates);
      return (hasIt) ?(
        <Marker
          key={i}
          longitude={parseFloat(member.geometry.coordinates[0])}
          latitude={parseFloat(member.geometry.coordinates[1])}
          >
          {(member.avatar) ? <Avatar style={{border:'1px solid #fff'}} onClick={() => goToMember(member.name)} src={apiURL + member.avatar.formats.thumbnail.url} /> : ''}
        </Marker>

      ): ''});

      return listMembers;
    }
};
export default class CommunityMap extends Component {
  constructor(props) {
    super(props)
    const {members, selected, theme, mode} = this.props;
    let lines = [];
    console.log(theme);
    lines = members.map(member => turf.point(member.geometry.coordinates));
    var features = turf.featureCollection(lines);
    var center = turf.center(features);
    let viewport = {
      latitude:   center.geometry.coordinates[0],
      longitude: center.geometry.coordinates[0],
      zoom: 1.8,
      bearing:  0, // bearing in degrees
      pitch: 36  // pitch in degrees
    };

    this.state = { mapStyle: (mode && mode === "Light") ? 'mapbox://styles/cseverin/ckp6acbwt08hj17o3shq8bmgw' : 'mapbox://styles/cseverin/ckp6acbwt08hj17o3shq8bmgw', lines: lines, members: members, selected: selected, viewport: viewport }
  }
  onViewportChange = (viewport) => this.setState({viewport})
  goToViewport = (coordinates) => {
    this.onViewportChange({
      longitude: coordinates[0],
      latitude: coordinates[1],
      zoom: 8,
      altitude: 1.5,
      bearing:  -1.4082113938641867, // bearing in degrees
      pitch: 58,  // pitch in degrees
      transitionInterpolator: new FlyToInterpolator({speed: 1.2}),
      transitionDuration: 'auto'
    });
  }
  goToMember = (name) => {
    return this.props.history.push('/Community/Member/'+ name)
  }
  centerMap = (lines) => {
    console.log(lines);
    const features = turf.featureCollection(lines);
    var center = turf.center(features);
    console.log(center.geometry.coordinates);
    // this.goToViewport(center.geometry.coordinates);
  }
  lineString = (members, selected) => {
    let lines=[];
    members.map(member => {
      let hasIt = false;
      member.skills.filter(skill => {
        selected.filter(sskill => {
          hasIt = (sskill === skill) ? true : hasIt ;
          return hasIt;
        });
        hasIt = (selected.length === 0) ? true : hasIt;
        if (hasIt) lines.push(turf.point(member.geometry.coordinates)) ;
        return hasIt;
      });
      return hasIt
    });

    return lines;
  }
  handleMapClick = (name) => {console.log(name)}
  render() {
    const { viewport, mapStyle } = this.state;

    const {members , selected } = this.props;
    const lines = this.lineString(members, selected);
    var features = turf.featureCollection(lines);
    var center = turf.center(features);
    viewport.longitude = center.geometry.coordinates[0];
    viewport.latitude = center.geometry.coordinates[1];

    return (
      <StaticMap
        {...viewport}
        width="inherit"
        height="45vh"
        className= "mapBox"
        fitBounds={lines}
        mapStyle={mapStyle}
        logoEnabled={false}
        localizeLabels={true}
        captureScroll={true}
        captureZoom={true}
        showZoom={true}
        showCompass={true}
        captureDrag={true}
        onViewportChange={this.onViewportChange}
        mapboxApiAccessToken={MapboxAccessToken}
      >
      <Members lines={lines} members={members} selected={selected} centerMap={this.centerMap} goToMember={this.goToMember}/>
      </StaticMap>
    );
  }
}
