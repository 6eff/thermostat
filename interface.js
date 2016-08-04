$(document).ready(function() {

  var thermostat = new Thermostat();

  function updateTemperature() {
    $('#temperature').text(thermostat.temperature);
    $('#temperature').attr('class', thermostat.energyUsage());
  }

  updateTemperature();

  $('#temp-up').click(function() {
    thermostat.up();
    updateTemperature();
  });
  $('#temp-down').click(function() {
    thermostat.down();
    updateTemperature();
  });
  $('#reset').click(function() {
    thermostat.resetTemperature();
  });
  $('#power-saving-on').click(function() {
    thermostat.switchPowerSavingModeOn();
    $('#power-saving-mode').text('ON');
    updateTemperature();
  });
  $('#power-saving-off').click(function() {
    thermostat.switchPowerSavingModeOff();
    $('#power-saving-mode').text('OFF');
    updateTemperature();
  });


});
