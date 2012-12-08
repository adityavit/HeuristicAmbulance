var ambulanceContext = function(){

	this.numberOfPersons = 30;

	this.numberOfHospitals = 5;

	this.ObjectsToRunTimeStamp = [];

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
	 * @return {[type]}
	 */
	this.registerHospital = function(){

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