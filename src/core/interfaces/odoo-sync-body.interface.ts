interface OdooParcPrepBodyInterface {
    aac: string;
    cuber: string;
    site: string;
    creation_date: string;
    id: string;
}

export interface OdooLogsBodyInterface {
    bar_code: string;
    logging: number;
    indicator: number;
    length: number;
    id: string;
    dgb: number;
    dpb: number;
    diameter: number;
    volume: number;
    quality: string;
    status?: string;
    status_pattern?: string;
    gasoline: string;
}

export interface OdooSyncBodyInterface extends OdooParcPrepBodyInterface {
    logs: OdooLogsBodyInterface[];
    sync: boolean;
    sync_date: string;
}
