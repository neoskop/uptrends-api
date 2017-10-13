import { ProbeType } from '../enums/probe-type';
import { DnsLookupMode } from '../enums/dns-lookup-mode';
import { DNSQueryType } from '../enums/dns-query-type';
import { HttpMethod } from '../enums/http-method';
import { ConnectMethod } from '../enums/connect-method';
import { IGuid } from './guid';

export interface IProbe {
    Name: string;
    URL: string;
    Port: number;
    CheckFrequency: number;
    ProbeType: ProbeType;
    IsActive: boolean;
    GenerateAlert: boolean;
    Notes: string;
    PerformanceLimit1: number;
    PerformanceLimit2: number;
    ErrorOnLimit1: boolean;
    ErrorOnLimit2: boolean;
    MinBytes: number;
    ErrorOnMinBytes: boolean;
    Timeout: number;
    TcpConnectTimeout: number;
    MatchPattern: string;
    DnsLookupMode: DnsLookupMode;
    UserAgent: string;
    UserName: string;
    Password: string;
    IsCompetitor: boolean;
    Checkpoints: string;
}

export interface IDnsProbe extends IProbe {
    ProbeType: ProbeType.DNS;
    
    DNSQueryType: DNSQueryType
    DNSTestValue: string;
    DNSExpectedResult: string;
}

export interface IDatabaseProbe extends IProbe {
    ProbeType: ProbeType.MySQL | ProbeType.MSSQL;
    
    DatabaseName: string;
}

export interface IHttpProbe extends IProbe {
    ProbeType: ProbeType.Http | ProbeType.Https | ProbeType.WebserviceHttp | ProbeType.WebserviceHttps;
    
    HttpMethod: HttpMethod;
    PostData?: string;
}

export interface IConnectProbe extends IProbe {
    ProbeType: ProbeType.Connect;
    
    ConnectMethod: ConnectMethod;
}

export type Probe = IGuid & (IProbe | IDnsProbe | IDatabaseProbe | IHttpProbe | IConnectProbe);
