
export enum OptionMapStyles {
    STREET = "mapbox://styles/mapbox/streets-v11",
    LIGHT = "mapbox://styles/mapbox/light-v10",
    DARK = "mapbox://styles/mapbox/dark-v10",
}

export interface ICoordinate {
    longitude: number;
    latitude: number;
}

export interface IZoom {
    zoom: number;
}

export interface IMapStyle {
    mapStyle: string;
}

export interface IMapParameters {
    mapCoord: ICoordinate; 
    mapStyle: IMapStyle;
    mapZoom: IZoom;
}


export interface IMapParas {
    mapLat: number;
    mapLng: number;  
    mapZoom: number;
    mapStyle: string;
}

export interface MapParameters {
    mapZoom: number;
    mapCoord: ICoordinate;
    mouseCoord: ICoordinate;
}


export class MapParams {

    constructor(
        public mapLng: number = 0.0,
        public mapLat: number = 0.0,
        public mapZoom: number = 2.0,
        public mapStyle: string = OptionMapStyles.STREET,
    ) {
        this.mapLng = mapLng;
        this.mapLat = mapLat;
        this.mapZoom = mapZoom;
        this.mapStyle = mapStyle;
    }

    toObject() {
        return {
            mapLng: this.mapLng.toString(),
            mapLat: this.mapLat.toString(),
            mapZoom: this.mapZoom.toString(),
            mapStyle: this.mapStyle,
        }
    }

    serialize() {
        return JSON.stringify(this.toObject());
    }

    saveToStorage() {
        localStorage.setItem("mapParams", this.serialize());
    }
    
    updateFromStorage() {
        let localMapParams: IMapParameters|null = localStorage.getItem("mapParams") ? JSON.parse(localStorage.getItem("mapParams")!) : null ;
        // if (!localMapParams) return;
        // if (localMapParams.mapLng) this.mapLng = localMapParams.mapLng;
        // if (localMapParams.mapLat) this.mapLat = localMapParams.mapLat;
        // if (localMapParams.mapZoom) this.mapZoom = localMapParams.mapZoom;
        // if (localMapParams.mapStyle) this.mapStyle = localMapParams.mapStyle;
    }

    static fromSerialized(serialized: string) {
        const params: MapParams = JSON.parse(serialized);
        return new MapParams(
            params.mapLng,
            params.mapLat,
            params.mapZoom,
            params.mapStyle,
        )
    }
}