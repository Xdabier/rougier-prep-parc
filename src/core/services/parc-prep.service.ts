import {ResultSet, SQLError} from 'react-native-sqlite-storage';
import SqlLiteService from './sql-lite.service';
import {ParcPrepInterface} from '../interfaces/parc-prep.interface';
import {upsertDefaultParcId} from './def-parc.service';
import {ParcPrepStatsInterface} from '../interfaces/parc-prep-stats.interface';
import {
    insertParcPrepStats,
    updateParcPrepStats
} from './parc-prep-stats.service';
import {ParcPrepAllDetailsInterface} from '../interfaces/parc-prep-all-details.interface';

const SQLiteService: SqlLiteService = new SqlLiteService();

export const getParcPrepFilesIds = async (close = false): Promise<string[]> => {
    try {
        const RES: ResultSet = await SQLiteService.executeQuery(
            `SELECT pp.id FROM parc_prep AS pp;`
        );
        if (close && !SQLiteService.finished) {
            SQLiteService.db.close().catch((reason: SQLError) => {
                console.error('err parc_prep = ', reason);
            });
        }
        return RES.rows.raw().map((v: {id: number}) => `${v.id}`) as string[];
    } catch (e) {
        return Promise.reject(e);
    }
};

export const updateParcPrep = async (
    element: ParcPrepInterface
): Promise<ResultSet> => {
    try {
        const UN_SYNCED: ParcPrepInterface = {
            ...element,
            allSynced: 0
        };
        const {id, defaultParcFile, ...others} = UN_SYNCED;
        const KEYS = Object.keys(others);
        const UPD = await SQLiteService.executeQuery(
            `UPDATE parc_prep SET ${KEYS.map(
                (value: string) => `${value} = ?`
            ).join(', ')} WHERE id = ?;`,
            [...KEYS.map((x: string) => (others as any)[x]), id]
        );

        if (defaultParcFile && id) {
            await updateParcPrepStats({
                parcPrepId: +id,
                isDefault: 1
            });
            return upsertDefaultParcId({parcId: +id, id: 0});
        }
        return UPD;
    } catch (e) {
        return Promise.reject(e);
    }
};

export const unSyncParcPrepFile = async (id: string): Promise<ResultSet> => {
    try {
        const UNSYNC: ParcPrepInterface = {
            id: `${id}`,
            allSynced: 0
        } as ParcPrepInterface;

        return await updateParcPrep(UNSYNC);
    } catch (e) {
        return Promise.reject(e);
    }
};

export const getParcPrepFileById = async (
    id: number,
    close = false
): Promise<ParcPrepAllDetailsInterface[]> => {
    try {
        const RES: ResultSet = await SQLiteService.executeQuery(
            `SELECT pp.id, pp.aac, pp.creationDate, pp.allSynced,
            si.name AS siteName, si.code AS siteCode, cu.name AS cuberName,
            cu.code AS cuberCode, ps.lastLogDate, ps.lastLogId, ps.logsNumber,
            ps.isDefault FROM parc_prep AS pp INNER JOIN cuber AS
            cu ON cu.code = pp.cuber JOIN site AS si ON si.code = pp.site
            INNER JOIN parcPrepStats AS ps ON ps.parcPrepId = pp.id WHERE pp.id = ?;`,
            [id]
        );
        if (close && !SQLiteService.finished) {
            SQLiteService.db.close().catch((reason: SQLError) => {
                console.error('err parc_prep = ', reason);
            });
        }
        return RES.rows.raw() as ParcPrepAllDetailsInterface[];
    } catch (e) {
        return Promise.reject(e);
    }
};

export const getParcPrepFiles = async (
    close = false
): Promise<ParcPrepAllDetailsInterface[]> => {
    try {
        const RES: ResultSet = await SQLiteService.executeQuery(
            `SELECT pp.id, pp.aac, pp.creationDate, pp.allSynced,
            si.name AS siteName, si.code AS siteCode, cu.name AS cuberName,
            cu.code AS cuberCode, ps.lastLogDate, ps.lastLogId, ps.logsNumber,
            ps.isDefault FROM parc_prep AS pp INNER JOIN cuber AS
            cu ON cu.code = pp.cuber INNER JOIN site AS si ON si.code = pp.site
            INNER JOIN parcPrepStats AS ps ON ps.parcPrepId = pp.id;`
        );
        if (close && !SQLiteService.finished) {
            SQLiteService.db.close().catch((reason: SQLError) => {
                console.error('err parc_prep = ', reason);
            });
        }
        return RES.rows.raw() as ParcPrepAllDetailsInterface[];
    } catch (e) {
        return Promise.reject(e);
    }
};

export const insertParcPrepFile = async (
    element: ParcPrepInterface
): Promise<ResultSet> => {
    try {
        const {defaultParcFile, ...others} = element;
        const KEYS = Object.keys(others);
        const STR: string = `INSERT INTO parc_prep (${KEYS.join(
            ', '
        )}) VALUES (${KEYS.map(() => '?').join(', ')});`;
        await SQLiteService.executeQuery(
            STR,
            KEYS.map((x: string) => (others as any)[x])
        );
        const ROW_ID: ResultSet = await SQLiteService.executeQuery(
            'SELECT last_insert_rowid();'
        );
        const ID: number = ROW_ID.rows.item(0)['last_insert_rowid()'];
        const STATS: ParcPrepStatsInterface = {
            isDefault: defaultParcFile !== undefined ? defaultParcFile : 0,
            logsNumber: 0,
            parcPrepId: ID
        };

        const INIT_STATS = await insertParcPrepStats(STATS);

        if (element.defaultParcFile) {
            return upsertDefaultParcId({parcId: ID, id: 0});
        }
        return INIT_STATS;
    } catch (e) {
        console.log('err = ', e);
        return Promise.reject(e);
    }
};