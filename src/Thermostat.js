'use strict';

function Thermostat() {
this.temperature = 20;
this.MINIMUM_TEMPERATURE = 10;
}
Thermostat.prototype.getCurrentTemperature = function() {
  return this.temperature;
};
Thermostat.prototype.up = function () {
   this.temperature += 1;
};
Thermostat.prototype.isMinTemperature = function() {
  return this.temperature === this.MINIMUM_TEMPERATURE;
}

Thermostat.prototype.down = function () {
  if(this.isMinTemperature()) {
    return;
  }
  this.temperature -= 1;
};
