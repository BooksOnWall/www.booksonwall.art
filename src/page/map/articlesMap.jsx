import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import  { StaticMap, Layer, Source } from 'react-map-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import mapboxgl from 'mapbox-gl';
// eslint-disable-next-line import/no-webpack-loader-syntax
mapboxgl.workerClass = require('worker-loader!mapbox-gl/dist/mapbox-gl-csp-worker').default;

let MapboxAccessToken = process.env.REACT_APP_MAT;

const Articles =({articles, goToArticle, onHover}) => {

  if(articles && articles.length > 0) {

    const features = articles.map((st,i) => {
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
          id='articles'
          type='geojson'
          data={Features}
        />

        <Layer
          id='story'
          source='articles'
          type='circle'
          paint={{
            'circle-radius': 20,
            'circle-color': '#1978c8'
          }}
          onClick={(e, m) => goToArticle(e,m)}
        />
        </>
      );
  }
  return '';
}
class ArticlesMap extends Component {
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
    const {articles, mode} = this.props;
    console.log(articles);
    this.state = {
      mapStyle: (mode && mode === "Dark") ? "mapbox://styles/cseverin/ckp6acbwt08hj17o3shq8bmgw" : "mapbox://styles/cseverin/ckp6acbwt08hj17o3shq8bmgw",
      viewport: viewport,
      articles: articles
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
      layers: ["articles"]
    });
    console.log(features);
  }
  onViewportChange = (viewport) => this.setState({viewport})
  goToArticle = (name) => this.props.history.push('/articles/' + name)
  render() {
    const { viewport, articles,mapStyle } = this.state;
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
        <Articles articles={articles} goToArticle={this.goToArticle} onHover={this.onHover}/>
      </StaticMap>
    );
  }
}
export default withRouter(ArticlesMap);
