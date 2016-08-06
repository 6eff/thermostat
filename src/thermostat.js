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
  this.usage;
}

Thermostat.prototype = {
  getCurrentTemp: function() {
    return this._temp;
  },
  tempUp: function() {
    if (!this.isMaxTemp()) {
      this._temp += 1;
      return this._temp;
    }
  },
  isMaxTemp: function() {
    return this.getCurrentTemp() === this.MAX_TEMP;
  },
  tempDown: function() {
    if (!this.isMinTemp()) {
      this._temp -=1 ;
      return this._temp;
    }
  },
  isMinTemp: function() {
    return this.getCurrentTemp() === this.MIN_TEMP;
  },
  switchPSMOn: function() {
    this.PSM = true;
    if (this._temp > 25) {
      this._temp = 25;
    }
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

  getUsage: function() {
    if (this.getCurrentTemp() < this.MEDIUM_ENERGY_USAGE_LIMIT) {
      return this.usage = 'low-usage';
    } else if (this.getCurrentTemp() <= this.HIGH_ENERGY_USAGE_LIMIT) {
      return  this.usage = 'medium-usage';
      } else {
      return  this.usage = 'high-usage';
      }
  },

};
