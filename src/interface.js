$(document).ready(function() {
	var thermostat = new Thermostat();
  updateTemperature();

$('#temperature-up').click(function() {
  thermostat.up();
  updateTemperature();
});

$('#temperature-down').click(function(){
  thermostat.down();
  updateTemperature();
});

$('#temperature-reset').click(function(){
  thermostat.reset();
  updateTemperature();
});

$('#powersaving-on').click(function(){
  thermostat.switchPowerSaveOn();
  $('#power-saving-status').text('ON');
  updateTemperature();
});

$('#powersaving-off').click(function(){
  thermostat.switchPowerSaveOff();
  $('#power-saving-status').text('OFF');
  updateTemperature();
});

	function updateTemperature() {
$('#temperature').text(thermostat.temperature);
	}
});
