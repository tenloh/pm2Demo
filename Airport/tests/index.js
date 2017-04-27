'use strict'

//Requiring mocha and chai
const mocha = require('mocha');
const chai = require('chai');
const expect = chai.expect;

//Test Files
const utils = require('../server/utils');

describe('Test JavaScript Files', function(){

    describe('Utils', function(){

        describe('Filter By Country function', function(){

            let trueSample = 'KLGA,large_airport,La Guardia Airport,40.77719879,-73.87259674,21,NA,US,US-NY,New York,KLGA,LGA,LGA';
            let falseSample = 'KK79,small_airport,Jetmore Municipal Airport,37.98450089,-99.89430237,2466,NA,US,US-KS,Jetmore,KK79,,K79';

            it('should return true for a large or medium airport', function(){
                expect(utils.filterByCountry(trueSample, 'US')).to.be.equal(true);
            });

            it('should return false for a small airport', function(){
                expect(utils.filterByCountry(falseSample, 'US')).to.be.equal(false);
            });

            it('should return false for a null input', function(){
                expect(utils.filterByCountry(null, 'US')).to.be.equal(false);
            });
        });

        describe('Replace Iso Region with State', function(){
            let smallHash = {
                AZ: 'Arizona',
                MA: 'Massachusetts'
            }

            it('should return Massachusetts when the input is US-MA', function(){
                expect(utils.replaceIsoRegionWithState('US-MA')).to.be.equal('Massachusetts');
            });

            it('should return null when the input is not a key', function(){
                expect(utils.replaceIsoRegionWithState('US-31')).to.be.equal(null);
            })
        })

    });

});