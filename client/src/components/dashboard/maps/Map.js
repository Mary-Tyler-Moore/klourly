import React from "react";
import { compose, withStateHandlers } from "recompose";
import { InfoWindow, withGoogleMap, withScriptjs, GoogleMap, Marker} from "react-google-maps";
import MapMarker from './MapMarker';
import { connect } from 'react-redux';
import { geoLocationActions } from '../../../actions/geoLocationActions';

const Map = compose(
    withStateHandlers(() => ({
        isMarkerShown: false,
        markerPosition: null
    }), {
        onMapClick: ({ isMarkerShown }) => (e) => (console.log(e),
        {
            markerPosition: e.latLng,
            isMarkerShown: true
        })
    }),
    withScriptjs,
    withGoogleMap
) (props =>
    <div id="maps-cont">
        <GoogleMap
            defaultZoom={14}
            center={props.isMarkerShown ? props.markerPosition : { lat: props.coords.lat, lng: props.coords.lng }}
            onClick={props.onMapClick}
        >
            {props.isMarkerShown && <Marker position={props.markerPosition} />}
            {props.isMarkerShown ? null : <MapMarker location={{ lat: props.coords.lat, lng: props.coords.lng }} />}
        </GoogleMap>
        <h5>{JSON.stringify(props.markerPosition)}</h5>
        <div className="input-field col s8 offset-s2">
          <input placeholder="Placeholder" id="locationName" type="text" />
          <label htmlFor="locationName">Location Name</label>
        </div>
        <div className="col s12">
            <button id="confirm-new-room-name" className="waves-effect waves-light btn animated fadeIn" onClick={props.geoLocationActions}>Set room location</button>
        </div>
    </div>
);

// update current geolocation state
const mapDispatchToProps = (dispatch) => {
    return {
        geoLocationActions: () => dispatch(geoLocationActions())
    };
}

const mapStateToProps = (state) => {
    return {
        state: state.state
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Map);

//export default Map;