import {SyncDataInterface} from '../interfaces/sync-data.interface';
import {ParcPrepInterface} from '../interfaces/parc-prep.interface';
import {getRawParcPrepFileById} from './parc-prep.service';
import {LogInterface} from '../interfaces/log.interface';
import {getRawLogs} from './logs.service';

export const generateSingleSyncFile = async (
    parcPrepId: string
): Promise<SyncDataInterface> => {
    try {
        const PP: ParcPrepInterface[] = await getRawParcPrepFileById(
            parcPrepId
        );

        if (PP.length && PP[0].id) {
            const LOGS: LogInterface[] = await getRawLogs(PP[0]?.id);
            return {
                ...PP[0],
                logs: LOGS
            };
        }
        throw new Error('Parc preparation file not found');
    } catch (e) {
        throw new Error(e);
    }
};
