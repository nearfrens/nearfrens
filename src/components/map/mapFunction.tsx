const maxLat: number = 90;
const maxLng: number = 180;
const maxInt32: number = 2147483647;


export function convertLatFloatToInt32(latitude: number): number {
    return Math.floor( maxInt32 * latitude / maxLat );
}

export function convertLngFloatToInt32(longitude: number): number { 
    return Math.floor( maxInt32 * longitude / maxLng );
}

export function convertLatInt32ToFloat(latitude: number): number {
    return maxLat * ( latitude / maxInt32 );
}

export function convertLngInt32ToFloat(longitude: number): number { 
    return maxLng * ( longitude / maxInt32 );
}
