'use strict';

describe('Thermostat', function(){
  var thermostat;
  beforeEach(function(){
    thermostat = new Thermostat();
  });

  it('starts at 20 degrees', function(){
    expect(thermostat.getCurrentTemperature()).toEqual(20);
  });

  it('increases the temperature by 1', function(){
    thermostat.up();
    expect(thermostat.getCurrentTemperature()).toEqual(21);
  });

  it('decreases temperature by 1', function(){
    thermostat.down();
    expect(thermostat.getCurrentTemperature()).toEqual(19);
  });
  it('has a minimum temperature of 10', function(){
    for (var i=0; i<11; i++){
      thermostat.down();
    }
    expect(thermostat.getCurrentTemperature()).toEqual(10);
  });

  it('has a power saving mode by default', function() {
    expect(thermostat.isPowerSaveOn()).toBe(true);
  });

  it('can switch the power saving mode off',function(){
    thermostat.switchPowerSaveOff();
    expect(thermostat.isPowerSaveOn()).toBe(false);
  });

  it('can switch the power saving mode on', function(){
    thermostat.switchPowerSaveOff();
    thermostat.switchPowerSaveOn();
    expect(thermostat.isPowerSaveOn()).toBe(true);
  });
});
