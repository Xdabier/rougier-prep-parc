import {GasolineInterface} from './gasoline.interface';

type LogNumber = `${number}/${number}`;

export interface LogInterface {
    parcPrepFileId: string;
    creationDate: string;
    barCode: number;
    logging: number;
    index: number;
    id: LogNumber;
    gasoline: GasolineInterface;
    dgb: number;
    dpb: number;
    diameter: number;
    volume: number;
    quality: number;
    status: string;
    statusPattern: string;
}
