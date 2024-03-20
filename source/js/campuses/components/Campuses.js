import React, {useState} from 'react';
import Map from "./Map";
import Panel from "./Panel";
import Tabs from "./Tabs";

const Campuses = ({list}) => {
  const [mapCenter, setMapCenter] = useState([45.043528, 41.962227]);
  const [selectedCampus, setSelectedCampus] = useState({});
  const [panelIsOpen, setPanelIsOpen] = useState(false);
  const [markers, setMarkers] = useState([]);
  const [mappedMarkers, setMappedMarkers] = useState([]);

  const onClosePanel = () => {
    setPanelIsOpen(false);
  };

  const onTypeChange = (filteredMarkers) => {
    setMarkers(filteredMarkers);

    const markersMap = filteredMarkers.reduce((out, item) => {
      out[item.id] = item;
      return out;
    }, {});
    setMappedMarkers(markersMap);
    setPanelIsOpen(false);
    setMapCenter([filteredMarkers[0].lat, filteredMarkers[0].lon]);
    setSelectedCampus({});
  };

  const onMarkerOrCampusButtonClick = (id) => {
    setMapCenter([mappedMarkers[id].lat, mappedMarkers[id].lon]);
    setSelectedCampus(mappedMarkers[id]);
    setPanelIsOpen(true);
  };

  return (
    <>
      <Tabs items={list} onTypeChange={onTypeChange} onCampusButtonClick={onMarkerOrCampusButtonClick}/>
      <div className="map-container">
        <Map campuses={markers} selectedCampusId={selectedCampus.id} center={mapCenter} onMarkerClick={onMarkerOrCampusButtonClick}/>
        <Panel panelIsOpen={panelIsOpen} campus={selectedCampus} onClosePanel={onClosePanel}/>
      </div>
    </>
  )
};

export default Campuses;

