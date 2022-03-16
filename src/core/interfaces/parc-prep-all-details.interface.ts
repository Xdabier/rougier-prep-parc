export interface ParcPrepAllDetailsInterface {
    aac: string;
    creationDate: string;
    allSynced: 0 | 1;
    siteName: string;
    siteCode: string;
    cuberName: string;
    cuberCode: string;
    lastLogDate: string | null;
    lastLogId: string | null;
    logsNumber: number;
    sumVolumes?: number;
    sumManualVolumes?: number;
    id: string;
    name: string;
    isDefault: 0 | 1;
}
