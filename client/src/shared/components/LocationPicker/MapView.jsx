import {
    MapContainer,
    Marker,
    TileLayer,
    useMapEvents,
} from "react-leaflet";

import "leaflet/dist/leaflet.css";

import L from "leaflet";

import {
    reverseGeocode,
} from "../../services/location/geocoding.service";

import markerIcon2x from "leaflet/dist/images/marker-icon-2x.png";
import markerIcon from "leaflet/dist/images/marker-icon.png";
import markerShadow from "leaflet/dist/images/marker-shadow.png";

import { useMap } from "react-leaflet";
import { useEffect } from "react";

delete L.Icon.Default.prototype._getIconUrl;

L.Icon.Default.mergeOptions({
    iconRetinaUrl: markerIcon2x,
    iconUrl: markerIcon,
    shadowUrl: markerShadow,
});

function RecenterMap({
    latitude,
    longitude,
}) {

    const map =
        useMap();

    useEffect(() => {

        if (
            latitude != null &&
            longitude != null
        ) {

            map.flyTo(
                [
                    latitude,
                    longitude,
                ],
                16,
                {
                    duration: 1,
                }
            );

        }

    }, [
        latitude,
        longitude,
        map,
    ]);

    return null;

}

function DraggableMarker({
    value,
    onChange,
}) {
    const updateLocation = async (
        latitude,
        longitude
    ) => {
    
        try {
    
            const location =
                await reverseGeocode(
                    latitude,
                    longitude
                );
    
            onChange(location);
    
        } catch (error) {
    
            console.error(error);
    
        }
    
    };

    useMapEvents({

        async click(e) {
            updateLocation(

                e.latlng.lat,
        
                e.latlng.lng
        
            );
        },

    });

    if (
        !value.latitude ||
        !value.longitude
    ) {
        return null;
    }

    return (

        <Marker
            draggable
            position={[
                value.latitude,
                value.longitude,
            ]}
            eventHandlers={{

                dragend(event) {

                    const marker =
                        event.target;
                
                    const position =
                        marker.getLatLng();
                
                    updateLocation(
                        position.lat,
                        position.lng
                    );
                
                },

            }}
        />

    );

}

const MapView = ({
    value,
    onChange,
}) => {

    return (

        <div className="rounded-2xl overflow-hidden border">

            <MapContainer
                center={
                    value.latitude
                        ? [
                            value.latitude,
                            value.longitude,
                        ]
                        : [
                            11.6854,
                            76.132,
                        ]
                }
                zoom={
                    value.latitude
                        ? 15
                        : 7
                }
                style={{
                    height: 350,
                    width: "100%",
                }}
            >

                <TileLayer
                    attribution="© OpenStreetMap contributors"
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />

                <DraggableMarker
                    value={value}
                    onChange={onChange}
                />

                <RecenterMap
                    latitude={value.latitude}
                    longitude={value.longitude}
                />
            </MapContainer>

        </div>

    );

};

export default MapView;