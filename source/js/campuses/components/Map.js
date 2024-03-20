import React, {useContext} from "react";
import {Marker, TileLayer, Popup, MapContainer, Tooltip, useMap} from "react-leaflet";
import {icon} from "leaflet";
import {LangContext} from "./LangContext";

const MapHook = ({center}) => {
  const map = useMap();
  map.flyTo(center, 18);
  return null;
};

const Map = ({campuses, center, onMarkerClick, selectedCampusId}) => {
  const EN = useContext(LangContext);
  return (
    <MapContainer  center={center} zoom={18} scrollWheelZoom={true} attributionControl={false}>
      <MapHook center={center}/>
      <TileLayer
        //attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
       // url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="https://dev.2gis.ae/">2GIS</a>'
        url="http://tile2.maps.2gis.com/tiles?x={x}&y={y}&z={z}"
      />

        {campuses.map(marker =>  {
          let markerIcon = icon({
            iconUrl: '/img/marker-icon.png',
            iconAnchor: [10, 27]
          });
          if (selectedCampusId === marker.id) {
            markerIcon = icon({
              iconUrl: '/img/marker-icon-selected.png',
              iconAnchor: [10, 27]
            });
          }

          let markerTitle  = '';
          if (EN) {
            markerTitle = (marker.enFullTitle) ? marker.enFullTitle : marker.title
          } else {
            markerTitle = (marker.fullTitle) ? marker.fullTitle : marker.title
          }

          return (
            <Marker
              key={marker.id}
              icon={markerIcon}
              eventHandlers={{
                click: (e) => {
                  onMarkerClick(marker.id);
                },
              }}
              position={[marker.lat, marker.lon]}
            >
              <Tooltip direction='top' offset={[4, -25]} interactive={true} permanent>{markerTitle}</Tooltip>
            </Marker>
          )})}

      <a className="btn-up" href="#"><span className="btn-up__arrow"/></a>
    </MapContainer>
  )

};

export default Map;
