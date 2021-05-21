import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';

import { StaticMap, Layer, Source } from 'react-map-gl';
import 'mapbox-gl/dist/mapbox-gl.css';

let MapboxAccessToken = process.env.REACT_APP_MAT;

const Stories =({stories, goToStory, onHover}) => {

  if(stories && stories.length > 0) {

    const features = stories.map((st,i) => {
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
          id='stories'
          type='geojson'
          data={Features}
        />

        <Layer
          id='story'
          source='stories'
          type='circle'
          paint={{
            'circle-radius': 20,
            'circle-color': '#AB514E'
          }}
          onClick={(e, m) => goToStory(e,m)}
        />
        </>
      );
  }
  return '';
}
class ExploreMap extends Component {
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
    const {stories, mode} = this.props;

    this.state = {
      mapStyle: (mode && mode === "Dark") ? "mapbox://styles/cseverin/ck1whcg93983n1cq9u4kxz5p8" : "mapbox://styles/cseverin/ck1whcg93983n1cq9u4kxz5p8",
      viewport: viewport,
      stories: stories
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
      layers: ["stories"]
    });
    console.log(features);
  }
  onViewportChange = (viewport) => this.setState({viewport})
  goToStory = (name) => this.props.history.push('/stories/' + name)
  render() {
    const { viewport, stories,mapStyle } = this.state;
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
        localizeLabels={false}
        onViewportChange={this.onViewportChange}
        mapboxApiAccessToken={MapboxAccessToken}
      >
        <Stories stories={stories} goToStory={this.goToStory} onHover={this.onHover}/>
      </StaticMap>
    );
  }
}
export default withRouter(ExploreMap);
