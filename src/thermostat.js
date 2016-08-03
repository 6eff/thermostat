'use strict';

function Thermostat (){
  this.temperature = 20;
  this.MINIMUM_TEMPERATURE = 10;
  this.powerSave = true;
}

Thermostat.prototype.getCurrentTemperature = function () {
  return this.temperature;
};

Thermostat.prototype.up = function() {
  return this.temperature += 1;
};

Thermostat.prototype.down = function(){
  if(this.isMinTemperature()) {
  return;
}
  return this.temperature -= 1;
};

Thermostat.prototype.isPowerSaveOn = function(){
  return this.powerSave;
};


Thermostat.prototype.isMinTemperature = function() {
  return this.temperature === this.MINIMUM_TEMPERATURE ;
};

Thermostat.prototype.switchPowerSaveOff = function() {
  this.powerSave = false;
};

Thermostat.prototype.switchPowerSaveOn = function(){
  this.powerSave = true;
};
