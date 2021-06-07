import React, { Component, useState } from 'react';
import { withRouter } from 'react-router-dom';
import {
  Image,
  Label
} from '@material-ui/core';

import MapGL, {Marker, StaticMap, GeoJSONLayer, Layer, Source } from 'react-map-gl';
import mapboxgl from "mapbox-gl";
import 'mapbox-gl/dist/mapbox-gl.css';
import circle from '../../assets/images/info/history/point.png';
// eslint-disable-next-line import/no-webpack-loader-syntax
mapboxgl.workerClass = require('worker-loader!mapbox-gl/dist/mapbox-gl-csp-worker').default;
let MapboxAccessToken = process.env.REACT_APP_MAT;

const Propositions =({propositions, goToProject, onHover}) => {

  if(propositions && propositions.length > 0) {

    const features = propositions.map((st,i) => {
        let p = {};
        p["type"]="Feature";
        p["geometry"] = st.geometry;
        p["properties"] = st;
        return p;
    });
    const Features = {
      "type": "FeatureCollection",
      "features": features
    };

      return (
        <>
        <Source
          id='propositions'
          type='geojson'
          data={Features}
        />

        <Layer
          id='story'
          source='propositions'
          type='circle'
          paint={{
            'circle-radius': 20,
            'circle-color': '#1978c8'
          }}
          onClick={(e, m) => goToProject(e,m)}
        />
        </>
      );
  }
  return '';
}
class PropositionsMap extends Component {
  constructor(props) {
    super(props);
    const viewport = {
      zoom: 6,
      bearing: 14,
      altitude: 1.5,
      latitude: -33.50688741007494,
      longitude:  -56.036920465823286,
      pitch: 60,
    };
    const {propositions, mode} = this.props;

    this.state = {
      mapStyle: (mode && mode === "Dark") ? "mapbox://styles/croll/ckc3vw1zm03w91inw353d7jn9" : "mapbox://styles/mapbox/light-v9",
      viewport: viewport,
      propositions: propositions
    }
  }
  componentDidMount = () => {

  }
  onHover = (e, m) => {
    if (e.features.length > 0) {
      console.log(e);
      console.log(m);
    }
  }
  onClick = event => {
    // event.x and event.y hold the clicked x and y coordinates in pixels
    // You can pass those coordinates to React Map GL's queryRenderedFeatures
    // to query any desired layers rendered there.
    // Make sure you create the ref on InteractiveMap or StaticMap
    const features = this.map.queryRenderedFeatures([event.x, event.y], {
      layers: ["propositions"]
    });
    console.log(features);
  }
  onViewportChange = (viewport) => this.setState({viewport})
  goToProject = (name) => this.props.history.push('/propositions/' + name)
  render() {
    const { viewport, propositions,mapStyle } = this.state;
    return (
      <StaticMap
        {...viewport}
        width="inherit"
        height="45vh"
        captureScroll={false}
        captureZoom={false}
        showZoom={false}
        showCompass={false}
        captureDrag={false}
        onClick={this.onClick}
        className= "mapBox"
        mapStyle={mapStyle}
        logoEnabled={false}
        localizeLabels={true}
        onViewportChange={this.onViewportChange}
        mapboxApiAccessToken={MapboxAccessToken}
      >
        <Propositions propositions={propositions} goToProject={this.goToProject} onHover={this.onHover}/>
      </StaticMap>
    );
  }
}
export default withRouter(PropositionsMap);
