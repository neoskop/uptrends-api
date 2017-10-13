import 'mocha';
import { expect, use } from 'chai';
import { UptrendsAPI } from './api';
import { spy, SinonSpy } from 'sinon';
import * as sinonChai from 'sinon-chai';
import { Dimension } from './enums/dimension';
import { Request, IRequest } from './request';

use(sinonChai);

describe('UptrendsAPI', () => {
    let api : UptrendsAPI;
    let reqSpy : SinonSpy;
    let requestSpy : SinonSpy;
    
    beforeEach(() => {
        api = new UptrendsAPI({ username: 'foo', password: 'bar' });
        requestSpy = spy((api as any).request, 'request');
        reqSpy = (api as any).request.req = spy(function req() {});
    });
    
    describe(':constructor', () => {
        it('should create Request', () => {
            expect(api.request).to.be.instanceOf(Request);
        });
        
        it('should use provided Request class', () => {
            const request : IRequest = {
                async get<T>(..._args : any[]) : Promise<T> { return null as any },
                async post<T>(..._args : any[]) : Promise<T> { return null as any },
                async put<T>(..._args : any[]) : Promise<T> { return null as any },
                async delete<T>(..._args : any[]) : Promise<T> { return null as any }
            };
            
            const api = new UptrendsAPI(request);
            
            expect(api.request).to.be.equal(request);
        })
    });
    
    [
        [ 'getProbes', [], [ 'GET', '/probes' ]],
        [ 'createProbe', [ { create: 'probe' }], [ 'POST', '/probes', { create: 'probe' } ]],
        [ 'getProbe', [ 'foobar' ], [ 'GET', '/probes/foobar' ]],
        [ 'updateProbe', [ { Guid: 'foobar', update: 'probe' } ], [ 'PUT', '/probes/foobar', { Guid: 'foobar', update: 'probe' } ]],
        [ 'deleteProbe', [ 'foobar' ], [ 'DELETE', '/probes/foobar' ]],
        
        [ 'getProbeGroups', [], [ 'GET', '/probegroups' ]],
        [ 'createProbeGroup', [ { create: 'probegroup' }], [ 'POST', '/probegroups', { create: 'probegroup' } ]],
        [ 'getProbeGroup', [ 'foobar' ], [ 'GET', '/probegroups/foobar' ]],
        [ 'updateProbeGroup', [ { Guid: 'foobar', update: 'probegroup' } ], [ 'PUT', '/probegroups/foobar', { Guid: 'foobar', update: 'probegroup' } ]],
        [ 'deleteProbeGroup', [ 'foobar' ], [ 'DELETE', '/probegroups/foobar' ]],
        
        [ 'getProbeGroupMembers', [ 'foobar' ], [ 'GET', '/probegroups/foobar/members' ]],
        [ 'addProbeGroupMember', [ 'foobar', { add: 'member' } ], [ 'POST', '/probegroups/foobar/members', { add: 'member' } ]],
        [ 'deleteProbeGroupMember', [ 'foobar', { delete: 'member' } ], [ 'DELETE', '/probegroups/foobar/members', { delete: 'member' } ]],
        
        [ 'getCheckpointServers', [], [ 'GET', '/checkpointservers' ]],
        
        [ 'getProbeGroupStatus', [ 'foobar' ], [ 'GET', '/probegroups/foobar/status' ]],
        [ 'getProbeStatus', [ 'foobar' ], [ 'GET', '/probes/foobar/status' ]],
        
        [ 'getProbeGroupStatistics', [ 'foobar', '2017/01/01', '2018/01/01', Dimension.Month ], [
            'GET',
            '/probegroups/foobar/statistics?Start=2017%2F01%2F01&End=2018%2F01%2F01&Dimension=Month'
        ]],
        [ 'getProbeStatistics', [ 'foobar', '2017/01/01', '2018/01/01', Dimension.Month ], [
            'GET',
            '/probes/foobar/statistics?Start=2017%2F01%2F01&End=2018%2F01%2F01&Dimension=Month'
        ]],
        
        [ 'getProbeGroupAlerts', [ 'foobar', '2017/01/01', '2018/01/01' ], [
            'GET',
            '/probegroups/foobar/alerts?Start=2017%2F01%2F01&End=2018%2F01%2F01'
        ]],
    ].forEach(([ method, args, expected ] : [ string, any[], string[] ]) => {
        describe(`:${method}`, () => {
            it('should call request and return Promise', () => {
                const res = (api as any)[method](...args);
            
                expect(res).to.be.instanceOf(Promise);
            
                expect(requestSpy).to.have.been.calledOnce;
                expect(requestSpy).to.have.been.calledWith(...expected);
            });
        });
    });
});
