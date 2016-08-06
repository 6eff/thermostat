thermostat = new Thermostat();
$(document).ready(function() {

  			$(document).on('click', function() {
  				$.post("http://localhost:4567/send", {
  					temp: thermostat.getCurrentTemp(),
  					psm: thermostat.isPowerSavingModeOn()
  				});
        });


				$.getJSON("http://localhost:4567/send", function(data) {
					thermostat._temp = Number(data.thermostat_temp);
          thermostat.PSM = JSON.parse(data.psm);
          $('#temperature').text(thermostat.getCurrentTemp());
          $('#usage-status').text(usageStatus());
          $("#power-saving-status").text(PSM());

				});
				//   response = data;

				// Begin Weather API call from http://openweathermap.org/
				// sometimes the server is pretty slow...

				$.get('http://!api.openweathermap.org/data/2.5/weather?q=London&appid=1c510bb9e7efb31530838d1a846ec2f7&units=metric', function(data) {
					$('#current-temperature').text(data.main.temp);
					$('#current-city').text(data.name);
					$('#outlook').text('"' + data.weather[0].description + '"');
				});

				$('#select-city').submit(function(event) {
					event.preventDefault();
					var city = $('#city').val();
					$.get('http://!api.openweathermap.org/data/2.5/weather?q=' + city + '&appid=1c510bb9e7efb31530838d1a846ec2f7&units=metric', function(data) {
						$('#current-temperature').text(data.main.temp);
						$('#current-city').text(data.name);
						$('#outlook').text('"' + data.weather[0].description + '"');
					});
				});

				// End weather API call


				// Begin set interface defaults
				// $('#usage-status').text(usageStatus());
				// $('#temperature').text(thermostat.getCurrentTemp());
				// End set interface defaults

				$("#up").click(function(event) {
					if (thermostat.tempUp()) {
						modColorUp();
						$('#usage-status').text(usageStatus());
						updateTemperature();
					}
				});

				$("#down").click(function(event) {
					if (thermostat.tempDown()) {
						modColorDown();
						$('#usage-status').text(usageStatus());
						updateTemperature();
					}

				});

				$("#switchPSMOn").click(function(event) {
					thermostat.switchPSMOn();
					updateTemperature();
					PSM();
				});

				$("#switchPSMOff").click(function(event) {
					thermostat.switchPSMOff();
					PSM();
				});

				$("#resetTemp").click(function(event) {
					thermostat.resetTemp();
					$('#usage-status').text(usageStatus());
					updateTemperature();
					resetColor();
				});

				$("#power-saving-status").append(function() {
					PSM();
				});
				// color();

				function updateTemperature() {
					$('#temperature').text(thermostat.getCurrentTemp());
				}

				function PSM() {
					$("#power-saving-status").text(function() {
						if (thermostat.isPowerSavingModeOn()) {
							return "ON";
						} else {
							return "OFF";
						}
					});
				}

				function usageStatus() {
					return thermostat.getUsage();
				}

				var r = 240;
				var g = 230;
				var b = 120;

				function resetColor() {
					r = 240;
					g = 230;
					b = 120;
					var col = 'rgb(' + r + ',' + g + ',' + b + ')';
					document.getElementById('bgGrade').style.background = col;
				}

				function modColorUp() {


					r = r + 10;
					g = g - 10;

					var col = 'rgb(' + r + ',' + g + ',' + b + ')';
					document.getElementById('bgGrade').style.background = col;
				}

				function modColorDown() {
					r = r - 10;
					g = g + 10;
					var col = 'rgb(' + r + ',' + g + ',' + b + ')';
					document.getElementById('bgGrade').style.background = col;
					//document.getElementById('debug').innerHTML = col;
				}
			});
