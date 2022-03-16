export interface ParcPrepStatsInterface {
    lastLogDate?: string;
    parcPrepId: string;
    id?: string;
    lastLogId?: string;
    logsNumber?: number;
    sumVolumes?: number;
    sumManualVolumes?: number;
    isDefault: 0 | 1;
}
