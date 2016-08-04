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

	function displayWeather(city) {
		var url = 'http://api.openweathermap.org/data/2.5/weather?q=' + city;
		var token = '&appid=a3d9eb01d4de82b9b8d0849ef604dbed';
		var units = '&units=metric';
		$.get(url + token + units, function(data) {
			$('#current-weather').text(data.main.temp);
		});
	}

	// displayWeather('London');

	$('#select-city').submit(function(event) {
		event.preventDefault();
		var city = $('#current-city').val();
		displayWeather(city);
	});

});
