import { AlertType } from "../enums/alert-type";

export interface IAlert {
    ProbeGuid: string;
    Timestamp: string;
    FirstError: string;
    AlertType: AlertType;
    ErrorDescription?: string;
    ErrorDetails?: string;
}

export type Alert = IAlert;
