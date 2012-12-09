var ambulanceContext = function(ambulanceMain){

	this.numberOfPersons = 30;

	this.numberOfHospitals = 5;

	this.ObjectsToRunTimeStamp = [];

	this.ambulanceMain = ambulanceMain;

	this.hospitals = {};

	this.registeredHospitals = 0;

	this.init = function(){

	}

	/**
	 * Generate a person random map to store the data of the person
	 * co-ordinates and their timing.
	 * @return {[type]}
	 */
	this.generatePersonMap = function(){

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