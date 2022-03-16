export interface LogInterface {
    parcPrepId: string;
    creationDate: string;
    barCode: string;
    logging: string;
    indicator: string;
    id: string;
    gasoline: string;
    dgb: number;
    dpb: number;
    diameter: number;
    volume: number;
    lengthVal: number;
    quality: string;
    status: string;
    statusPattern: string;
    manualVolume?: number;
}

export interface LogDetailsInterface {
    gasName: string;
    gasCode: string;
    parcPrepId: string;
    creationDate: string;
    barCode: string;
    logging: string;
    lengthVal: number;
    indicator: string;
    id: string;
    dgb: number;
    dpb: number;
    diameter: number;
    volume: number;
    quality: string;
    status: string;
    statusPattern: string;
    manualVolume?: number;
}

export interface VolumesSumsInterface {
    sumManualVolume: number;
    sumVolume: number;
}
