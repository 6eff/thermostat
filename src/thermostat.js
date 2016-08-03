'use strict';

function Thermostat() {
  this.DEFAULT_TEMPERATURE = 20;
  this._temp = this.DEFAULT_TEMPERATURE;
  this.MIN_TEMP = 10;
  this.MAX_TEMP = 25;
  this.PSM = true;
  this.MAX_LIMIT_PSM_ON = 25;
  this.MAX_LIMIT_PSM_OFF = 32;
  this.MEDIUM_ENERGY_USAGE_LIMIT = 18;
  this.HIGH_ENERGY_USAGE_LIMIT = 25;
  this.color;
};

Thermostat.prototype = {
  getCurrentTemp: function() {
    return this._temp;
  },
  tempUp: function() {
    if (!this.isMaxTemp())
      this._temp += 1;
  },
  isMaxTemp: function() {
    return this.getCurrentTemp() === this.MAX_TEMP;
  },
  tempDown: function() {
    if (!this.isMinTemp())
      this._temp--;
  },
  isMinTemp: function() {
    return this.getCurrentTemp() === this.MIN_TEMP;
  },
  switchPSMOn: function() {
    this.PSM = true;
    this.maxTemp();
  },
  isPowerSavingModeOn: function() {
    return this.PSM;
  },
  switchPSMOff: function() {
    this.PSM = false;
    this.maxTemp();
  },

  maxTemp: function() {
    if (this.PSM) {
      this.MAX_TEMP = this.MAX_LIMIT_PSM_ON;
    } else {
      this.MAX_TEMP = this.MAX_LIMIT_PSM_OFF;
    }
  },

  resetTemp: function() {
    this._temp = this.DEFAULT_TEMPERATURE;
  },

  color: function() {
    if (this.getCurrentTemp() < this.MEDIUM_ENERGY_USAGE_LIMIT) {
      this.color = 'green';
    } else if (this.getCurrentTemp() <= this.HIGH_ENERGY_USAGE_LIMIT) {
        this.color = 'yellow';
      } else {
        this.color = 'red';
      }
  },

}
