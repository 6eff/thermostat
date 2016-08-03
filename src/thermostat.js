'use strict';

function Thermostat (){
  this.temperature = 20;
  this.powerSave = true;
  this.MINIMUM_TEMPERATURE = 10;
  this.TEMP_FOR_MEDIUM_USAGE = 18;
  this.MAXIMUM_TEMP_POWERSAVE_ON = 25;
  this.MAXIMUM_TEMP_POWESAVE_OFF = 32;
}
Thermostat.prototype.energyUsage = function(){
  if (this.temperature < this.TEMP_FOR_MEDIUM_USAGE) {
    return 'low';
  }
  if (this.temperature >= this.TEMP_FOR_MEDIUM_USAGE && this.temperature <= this.MAXIMUM_TEMP_POWERSAVE_ON) {
    return 'medium';
  }
  return 'high';
};

Thermostat.prototype.getCurrentTemperature = function () {
  return this.temperature;
};

Thermostat.prototype.up = function() {
  if(this.isMaxTemperature()) {
    return;
  }
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

Thermostat.prototype.isMaxTemperature = function() {
if (this.isPowerSaveOn()) {
  return this.temperature === this.MAXIMUM_TEMP_POWERSAVE_ON;
}
  return this.temperature === this.MAXIMUM_TEMP_POWESAVE_OFF;
};

Thermostat.prototype.switchPowerSaveOff = function() {
  this.powerSave = false;
};

Thermostat.prototype.switchPowerSaveOn = function(){
  this.powerSave = true;
};

Thermostat.prototype.reset = function() {
  this.temperature = 20;
};
