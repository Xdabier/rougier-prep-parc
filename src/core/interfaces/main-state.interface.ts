import {CuberInterface} from './cuber.interface';
import {SiteInterface} from './site.interface';
import {DefParcInterface} from './def-parc.interface';
import {GasolineInterface} from './gasoline.interface';
import {LogDetailsInterface} from './log.interface';
import {UserInterface} from './user.interface';
import {ParcPrepAllDetailsInterface} from './parc-prep-all-details.interface';
import {ServerInterface} from './server.interface';
import {ParcPrepInterface} from './parc-prep.interface';

export interface MainStateContextInterface {
    setFilteringId?: (
        v: Pick<ParcPrepInterface, 'id' | 'name'> | undefined
    ) => void;
    filteringId?: Pick<ParcPrepInterface, 'id' | 'name'>;
    keyboardHeight?: number;
    setServerData?: (v: ServerInterface) => void;
    serverData?: ServerInterface;
    setUser?: (v: UserInterface) => void;
    user?: UserInterface;
    setDefaultParc?: (v: DefParcInterface) => void;
    defaultParc: DefParcInterface;
    setCubers?: (v: CuberInterface | CuberInterface[]) => void;
    cubers: CuberInterface[];
    setParcIds?: (
        v:
            | Pick<ParcPrepInterface, 'id' | 'name'>
            | Pick<ParcPrepInterface, 'id' | 'name'>[]
    ) => void;
    parcIds: Pick<ParcPrepInterface, 'id' | 'name'>[];
    setSites?: (v: SiteInterface | SiteInterface[]) => void;
    sites: SiteInterface[];
    setGasoline?: (v: GasolineInterface | GasolineInterface[]) => void;
    gasolines: GasolineInterface[];
    setLogs?: (v: LogDetailsInterface | LogDetailsInterface[]) => void;
    logs: LogDetailsInterface[];
    setParcPrepFiles?: (
        v: ParcPrepAllDetailsInterface | ParcPrepAllDetailsInterface[]
    ) => void;
    parcPrepFiles: ParcPrepAllDetailsInterface[];
    setHomeParcPrepFile?: (v: ParcPrepAllDetailsInterface) => void;
    homeParcPrepFile?: ParcPrepAllDetailsInterface | null;
}
