export interface Coordinate {
    lat: number;
    lng: number;
}

export interface MapParameters {
    mapZoom: number;
    mapCoord: Coordinate;
    mouseCoord: Coordinate;
}
