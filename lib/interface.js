thermostat = new Thermostat();
  $(document).ready(function() {

    // Begin Weather API call from http://openweathermap.org/
    // sometimes the server is pretty slow...

    // $.post("http://localhost:4567")
    // // current-temperature
    // // PSM
    // var response;
    //
    // $.getJSON("http://localhost:4567", function(data) {
    //   // $(thermostat.elem).text()
    //   response = data;
    // })
    //
    // response.responseText


    $.get('http://!api.openweathermap.org/data/2.5/weather?q=London&appid=1c510bb9e7efb31530838d1a846ec2f7&units=metric', function(data) {
      $('#current-temperature').text(data.main.temp);
      $('#current-city').text(data.name);
      $('#outlook').text('"' + data.weather[0].description + '"');
    })

    $('#select-city').submit(function(event) {
      event.preventDefault();
      var city = $('#city').val();
      $.get('http://!api.openweathermap.org/data/2.5/weather?q=' + city + '&appid=1c510bb9e7efb31530838d1a846ec2f7&units=metric', function(data) {
        $('#current-temperature').text(data.main.temp);
        $('#current-city').text(data.name);
        $('#outlook').text('"' + data.weather[0].description + '"');
      })
    })

    // End weather API call


    // Begin set interface defaults
    $('#usage-status').text(usageStatus());
    $('#temperature').text(thermostat.getCurrentTemp());
    // End set interface defaults

    $("#up").click(function( event) {
      if (thermostat.tempUp()) {
        modColorUp();
        $('#usage-status').text(usageStatus());
      }
      updateTemperature();
    });

    $("#down").click(function(event){
      if (thermostat.tempDown()) {
        modColorDown();
        $('#usage-status').text(usageStatus());
      }
      updateTemperature();
    });

    $("#switchPSMOn").click(function(event) {
      thermostat.switchPSMOn();
      PSM();
    });
    $("#switchPSMOff").click(function(event) {
      thermostat.switchPSMOff();
      PSM();
    });
    $("#resetTemp").click(function(event) {
      thermostat.resetTemp();
      updateTemperature();
      $('#usage-status').text(usageStatus());
      resetColor();
    });
    $("#power-saving-status").append(function(){
      PSM();
    });
    // color();

    function updateTemperature() {
      $('#temperature').text(thermostat.getCurrentTemp());
    }

    function PSM() {
      $("#power-saving-status").text(function(){
        if (thermostat.isPowerSavingModeOn()) {
        return  "ON"
      } else { return "OFF"}
      });
     }

     function usageStatus() {
      return thermostat.getUsage();
     }

    // function color() {
    //   var usage = thermostat.getUsage();
    //   if (usage === "low-usage") {
    //     $('#color').css("background-color", "green");
    //   }
    //   else if (usage==="medium-usage") {
    //     $('#color').css("background-color", "yellow");
    //   }
    //   else {
    //     $('#color').css("background-color", "red");
    //   }
    // }

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

})
