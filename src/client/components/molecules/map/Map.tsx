import * as React from 'react';
import { withGoogleMap, withScriptjs, GoogleMap } from 'react-google-maps';
import InfoBox from "react-google-maps/lib/components/addons/InfoBox";

export interface MapProps {
    mapData: any,
    zoom?: number
}

export interface MapState {
}

const INITIAL_PROPS: MapProps = {
    mapData: {},
};

const INITIAL_STATE: MapState = {
};

export class Map extends React.Component<MapProps, MapState> {

    public static defaultProps = INITIAL_PROPS;
    public dataArr = [];
    public ref: any;
    constructor(props: MapProps) {
        super(props);
        this.state = INITIAL_STATE;
        this.dataArr = [{
            key: 'au',
            lat: -27,
            lng: 133,
            count: 8,
            size: this.getSize(8)
        }, {
            key: 'af',
            lat: -20,
            lng: 27,
            count: 88,
            size: this.getSize(88)
        },
        {
            key: 'af',
            lat: 40,
            lng: 27,
            count: 888,
            size: this.getSize(888)
        }];
    }

    transformData(mapData) {
        if (!mapData) {
            return [];
        }
        delete mapData['00'];
        const arr = [];
        for (let obj in mapData) {
            if (obj === '00')
                return;
            arr.push({
                key: obj,
                lat: mapData[obj].latLongCord[0],
                lng: mapData[obj].latLongCord[1],
                count: mapData[obj].totalCount,
                size: this.getSize(mapData[obj].totalCount)
            })
        }

        return arr;
    }

    getSize(count) {
        if (count < 10) {
            return '1.5em';
        }

        if (count < 100) {
            return '2em';
        }

        if (count < 1000) {
            return '3em';
        }
    }

    setRef(map) {
        this.ref = map;
    }

    onBoundsChanged() {
        console.log('Bounds', this.ref.getBounds());
        //this.ref.fitBounds(this.ref.getBounds());
    }
    


