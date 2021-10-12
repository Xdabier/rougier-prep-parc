interface OdooParcPrepBodyInterface {
    aac: string;
    cuber: string;
    site: string;
    creation_date: string;
    name: string;
}

export interface OdooLogsBodyInterface {
    barcode: string;
    num_abattage: string;
    num_indice: string;
    longueur: number;
    num_bille: string;
    dgb: number;
    dpb: number;
    diameter_moyen: number;
    volume: number;
    quality: string;
    statut?: string;
    motif_statut?: string;
    essence: string;
}

export interface OdooSyncBodyInterface extends OdooParcPrepBodyInterface {
    sync: boolean;
    sync_date: string;
    billes: OdooLogsBodyInterface[];
}
