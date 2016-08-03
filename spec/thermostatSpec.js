'use strict';

describe('Thermostat', function(){
  var thermostat;
  beforeEach(function(){
    thermostat = new Thermostat();
  });

  it('starts at 20 degrees', function(){
    expect(thermostat.getCurrentTemperature()).toEqual(20);
  });

  it('has a minimum temperature of 10', function(){
    for (var i=0; i<11; i++){
      thermostat.down();
    }
    expect(thermostat.getCurrentTemperature()).toEqual(10);
  });

  describe('button', function() {
    it('up increases the temperature by 1', function(){
      thermostat.up();
      expect(thermostat.getCurrentTemperature()).toEqual(21);
    });

    it('down decreases temperature by 1', function(){
      thermostat.down();
      expect(thermostat.getCurrentTemperature()).toEqual(19);
    });
  });

  describe('power saving mode', function(){
    it('ON by default', function() {
      expect(thermostat.isPowerSaveOn()).toBe(true);
    });

    it('can be switched off',function(){
      thermostat.switchPowerSaveOff();
      expect(thermostat.isPowerSaveOn()).toBe(false);
    });

    it('can be switched on', function(){
      thermostat.switchPowerSaveOff();
      thermostat.switchPowerSaveOn();
      expect(thermostat.isPowerSaveOn()).toBe(true);
    });
  });
  describe('sets maximum temperature', function() {

    it('of 25 when power save is on', function(){
      for(var i=0; i < 6; i++){
        thermostat.up();
      }
      expect(thermostat.getCurrentTemperature()).toEqual(25);
    });

    it('of 32 when power save is off', function(){
      thermostat.switchPowerSaveOff();
    for(var i=0; i<13; i++) {
      thermostat.up();
    }
    expect(thermostat.getCurrentTemperature()).toEqual(32);
    });
  });

  describe('can reset', function(){
    it('the temperature down to 20',function(){
      thermostat.up();
      thermostat.reset();
      expect(thermostat.getCurrentTemperature()).toEqual(20);
    });
    it('the temperature up to 20',function(){
      thermostat.down();
      thermostat.reset();
      expect(thermostat.getCurrentTemperature()).toEqual(20);
    });
  });

  describe('diplaying usage levels', function() {
    describe('when the temperature is below 18', function() {
      it('is considered low_usage', function() {
        for(var i=0; i<3; i++) {
          thermostat.down();
        }
        expect(thermostat.energyUsage()).toEqual('low');
      });
    });
    describe('when the temperature is between 18-25', function() {
      it('is considered medium usage', function() {
        expect(thermostat.energyUsage()).toEqual('medium');
      });
    });
    describe('when temperautre is above 25', function() {
      it('is considered high usage', function() {
        thermostat.switchPowerSaveOff();
        for(var i=0; i < 6; i++) {
          thermostat.up();
        }
        expect(thermostat.energyUsage()).toEqual('high');
      });
    });
  });

});
