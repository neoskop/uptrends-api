import { IGuid } from "./guid";

export interface IProbeGroup {
    Name: string;
    IsAll?: boolean;
    IsClientProbeGroup?: boolean;
}

export interface IProbeGroupMember {
    ProbeGuid: string;
}

export type ProbeGroup = IGuid & IProbeGroup;
export type ProbeGroupMember = IProbeGroupMember;
