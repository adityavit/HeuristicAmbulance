var ambulanceContext = function(ambulanceMain){

	this.numberOfPersons = 100;

	this.numberOfHospitals = 5;

	this.ObjectsToRunTimeStamp = [];

	this.ambulanceMain = ambulanceMain;

	this.hospitals = {};

	this.registeredHospitals = 0;
     
        //Used to Generate Living time of people
        this.minLivingTime = 30
        this.maxLivingTime = 50

	this.init = function(){
          this.generatePersonMap()
	}

	/**
	 * Generate a person random map to store the data of the person
	 * co-ordinates and their timing.
	 * @return {[type]}
	 */
	this.generatePersonMap = function(){
	   //Generate X, Y and timer for each person 	
           hashes = []
	   for(var i = 0; i < this.numberOfPersons; i++) 
	   {
	      var x_cor, y_cor, key
            	
	      do
	      {
		x_cor = getRandomInt(0, AmbulanceView.grids)
		y_cor = getRandomInt(0, AmbulanceView.grids)
                //Hash this coordinates	
                key = x_cor * (AmbulanceView.grids) + y_cor
                if(hashes.indexOf(key) == -1) 
		{ 
                  //Unique Coordinate
		  break                          
		} 
	      } while (true)
         
              hashes.push(key)
              //Generate the object
              var newPerson = new Person([x_cor,y_cor],getRandomInt(this.minLivingTime, this.maxLivingTime));
	      newPerson.init(i+1);
	   }
	}


	/**
	 * Generates a Random Integer between min and max
	 */
	function getRandomInt (min, max) {
	    return Math.floor(Math.random() * (max - min + 1)) + min;
	}



	/**
	 * Create object of the person and calls calls UI load the person.
	 * @return {[type]}
	 */
	this.loadPersons = function(){

	}

	/**
	 * Creates hospital object with the ambulances.
	 * Called by the UI provided with co-ordinates of the grid.
	 * If all the hospitals are registered calls the view to show the start button.
	 * @return {[type]}
	 */
	this.registerHospital = function(hospitalCord,hospitalId){
		if(!this.hospitals[hospitalId]){
			this.hospitals[hospitalId] = new Hospital(hospitalCord);
			this.hospitals[hospitalId].init(hospitalCord);
			this.registeredHospitals++;
			console.log(this.registeredHospitals);
			if(this.registeredHospitals == this.numberOfHospitals){
				 AmbulanceView.hospitalRegistered();
			}
		}else{
			this.hospitals[hospitalId].updateCordinate(hospitalCord);
		}
	}

	/**
	 * Generates points co-ordiantes with the path points between the two points.
	 * @param  {[list]} point1 [description]
	 * @param  {[list]} point2 [description]
	 * @return {[list of points]}
	 */
	this.generatePathPoints = function(point1,point2){

	}

	/**
	 * Updates all the object with one time stamp.Ie a person or ambulance.
	 * Selected Person counter decreases and ambulance out of hospital moves one path ahead.
	 * Should be run using setTimeOut for some defined time second.
	 * @return {[type]}
	 */
	this.runATimeStamp = function(){

	}

}
