import { ErrorLevel } from '../enums/error-level';

export interface IStatistics {
    ProbeGuid: string;
    ErrorLevel: ErrorLevel;
    LastCheck: string;
    CheckPointID: number;
    Dimension: string;
    SLAPercentage: number;
    SLATotalTime: number;
    SLAOperationResponseTime: number;
    AvgOperationResponseTime: number;
    PercentageOK: number;
    PercentageError: number;
    PercentageUnknown: number;
    PercentageUptime: number;
    TotalChecks: number;
    Errors: number;
    UnconfirmedErrors: number;
    Alerts: number;
    SecondsOK: number;
    SecondsUnknown: number;
    AverageTotalTime: number;
    AverageResolveTime: number;
    AverageConnectionTime: number;
    AverageDownloadTime: number;
    AverageTotalBytes: number;
}

export type Statistics = IStatistics;
