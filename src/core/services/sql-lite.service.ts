import {ResultSet, SQLError, SQLiteDatabase} from 'react-native-sqlite-storage';
import DB from './sql-lite-config.service';
import {AuxiliaryInterface} from '../interfaces/auxiliary.interface';
import NameToTableEnum from '../enum/name-to-table.enum';
import {ParcPrepInterface} from '../interfaces/parc-prep.interface';

class SqlLiteService {
    private readonly _db!: SQLiteDatabase;

    private _finished!: boolean;

    constructor() {
        this._db = DB;
    }

    get db(): SQLiteDatabase {
        return this._db;
    }

    get finished(): boolean {
        return this._finished;
    }

    private _executeQuery(
        sqlStatement: string,
        params: any[] = []
    ): Promise<ResultSet> {
        return new Promise<ResultSet>((resolve, reject) => {
            this._finished = false;
            this._db.transaction(
                (tx) => {
                    tx.executeSql(
                        sqlStatement,
                        params,
                        (trans1, results: ResultSet) => {
                            resolve(results);
                        },
                        (error) => {
                            reject(error);
                        }
                    );
                },
                (error: SQLError) => {
                    console.error(error);
                },
                () => {
                    this._finished = true;
                }
            );
        });
    }

    async getAux<T>(table: NameToTableEnum, close = false): Promise<T[]> {
        try {
            const RES: ResultSet = await this._executeQuery(
                `SELECT * FROM ${table};`
            );
            if (close && !this._finished) {
                this._db.close().catch((reason: SQLError) => {
                    console.error('err aux = ', reason);
                });
            }
            return RES.rows.raw() as T[];
        } catch (e) {
            return Promise.reject(e);
        }
    }

    async getParcPrepFiles<T>(close = false): Promise<T[]> {
        try {
            const RES: ResultSet = await this._executeQuery(
                `SELECT * FROM parc_prep;`
            );
            if (close && !this._finished) {
                this._db.close().catch((reason: SQLError) => {
                    console.error('err parc_prep = ', reason);
                });
            }
            return RES.rows.raw() as T[];
        } catch (e) {
            return Promise.reject(e);
        }
    }

    async getLogs<T>(close = false): Promise<T[]> {
        try {
            const RES: ResultSet = await this._executeQuery(
                `SELECT * FROM log;`
            );
            if (close && !this._finished) {
                this._db.close().catch((reason: SQLError) => {
                    console.error('err parc_prep = ', reason);
                });
            }
            return RES.rows.raw() as T[];
        } catch (e) {
            return Promise.reject(e);
        }
    }

    async insertAux(
        element: AuxiliaryInterface,
        table: NameToTableEnum
    ): Promise<ResultSet> {
        try {
            return await this._executeQuery(
                `INSERT INTO ${table} (name, code) VALUES (?, ?);`,
                [element.name, element.code]
            );
        } catch (e) {
            return Promise.reject(e);
        }
    }

    async insertParcPrep(element: ParcPrepInterface): Promise<ResultSet> {
        try {
            return await this._executeQuery(
                `INSERT INTO parc_prep (aac, cuber, site, creationDate, allSynced, defaultParcFile) VALUES (?, ?, ?, ?, ?, ?);`,
                [
                    element.aac,
                    element.cuber,
                    element.site,
                    element.creationDate,
                    element.allSynced,
                    element.defaultParcFile
                ]
            );
        } catch (e) {
            return Promise.reject(e);
        }
    }
}

export default SqlLiteService;