    public render() {
        const mapData = this.transformData(this.props.mapData);
        return (
            <GoogleMap
            ref={this.setRef.bind(this)}
            onBoundsChanged={this.onBoundsChanged.bind(this)}
                mapTypeId={google.maps.MapTypeId.ROADMAP}
                defaultZoom={this.props.zoom}
                defaultCenter={{ lat: 30, lng: 0 }}
                center={{ lat: 30, lng: 0 }}
                onTilesLoaded={() => window.dispatchEvent(new Event("resize"))}
                defaultOptions={{
                    // these following 7 options turn certain controls off see link below
                    streetViewControl: false,
                    scaleControl: false,
                    mapTypeControl: false,
                    panControl: false,
                    zoomControl: false,
                    rotateControl: false,
                    fullscreenControl: false,
                    draggable: false,
                    draggingCursor: "cursor",
                    styles: [
                         {
                            "elementType": "geometry",
                            "stylers": [
                                {
                                    "color": "#f5f5f5"
                                }
                            ]
                        },
                        {
                            "elementType": "geometry.fill",
                            "stylers": [
                                {
                                    "color": "#cde2ff"
                                }
                            ]
                        },
                        {
                            "elementType": "labels",
                            "stylers": [
                                {
                                    "visibility": "off"
                                }
                            ]
                        },
                        {
                            "elementType": "labels.icon",
                            "stylers": [
                                {
                                    "visibility": "off"
                                }
                            ]
                        },
                        {
                            "elementType": "labels.text.fill",
                            "stylers": [
                                {
                                    "color": "#616161"
                                }
                            ]
                        },
                        {
                            "elementType": "labels.text.stroke",
                            "stylers": [
                                {
                                    "color": "#f5f5f5"
                                }
                            ]
                        },
                        {

                            "featureType": "administrative",
                            "elementType": "geometry",
                            "stylers": [
                                {
                                    "visibility": "off"
                                }
                            ]
                        },
                        {
                            "featureType": "administrative.country",
                            "stylers": [
                                {
                                    "color": "#4db6ee"
                                }
                            ]
                        },
                        {

                            "featureType": "administrative.country",
                            "elementType": "geometry.fill",
                            "stylers": [
                                {
                                    "color": "#4db6ee"
                                },
                                {
                                    "saturation": -100
                                },
                                {
                                    "lightness": -100
                                }
                            ]
                        },
                        {

                            "featureType": "administrative.land_parcel",
                            "elementType": "labels.text.fill",
                            "stylers": [
                                {
                                    "color": "#bdbdbd"
                                }
                            ]
                        },
                        {
                            "featureType": "administrative.neighborhood",
                            "stylers": [
                                {
                                    "visibility": "off"
                                }
                            ]
                        },
                        {

                            "featureType": "administrative.province",
                            "elementType": "geometry.fill",
                            "stylers": [
                                {
                                    "color": "#4db6ee"
                                }
                            ]
                        },
                        {

                            "featureType": "landscape.man_made",
                            "elementType": "geometry.fill",
                            "stylers": [
                                {
                                    "color": "#4db6ee"
                                }
                            ]
                        },
                        {
                            "featureType": "poi",
                            "stylers": [
                                {
                                    "visibility": "off"
                                }
                            ]
                        },
                        {

                            "featureType": "poi",
                            "elementType": "geometry",
                            "stylers": [
                                {
                                    "color": "#eeeeee"
                                }
                            ]
                        },
                        {

                            "featureType": "poi",
                            "elementType": "labels.text.fill",
                            "stylers": [
                                {
                                    "color": "#757575"
                                }
                            ]
                        },
                        {

                            "featureType": "poi.park",
                            "elementType": "geometry",
                            "stylers": [
                                {
                                    "color": "#e5e5e5"
                                }
                            ]
                        },
                        {

                            "featureType": "poi.park",
                            "elementType": "labels.text.fill",
                            "stylers": [
                                {
                                    "color": "#9e9e9e"
                                }
                            ]
                        },
                        {
                            "featureType": "road",
                            "stylers": [
                                {
                                    "visibility": "off"
                                }
                            ]
                        },
                        {

                            "featureType": "road",
                            "elementType": "geometry",
                            "stylers": [
                                {
                                    "color": "#ffffff"
                                }
                            ]
                        },
                        {

                            "featureType": "road",
                            "elementType": "labels.icon",
                            "stylers": [
                                {
                                    "visibility": "off"
                                }
                            ]
                        },
                        {

                            "featureType": "road.arterial",
                            "elementType": "labels.text.fill",
                            "stylers": [
                                {
                                    "color": "#757575"
                                }
                            ]
                        },
                        {

                            "featureType": "road.highway",
                            "elementType": "geometry",
                            "stylers": [
                                {
                                    "color": "#dadada"
                                }
                            ]
                        },
                        {

                            "featureType": "road.highway",
                            "elementType": "labels.text.fill",
                            "stylers": [
                                {
                                    "color": "#616161"
                                }
                            ]
                        },
                        {

                            "featureType": "road.local",
                            "elementType": "labels.text.fill",
                            "stylers": [
                                {
                                    "color": "#9e9e9e"
                                }
                            ]
                        },
                        {
                            "featureType": "transit",
                            "stylers": [
                                {
                                    "visibility": "off"
                                }
                            ]
                        },
                        {

                            "featureType": "transit.line",
                            "elementType": "geometry",
                            "stylers": [
                                {
                                    "color": "#e5e5e5"
                                }
                            ]
                        },
                        {

                            "featureType": "transit.station",
                            "elementType": "geometry",
                            "stylers": [
                                {
                                    "color": "#eeeeee"
                                }
                            ]
                        },
                        {

                            "featureType": "water",
                            "elementType": "geometry",
                            "stylers": [
                                {
                                    "color": "#c9c9c9"
                                }
                            ]
                        },
                        {

                            "featureType": "water",
                            "elementType": "geometry.fill",
                            "stylers": [
                                {
                                    "color": "#f2f9ff"
                                },
                                {
                                    "weight": 0.5
                                }
                            ]
                        },
                        {

                            "featureType": "water",
                            "elementType": "labels.text.fill",
                            "stylers": [
                                {

                                    "color": "#9e9e9e"
                                }
                            ]

                        }
                    ]
                }}
            >

                {mapData.map((data, index) => (
                    <div>
                        <InfoBox key={data.key} defaultPosition={new google.maps.LatLng(data.lat, data.lng)}
                            defaultOptions={{ closeBoxURL: ``, enableEventPropagation: true }}
                            defaultVisible={true}
                        >
                            <div style={
                                {
                                    backgroundColor: "#008AFF",
                                    width: data.size,
                                    height: data.size,
                                    lineHeight: data.size,
                                    borderRadius: '50%',
                                    color: '#ffffff',
                                    overflowX: 'hidden',
                                    fontFamily: ['Montserrat', 'sans-serif'],
                                    fontSize: '14px',
                                    fontWeight: 500,
                                    textAlign: 'center'
                                }
                            }>
                                {data.count}
                            </div>
                        </InfoBox>
                    </div>
                ))}

            </GoogleMap>
        )
    }
}


export const MapContainer = withScriptjs(withGoogleMap(Map)); 