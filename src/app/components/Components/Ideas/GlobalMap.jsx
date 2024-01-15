"use client";

import React, { useEffect, useState } from "react";

import "leaflet/dist/leaflet.css";
import "leaflet-draw/dist/leaflet.draw.css";

import L from "leaflet";

import { MapContainer, TileLayer, useMap, FeatureGroup } from "react-leaflet";
import { EditControl } from "react-leaflet-draw";

const MapComponent = () => {
  const [markers, setMarkers] = useState([]);

  const generateId = () => {
    return Math.random().toString();
  };

  const onEditHandler = (e) => {
    const { layers } = e;

    layers.eachLayer((layer) => {
      if (layer instanceof L.Circle && layer.options.id) {
        const id = layer.options.id;
        const newCenter = layer.getLatLng();
        const newRadius = layer.getRadius();
        updateCircle(id, newCenter, newRadius);
      }
    });
  };

  const updateCircle = (id, newCenter, newRadius) => {
    setMarkers((prevCircles) =>
      prevCircles.map((circle) =>
        circle.id === id
          ? {
              ...circle,
              center: [newCenter.lat, newCenter.lng],
              radius: newRadius,
            }
          : circle
      )
    );
  };

  const onCreatedHandler = (e) => {
    const { layerType, layer } = e;

    if (layerType === "circle") {
      const id = generateId(); // Generate a unique ID for the circle
      const { lat, lng } = layer.getLatLng();
      const radius = layer.getRadius();
      layer.options.id = id;
      setMarkers((prevMarkers) => [
        ...prevMarkers,
        { id, center: [lat, lng], radius, listenersAttached: true },
      ]);
    }
  };

  const CircleLabel = ({ position, content }) => {
    const map = useMap();

    useEffect(() => {
      // Create the custom marker
      const customMarker = new L.Marker(position, {
        icon: new L.DivIcon({
          className: "custom-div-icon",
          html: `<div style="background: white; padding: 5px; border-radius: 5px;">${content}</div>`,
          iconSize: [100, 30],
          iconAnchor: [50, 15],
        }),
      });

      // Add the marker to the map
      customMarker.addTo(map);

      // Cleanup function to remove the marker from the map
      return () => {
        customMarker.remove();
      };
    }, [map, position, content]); // Dependencies
  };

  return (
    <MapContainer
      center={[51.505, -0.09]}
      zoom={13}
      style={{ width: "40vw", height: "300px" }}
    >
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      />
      {/* Other map components like Markers, Popups, etc. */}
      <FeatureGroup>
        <EditControl
          position="topright"
          onCreated={onCreatedHandler}
          onEdited={onEditHandler}
          draw={{
            rectangle: false,
            polyline: false,
            polygon: false,
            circle: true,
            marker: false,
            circlemarker: false,
          }}
          edit={{
            remove: true,
          }}
        />
        {markers.map((circle) => (
          <CircleLabel
            key={circle.id}
            position={circle.center}
            content={`Circle #${circle.id}`}
          />
        ))}
      </FeatureGroup>
    </MapContainer>
  );
};

export default MapComponent;
