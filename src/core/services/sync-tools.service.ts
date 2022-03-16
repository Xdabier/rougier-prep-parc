import {SyncDataInterface} from '../interfaces/sync-data.interface';
import {ParcPrepInterface} from '../interfaces/parc-prep.interface';
import {getRawParcPrepFileById} from './parc-prep.service';
import {LogInterface} from '../interfaces/log.interface';
import {getRawLogs} from './logs.service';
import {
    OdooLogsBodyInterface,
    OdooSyncBodyInterface
} from '../interfaces/odoo-sync-body.interface';

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

export const convertLogsToSyncLogs = (
    logs: LogInterface[]
): OdooLogsBodyInterface[] =>
    logs.map((log: LogInterface) => {
        const ODOO_LOG_BODY: OdooLogsBodyInterface = {
            num_bille: log.id,
            dgb: log.dgb,
            dpb: log.dpb,
            barcode: log.barCode,
            diameter_moyen: log.diameter,
            essence: log.gasoline,
            num_indice: log.indicator,
            num_abattage: log.logging,
            longueur: log.lengthVal,
            quality: log.quality,
            volume: log.volume,
            volume_saisi: log.manualVolume || undefined
        };

        if (log.status) {
            ODOO_LOG_BODY.statut = log.status;
        }

        if (log.statusPattern) {
            ODOO_LOG_BODY.motif_statut = log.statusPattern;
        }

        return ODOO_LOG_BODY;
    });

const parseTime = (time: number): string => {
    if (`${time}`.length === 1) {
        return `0${time}`;
    }
    return `${time}`;
};

const convertDate = (date: Date): string =>
    `${parseTime(date.getMonth() + 1)}/${parseTime(
        date.getDate()
    )}/${date.getFullYear()}`;

export const convertSyncFile = (
    syncFile: SyncDataInterface
): OdooSyncBodyInterface => ({
    name: syncFile.name,
    sync: true,
    aac: syncFile.aac,
    billes: convertLogsToSyncLogs(syncFile.logs),
    creation_date: convertDate(new Date(syncFile.creationDate)),
    cuber: syncFile.cuber,
    site: syncFile.site,
    sync_date: convertDate(new Date())
});
