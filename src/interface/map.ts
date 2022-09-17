export enum OptionMapStyles {
    STREET = "mapbox://styles/mapbox/streets-v11",
    LIGHT = "mapbox://styles/mapbox/light-v10",
    DARK = "mapbox://styles/mapbox/dark-v10",
}

export interface Coordinate {
    longitude: number;
    latitude: number;
}

export interface MapStyle {
    style: string;
}

export interface MarkerData {
    uuid: string;
    coordinate: Coordinate;
}

export interface Zoom {
    zoom: number;
}