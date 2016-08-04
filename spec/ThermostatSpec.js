/* jslint node: true */ 'use strict';


describe('Thermostat', function() {

  var thermostat;

  beforeEach(function(){
    thermostat = new Thermostat();
  });

  it('has a default temperature', function() {
    expect(thermostat.getCurrentTemperature()).toEqual(thermostat.DEFAULT_TEMPERATURE);
  });

  it('can increase the temperature by 1 degree', function() {
    thermostat.up();
    expect(thermostat.getCurrentTemperature()).toEqual(thermostat.DEFAULT_TEMPERATURE + 1);
  });

  it('can decrease the temperature by 1 degree', function() {
    thermostat.down();
    expect(thermostat.getCurrentTemperature()).toEqual(thermostat.DEFAULT_TEMPERATURE - 1);
  });

  it('cannot go below minimum termperature', function() {
    for(var i = 0; i < thermostat.DEFAULT_TEMPERATURE + 1; i++) {
      thermostat.down();
    }
    expect(thermostat.getCurrentTemperature()).toEqual(thermostat.MINIMUM_TEMPERATURE);
  });

  it('has power saving model on by default', function() {
    expect(thermostat.isPowerSavingModeOn()).toBe(true);
  });
  it('can switch power saving mode off', function() {
    thermostat.switchPowerSavingModeOff();
    expect(thermostat.isPowerSavingModeOn()).toBe(false);
  });

  it('can switch power saving mode back on', function(){
    thermostat.switchPowerSavingModeOff();
    expect(thermostat.isPowerSavingModeOn()).toBe(false);
    thermostat.switchPowerSavingModeOn();
    expect(thermostat.isPowerSavingModeOn()).toBe(true);
  });

  it('can reset temperature to default', function() {
    for(var i = 0; i < 5; i++) {
      thermostat.up();
    }
    thermostat.resetTemperature();
    expect(thermostat.getCurrentTemperature()).toEqual(thermostat.DEFAULT_TEMPERATURE);
  });

  describe('when power saving mode is on', function() {
    it('it has a maximum temperature', function() {
      thermostat.temperature = 20; //have to set default to 20 on the test so max limit when PSM is on, which is 25, test still works. If default is higher than max limit tests fail.
      for(var i = 0; i < thermostat.MAX_LIMIT_PSM_ON; i++) {
        thermostat.up();
      }
      expect(thermostat.getCurrentTemperature()).toEqual(thermostat.MAX_LIMIT_PSM_ON);
    });
  });

  describe('when power saving mode is off', function() {
    it('it has a maximum temperature', function() {
      thermostat.switchPowerSavingModeOff();
      for(var i = 0; i < thermostat.MAX_LIMIT_PSM_OFF + 1; i++) {
        thermostat.up();
      }
      expect(thermostat.getCurrentTemperature()).toEqual(thermostat.MAX_LIMIT_PSM_OFF);
    });
  });
});
