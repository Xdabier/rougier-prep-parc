import {CuberInterface} from './cuber.interface';
import {SiteInterface} from './site.interface';

export interface ParcPrepInterface {
    aac: string;
    cuber: CuberInterface;
    site: SiteInterface;
    creationDate: string;
    allSynced: boolean;
    id?: string;
    lastLogDate?: string;
    logsNumber?: number;
}
