import 'mocha';
import { expect } from 'chai';
import { formatDate, url } from './utils';

describe('utils', () => {
    describe('formatDate', () => {
        it('should throw on incorrect formatted string', () => {
            expect(() => {
                formatDate('Foobar');
            }).to.throw(Error, 'Invalid date provided, required Date or string with format "yyyy/mm/dd", "Foobar" given')
        });
        
        it('should return as is on correct formatted string', () => {
            expect(formatDate('2017/06/01')).to.be.equal('2017/06/01');
        });
        
        it('should return formatted date on Date', () => {
            expect(formatDate(new Date(2018, 8, 30))).to.be.equal('2018/09/30');
            expect(formatDate(new Date(2018, 10, 1))).to.be.equal('2018/11/01');
        });
        
        it('should throw on invalid Date', () => {
            expect(() => {
                formatDate(new Date('Foobar'));
            }).to.throw(Error, 'Invalid date provided, required Date or string with format "yyyy/mm/dd", "Invalid Date" given')
        });
    });
    
    describe('url', () => {
        it('should escape values in template string', () => {
            expect(url`/foo`).to.be.equal('/foo');
            expect(url`${'bär'}`).to.be.equal('b%C3%A4r');
            expect(url`/foo/${'bar'}`).to.be.equal('/foo/bar');
            expect(url`/foo/${' '}`).to.be.equal('/foo/%20');
            expect(url`/foo/${'ö'}`).to.be.equal('/foo/%C3%B6');
        })
    });
})
