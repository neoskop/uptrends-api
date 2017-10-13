import { ErrorLevel } from '../enums/error-level';

export interface IStatus {
    ProbeGuid: string;
    ErrorLevel: ErrorLevel;
    ErrorDescription?: string;
    LastCheck: string;
    CheckPointID: number;
    Uptime?: number;
}

export type Status = IStatus;
