getLocation: function() {
    if (navigator.geolocation) {
      var options = {
                     enableHighAccuracy: false,
                     timeout: 5000,
                     maximumAge: 0
                     };
      console.log('this is working!')
      navigator.geolocation.watchPosition(this.showGps, this.showError, options); 
    } else {
      this.gps_error = "Geolocation is not supported by this browser.";
    }
  },

  showGps: function(position) {
    console.log(position)
    this.gps_error = "";
    this.lat = position.coords.latitude;
    this.long = position.coords.longitude;
  },

  showError: function(error) {
    console.log(error)
    switch(error.code) {
      case error.PERMISSION_DENIED:
        this.gps_error = "User denied the request for Geolocation."
        break;
      case error.POSITION_UNAVAILABLE:
        this.gps_error = "Location information is unavailable."
        break;
      case error.TIMEOUT:
        this.gps_error = "The request to get user location timed out."
        break;
      case error.UNKNOWN_ERROR:
        this.gps_error = "An unknown error occurred."
        break;
    }
  },

  createJourney: function(){
    var journeyParams = {
      address: this.starting_address
    };

    axios
      .post('/api/locations', journeyParams)
      .then(response => {
        //console.log(response)
        this.latitude = response.data.latitude;
        this.longitude = response.data.longitude;    
        
        if(navigator.geolocation) {            
           var options = {
                          enableHighAccuracy: false,
                          timeout: 20000,
                          maximumAge: 0
                          };

           navigator.geolocation.watchPosition(this.showGps, this.showError, options);
        } else {
           alert("Sorry, browser does not support geolocation!");
        }
      }).catch(error => {
        this.errors = error.response.data.errors;
      });
    },