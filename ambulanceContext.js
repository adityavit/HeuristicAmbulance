var ambulanceContext = function(ambulanceMain){

	this.numberOfPersons = 35;

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
	   x = []
	   y = []	
	   time_to_live = []

	   for(var i = 0; i < this.numberOfPersons; i++) 
	   {
	      do
	      {
		var x_cor = getRandomInt(0, AmbulanceView.grids)
		var y_cor = getRandomInt(0, AmbulanceView.grids)	
                if (!(include(x,x_cor) && include(y,y_cor))) {
                   //Ensures unique coordinates for a person
	           x.push(x_cor)
	           y.push(y_cor)
                   break
	        }
                                               
	      } while (true)

	      //Generate a Living Time 
              var timer = getRandomInt(this.minLivingTime, this.maxLivingTime)
	      time_to_live.push(timer)
              //Generate the object
              var newPerson = new Person([x[i],y[i]],time_to_live[i]);
	      newPerson.init(i+1);
	   }
	}


       /**
        * Check if the array already contains the element
        */
	function include(arr,obj) {
   		 return (arr.indexOf(obj) != -1);
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
