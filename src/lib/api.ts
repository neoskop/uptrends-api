import { IRequest, IRequestConfig, Request } from './request';
import { Probe } from './types/probe';
import { ProbeGroup, ProbeGroupMember } from './types/probe-group';
import { CheckpointServer } from './types/checkpoint-server';
import { Status } from './types/status';
import { Dimension } from './enums/dimension';
import { Statistics } from './types/statistics';
import { formatDate, url } from './utils';
import { Alert } from './types/alert';
import debug from 'debug';
const D = debug('uptrends:api');

export class UptrendsAPI {
    readonly request : IRequest;
    
    constructor(configOrRequest : IRequestConfig|IRequest) {
        if(configOrRequest.hasOwnProperty('username') && configOrRequest.hasOwnProperty('password')) {
            this.request = new Request(configOrRequest as IRequestConfig);
        } else {
            this.request = configOrRequest as IRequest;
        }
    }
    
    getProbes() : Promise<Probe[]> {
        D('getProbes');
        return this.request.get('/probes');
    }
    
    createProbe(probe : Probe) : Promise<Probe> {
        D('createProbe %j', probe);
        return this.request.post(url`/probes`, probe);
    }
    
    getProbe(probeGuid : string) : Promise<Probe> {
        D('getProbe %j', probeGuid);
        return this.request.get(url`/probes/${probeGuid}`);
    }
    
    updateProbe(probe : Probe) : Promise<void> {
        D('updateProbe %j', probe);
        return this.request.put(url`/probes/${probe.Guid}`, probe)
    }
    
    deleteProbe(probeGuid : string) : Promise<void> {
        D('deleteProbe %j', probeGuid);
        return this.request.delete(url`/probes/${probeGuid}`);
    }
    
    getProbeGroups() : Promise<ProbeGroup[]> {
        D('getProbeGroups');
        return this.request.get(url`/probegroups`);
    }
    
    createProbeGroup(probeGroup : ProbeGroup) : Promise<ProbeGroup> {
        D('createProbeGroup %j', probeGroup);
        return this.request.post(url`/probegroups`, probeGroup);
    }
    
    getProbeGroup(probeGroupGuid : string) : Promise<ProbeGroup> {
        D('getProbeGroup %j', probeGroupGuid);
        return this.request.get(url`/probegroups/${probeGroupGuid}`);
    }
    
    updateProbeGroup(probeGroup : ProbeGroup) : Promise<void> {
        D('updateProbeGroup %j', probeGroup);
        return this.request.put(url`/probegroups/${probeGroup.Guid}`, probeGroup);
    }
    
    deleteProbeGroup(probeGroupGuid : string) : Promise<void> {
        D('deleteProbeGroup %j', probeGroupGuid);
        return this.request.delete(url`/probegroups/${probeGroupGuid}`);
    }
    
    getProbeGroupMembers(probeGroupGuid : string) : Promise<Probe[]> {
        D('getProbeGroupMembers %j', probeGroupGuid);
        return this.request.get(url`/probegroups/${probeGroupGuid}/members`);
    }
    
    addProbeGroupMember(probeGroupGuid : string, member : ProbeGroupMember) : Promise<{ Guid : string, ProbeGuid: string }> {
        D('addProbeGroupMember %j, %j', probeGroupGuid, member);
        return this.request.post(url`/probegroups/${probeGroupGuid}/members`, member);
    }
    
    deleteProbeGroupMember(probeGroupGuid : string, member : ProbeGroupMember) : Promise<void> {
        D('deleteProbeGroupMember %j, %j', probeGroupGuid, member);
        return this.request.delete(url`/probegroups/${probeGroupGuid}/members`, member);
    }
    
    getCheckpointServers() : Promise<CheckpointServer[]> {
        D('getCheckpointServers');
        return this.request.get(url`/checkpointservers`);
    }
    
    getProbeGroupStatus(probeGroupGuid : string) : Promise<Status[]> {
        D('getProbeGroupStatus %j', probeGroupGuid);
        return this.request.get(url`/probegroups/${probeGroupGuid}/status`);
    }
    
    getProbeStatus(probeGuid : string) : Promise<Status> {
        D('getProbeStatus %j', probeGuid);
        return this.request.get(url`/probes/${probeGuid}/status`);
    }
    
    getProbeGroupStatistics(probeGroupGuid : string, startDate : Date|string, endDate : Date|string, dimension : Dimension) : Promise<Statistics[]> {
        D('getProbeGroupStatistics %j, %j, %j, %j', probeGroupGuid, startDate, endDate, dimension);
        return this.request.get(url`/probegroups/${probeGroupGuid}/statistics?Start=${formatDate(startDate)}&End=${formatDate(endDate)}&Dimension=${dimension}`)
    }
    
    getProbeStatistics(probeGuid : string, startDate : Date|string, endDate : Date|string, dimension : Dimension) : Promise<Statistics[]> {
        D('getProbeStatistics %j, %j, %j, %j', probeGuid, startDate, endDate, dimension);
        return this.request.get(url`/probes/${probeGuid}/statistics?Start=${formatDate(startDate)}&End=${formatDate(endDate)}&Dimension=${dimension}`)
    }
    
    getProbeGroupAlerts(probeGroupGuid : string, startDate : Date|string, endDate : Date|string) : Promise<Alert[]> {
        D('getProbeGroupsAlerts %j, %j, %j', probeGroupGuid, startDate, endDate);
        return this.request.get(url`/probegroups/${probeGroupGuid}/alerts?Start=${formatDate(startDate)}&End=${formatDate(endDate)}`)
    }
}
